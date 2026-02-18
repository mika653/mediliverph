
import React, { useRef, useState, useCallback } from 'react';
import { analyzePrescription } from '../services/gemini';
import { PrescriptionAnalysis } from '../types';

interface Props {
  onAnalysisComplete: (analysis: PrescriptionAnalysis) => void;
  onClose: () => void;
}

export const PrescriptionScanner: React.FC<Props> = ({ onAnalysisComplete, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takePhoto = useCallback(async () => {
    if (!videoRef.current) return;
    setLoading(true);
    setError(null);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
      try {
        const result = await analyzePrescription(base64);
        onAnalysisComplete(result);
      } catch (err) {
        setError("Failed to read prescription. Please try again or take a clearer photo.");
      } finally {
        setLoading(false);
      }
    }
  }, [onAnalysisComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center">
      <div className="w-full flex justify-between p-4 bg-gray-900 text-white items-center">
        <h2 className="text-xl font-bold">Photo of Prescription</h2>
        <button onClick={onClose} className="text-3xl">&times;</button>
      </div>
      
      <div className="flex-1 w-full max-w-md relative flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 m-8 rounded-lg pointer-events-none"></div>
      </div>

      <div className="p-8 w-full bg-gray-900 flex flex-col items-center gap-4">
        {error && <p className="text-red-400 text-center text-lg">{error}</p>}
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-white text-xl">Analyzing prescription...</p>
          </div>
        ) : (
          <button 
            onClick={takePhoto}
            className="w-20 h-20 bg-white rounded-full border-8 border-gray-400 active:bg-gray-200 transition-colors"
          />
        )}
        <p className="text-gray-400 text-lg mt-2">Make sure the text is clear and readable.</p>
      </div>
    </div>
  );
};
