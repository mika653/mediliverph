
import React, { useState } from 'react';
import { VitalReading } from '../../types';
import { mockVitalReadings } from '../../data/mockData';

type VitalType = VitalReading['type'];

const VITAL_LABELS: Record<VitalType, string> = {
  blood_pressure: 'Blood Pressure',
  blood_sugar: 'Blood Sugar',
  weight: 'Weight',
  heart_rate: 'Heart Rate',
};

const VITAL_UNITS: Record<VitalType, string> = {
  blood_pressure: 'mmHg',
  blood_sugar: 'mg/dL',
  weight: 'kg',
  heart_rate: 'bpm',
};

const SOURCE_STYLES: Record<VitalReading['source'], { bg: string; text: string }> = {
  self: { bg: 'bg-stone-100', text: 'text-stone-600' },
  lab: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  clinic: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

function getTrend(readings: VitalReading[], type: VitalType): 'improving' | 'worsening' | 'stable' {
  if (readings.length < 2) return 'stable';

  const sorted = [...readings].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
  );
  const latest = sorted[0];
  const previous = sorted[1];

  let currentVal: number;
  let previousVal: number;

  if (type === 'blood_pressure') {
    currentVal = latest.systolic ?? 0;
    previousVal = previous.systolic ?? 0;
  } else {
    currentVal = latest.numericValue ?? parseFloat(latest.value);
    previousVal = previous.numericValue ?? parseFloat(previous.value);
  }

  if (previousVal === 0) return 'stable';
  const percentChange = Math.abs((currentVal - previousVal) / previousVal) * 100;

  if (percentChange <= 2) return 'stable';

  // For BP, blood sugar, and weight: going down is improving
  // For heart rate: going down is also generally good (within reason)
  if (type === 'heart_rate') {
    return currentVal < previousVal ? 'improving' : 'worsening';
  }
  return currentVal < previousVal ? 'improving' : 'worsening';
}

function getBpStatus(systolic: number, diastolic: number): 'normal' | 'elevated' | 'high' {
  if (systolic >= 140 || diastolic >= 90) return 'high';
  if (systolic >= 130 || diastolic >= 85) return 'elevated';
  return 'normal';
}

function getBsStatus(value: number): 'normal' | 'pre-diabetic' | 'diabetic' {
  if (value >= 126) return 'diabetic';
  if (value >= 100) return 'pre-diabetic';
  return 'normal';
}

const STATUS_ROW_COLORS = {
  normal: 'bg-green-50',
  elevated: 'bg-amber-50',
  'pre-diabetic': 'bg-amber-50',
  high: 'bg-red-50',
  diabetic: 'bg-red-50',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
}

