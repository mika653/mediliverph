import React, { useState } from 'react';
import { mockDoctorLabReviews } from '../../data/mockData';
import { DoctorLabReview as DoctorLabReviewType } from '../../types';

const flagColor = (flag: 'normal' | 'high' | 'low' | 'critical') => {
  switch (flag) {
    case 'normal':
      return 'text-emerald-600 bg-emerald-50';
    case 'high':
    case 'low':
      return 'text-orange-600 bg-orange-50';
    case 'critical':
      return 'text-red-600 bg-red-50';
  }
};

const flagLabel = (flag: 'normal' | 'high' | 'low' | 'critical') => {
  return flag.charAt(0).toUpperCase() + flag.slice(1);
};

export const DoctorLabReview: React.FC = () => {
  // Track reviewed status locally so the "Mark Reviewed" button works
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    mockDoctorLabReviews.forEach((lab) => {
      if (lab.reviewed) initial.add(lab.id);
    });
    return initial;
  });

  // Track which cards are expanded
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Track whether the Reviewed section is shown
  const [showReviewed, setShowReviewed] = useState(false);

  const needsReview = mockDoctorLabReviews.filter((lab) => !reviewedIds.has(lab.id));
  const reviewed = mockDoctorLabReviews.filter((lab) => reviewedIds.has(lab.id));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const markReviewed = (id: string) => {
    setReviewedIds((prev) => new Set(prev).add(id));
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const renderResultsTable = (lab: DoctorLabReviewType) => (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-left text-base">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="pb-2 font-bold text-stone-600 text-sm">Parameter</th>
            <th className="pb-2 font-bold text-stone-600 text-sm">Value</th>
            <th className="pb-2 font-bold text-stone-600 text-sm">Unit</th>
            <th className="pb-2 font-bold text-stone-600 text-sm">Reference</th>
            <th className="pb-2 font-bold text-stone-600 text-sm">Flag</th>
          </tr>
        </thead>
        <tbody>
          {lab.results.map((r, i) => (
            <tr key={i} className="border-b border-stone-100 last:border-0">
              <td className="py-2 font-semibold text-stone-800">{r.parameter}</td>
              <td className="py-2 font-bold text-stone-800">{r.value}</td>
              <td className="py-2 text-stone-500">{r.unit}</td>
              <td className="py-2 text-stone-400">{r.referenceRange}</td>
              <td className="py-2">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${flagColor(
                    r.flag
                  )}`}
                >
                  {flagLabel(r.flag)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLabCard = (lab: DoctorLabReviewType, isMuted: boolean) => {
    const isExpanded = expandedIds.has(lab.id);
    const isUnreviewed = !reviewedIds.has(lab.id);

    return (
      <div
        key={lab.id}
        className={`bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden ${
          isMuted ? 'opacity-60' : ''
        } ${lab.flagged && isUnreviewed ? 'border-l-4 border-l-red-400' : ''}`}
      >
        {/* Card header — clickable to expand */}
        <button
          onClick={() => toggleExpand(lab.id)}
          className="w-full p-5 text-left flex items-center justify-between gap-4"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg font-bold text-stone-800">{lab.patientName}</h3>
              {lab.flagged && isUnreviewed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-base text-stone-500">
              {lab.testName} &middot; Completed {lab.completedDate}
            </p>
          </div>

          {/* Expand chevron */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 text-stone-400 transition-transform flex-shrink-0 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="px-5 pb-5 border-t border-stone-100">
            {renderResultsTable(lab)}

            {isUnreviewed && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => markReviewed(lab.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-2xl text-base transition-colors"
                >
                  Mark Reviewed
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Needs Review */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-display text-xl font-bold text-stone-800">Needs Review</h2>
          {needsReview.length > 0 && (
            <span className="bg-orange-500 text-white text-sm font-bold px-2.5 py-0.5 rounded-full">
              {needsReview.length}
            </span>
          )}
        </div>
        {needsReview.length === 0 ? (
          <div className="bg-emerald-50 rounded-2xl p-6 text-center">
            <p className="text-emerald-700 font-semibold text-base">All lab results have been reviewed.</p>
          </div>
        ) : (
          <div className="space-y-4">{needsReview.map((lab) => renderLabCard(lab, false))}</div>
        )}
      </div>

      {/* Reviewed — collapsed by default */}
      <div>
        <button
          onClick={() => setShowReviewed(!showReviewed)}
          className="flex items-center gap-2 mb-4"
        >
          <h2 className="font-display text-xl font-bold text-stone-800">Reviewed</h2>
          <span className="bg-stone-200 text-stone-600 text-sm font-bold px-2.5 py-0.5 rounded-full">
            {reviewed.length}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 text-stone-400 transition-transform ${
              showReviewed ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showReviewed && (
          <div className="space-y-4">{reviewed.map((lab) => renderLabCard(lab, true))}</div>
        )}
      </div>
    </div>
  );
};