export const HealthVitals: React.FC = () => {
  const [additionalReadings, setAdditionalReadings] = useState<VitalReading[]>([]);
  const [selectedType, setSelectedType] = useState<VitalType>('blood_pressure');
  const [inputValue, setInputValue] = useState('');
  const [systolicInput, setSystolicInput] = useState('');
  const [diastolicInput, setDiastolicInput] = useState('');

  const allReadings = [...mockVitalReadings, ...additionalReadings];

  const getReadingsForType = (type: VitalType) =>
    allReadings
      .filter((r) => r.type === type)
      .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());

  const handleSave = () => {
    const now = new Date().toISOString();
    const id = `v_local_${Date.now()}`;

    if (selectedType === 'blood_pressure') {
      const sys = parseInt(systolicInput, 10);
      const dia = parseInt(diastolicInput, 10);
      if (isNaN(sys) || isNaN(dia)) return;
      const reading: VitalReading = {
        id,
        type: 'blood_pressure',
        value: `${sys}/${dia}`,
        systolic: sys,
        diastolic: dia,
        recordedAt: now,
        source: 'self',
      };
      setAdditionalReadings((prev) => [...prev, reading]);
      setSystolicInput('');
      setDiastolicInput('');
    } else {
      const num = parseFloat(inputValue);
      if (isNaN(num)) return;
      const reading: VitalReading = {
        id,
        type: selectedType,
        value: inputValue,
        numericValue: num,
        recordedAt: now,
        source: 'self',
      };
      setAdditionalReadings((prev) => [...prev, reading]);
      setInputValue('');
    }
  };

  const vitalTypes: VitalType[] = ['blood_pressure', 'blood_sugar', 'weight', 'heart_rate'];

  return (
    <div className="space-y-8">
      {/* Log New Reading Form */}
      <section className="bg-white rounded-3xl border border-blue-100 p-5 sm:p-8 shadow-sm">
        <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-800 mb-4 sm:mb-6">Log New Reading</h2>

        <div className="space-y-4">
          {/* Vital Type Select */}
          <div>
            <label className="block text-sm font-semibold text-stone-600 mb-2">Vital Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value as VitalType);
                setInputValue('');
                setSystolicInput('');
                setDiastolicInput('');
              }}
              className="w-full p-3 sm:p-4 text-base sm:text-lg border border-stone-200 rounded-2xl bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {vitalTypes.map((type) => (
                <option key={type} value={type}>
                  {VITAL_LABELS[type]}
                </option>
              ))}
            </select>
          </div>

          {/* Input Field(s) */}
          {selectedType === 'blood_pressure' ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-2">
                  Systolic (mmHg)
                </label>
                <input
                  type="number"
                  value={systolicInput}
                  onChange={(e) => setSystolicInput(e.target.value)}
                  placeholder="e.g. 130"
                  className="w-full p-3 sm:p-4 text-base sm:text-lg border border-stone-200 rounded-2xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-600 mb-2">
                  Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  value={diastolicInput}
                  onChange={(e) => setDiastolicInput(e.target.value)}
                  placeholder="e.g. 85"
                  className="w-full p-3 sm:p-4 text-base sm:text-lg border border-stone-200 rounded-2xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-2">
                Value ({VITAL_UNITS[selectedType]})
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter ${VITAL_LABELS[selectedType].toLowerCase()}`}
                className="w-full p-3 sm:p-4 text-base sm:text-lg border border-stone-200 rounded-2xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Save Reading
          </button>
        </div>
      </section>

      {/* Vital Cards */}
      <section>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-800 mb-4 sm:mb-6">Your Vitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {vitalTypes.map((type) => {
            const readings = getReadingsForType(type);
            const latest = readings[0];
            const trend = getTrend(readings, type);

            return (
              <div
                key={type}
                className="bg-white rounded-2xl border border-stone-100 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-stone-800">
                    {VITAL_LABELS[type]}
                  </h3>
                  {latest && (
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${SOURCE_STYLES[latest.source].bg} ${SOURCE_STYLES[latest.source].text}`}
                    >
                      {latest.source}
                    </span>
                  )}
                </div>

                {latest ? (
                  <>
                    <div className="flex items-end gap-3 mb-2">
                      <span className="text-3xl sm:text-4xl font-black text-stone-900">{latest.value}</span>
                      <span className="text-stone-400 text-sm mb-1">{VITAL_UNITS[type]}</span>
                      <span className="ml-auto text-2xl">
                        {trend === 'improving' && (
                          <span className="text-green-500" title="Improving">
                            &#8595;
                          </span>
                        )}
                        {trend === 'worsening' && (
                          <span className="text-red-500" title="Worsening">
                            &#8593;
                          </span>
                        )}
                        {trend === 'stable' && (
                          <span className="text-stone-400" title="Stable">
                            &mdash;
                          </span>
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-stone-400">
                      Last reading: {formatDate(latest.recordedAt)}
                    </p>
                  </>
                ) : (
                  <p className="text-stone-400 text-sm">No readings yet</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Readings Tables */}
      {(['blood_pressure', 'blood_sugar'] as VitalType[]).map((type) => {
        const readings = getReadingsForType(type).slice(0, 5);

        return (
          <section key={type}>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-800 mb-4">
              Recent {VITAL_LABELS[type]} Readings
            </h2>
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100">
                    <th className="text-left p-4 text-sm font-semibold text-stone-600">Date</th>
                    <th className="text-left p-4 text-sm font-semibold text-stone-600">Value</th>
                    <th className="text-left p-4 text-sm font-semibold text-stone-600">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((reading) => {
                    let rowColor = '';
                    if (type === 'blood_pressure' && reading.systolic != null && reading.diastolic != null) {
                      const status = getBpStatus(reading.systolic, reading.diastolic);
                      rowColor = STATUS_ROW_COLORS[status];
                    } else if (type === 'blood_sugar' && reading.numericValue != null) {
                      const status = getBsStatus(reading.numericValue);
                      rowColor = STATUS_ROW_COLORS[status];
                    }

                    return (
                      <tr key={reading.id} className={`border-b border-stone-50 ${rowColor}`}>
                        <td className="p-4 text-sm text-stone-700">
                          {formatDate(reading.recordedAt)}
                        </td>
                        <td className="p-4 text-sm font-semibold text-stone-800">
                          {reading.value} {VITAL_UNITS[type]}
                        </td>
                        <td className="p-4">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${SOURCE_STYLES[reading.source].bg} ${SOURCE_STYLES[reading.source].text}`}
                          >
                            {reading.source}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {readings.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-stone-400 text-sm">
                        No readings recorded yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
};
