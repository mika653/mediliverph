
import React, { useState } from 'react';
import { LabTest, LabResult } from '../../types';
import { mockLabTests } from '../../data/mockData';

const getFlagColor = (flag: LabResult['flag']): string => {
  switch (flag) {
    case 'normal':
      return 'text-emerald-600';
    case 'high':
      return 'text-orange-600';
    case 'low':
      return 'text-orange-600';
    case 'critical':
      return 'text-red-600';
    default:
      return 'text-stone-600';
  }
};

const getFlagBadge = (flag: LabResult['flag']): string => {
  switch (flag) {
    case 'normal':
      return 'bg-emerald-50 text-emerald-700';
    case 'high':
      return 'bg-orange-50 text-orange-700';
    case 'low':
      return 'bg-orange-50 text-orange-700';
    case 'critical':
      return 'bg-red-50 text-red-700';
    default:
      return 'bg-stone-50 text-stone-700';
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const LabResults: React.FC = () => {
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

  const pendingLabs = mockLabTests.filter((lab) => lab.status === 'pending');
  const completedLabs = mockLabTests.filter((lab) => lab.status === 'completed');
  const allLabsSorted = [...mockLabTests].sort((a, b) => {
    const dateA = a.completedDate || a.requestedDate;
    const dateB = b.completedDate || b.requestedDate;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const toggleExpand = (labId: string) => {
    setExpandedLab((prev) => (prev === labId ? null : labId));
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-stone-800 mb-1">Lab Results</h2>
        <p className="text-stone-500 text-base">Track your lab tests and view results</p>
      </div>

      {/* Pending Labs Section */}
      {pendingLabs.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-800">Pending Labs</h3>
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {pendingLabs.length}
            </span>
          </div>

          <div className="space-y-4">
            {pendingLabs.map((lab) => (
              <div
                key={lab.id}
                className="bg-orange-50 border border-orange-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-stone-800 mb-1">{lab.name}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
                      <span className="bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        {lab.category}
                      </span>
                      <span>Requested {formatDate(lab.requestedDate)}</span>
                    </div>
                    {lab.labFacility && (
                      <p className="text-sm text-stone-500 mt-2 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {lab.labFacility}
                      </p>
                    )}
                  </div>
                  <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors whitespace-nowrap shadow-sm">
                    Find Partner Lab
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Completed Results Section */}
      {completedLabs.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-stone-800">Completed Results</h3>
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {completedLabs.length}
            </span>
          </div>

          <div className="space-y-4">
            {completedLabs.map((lab) => (
              <div
                key={lab.id}
                className="bg-white border border-indigo-100 rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Card Header */}
                <button
                  onClick={() => toggleExpand(lab.id)}
                  className="w-full p-6 text-left hover:bg-indigo-50/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-stone-800 mb-1">{lab.name}</h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
                        <span className="bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                          {lab.category}
                        </span>
                        {lab.completedDate && (
                          <span>Completed {formatDate(lab.completedDate)}</span>
                        )}
                      </div>
                      {lab.labFacility && (
                        <p className="text-sm text-stone-400 mt-1.5 flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {lab.labFacility}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {lab.results && lab.results.some((r) => r.flag !== 'normal') && (
                        <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
                          Flagged
                        </span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${
                          expandedLab === lab.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Expanded Results Table */}
                {expandedLab === lab.id && lab.results && (
                  <div className="px-6 pb-6 border-t border-indigo-50">
                    <div className="overflow-x-auto mt-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-stone-400 text-xs uppercase tracking-wider">
                            <th className="pb-3 pr-4 font-semibold">Parameter</th>
                            <th className="pb-3 pr-4 font-semibold">Value</th>
                            <th className="pb-3 pr-4 font-semibold">Reference Range</th>
                            <th className="pb-3 font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {lab.results.map((result, idx) => (
                            <tr key={idx} className="group">
                              <td className="py-3 pr-4 font-medium text-stone-700">
                                {result.parameter}
                              </td>
                              <td className={`py-3 pr-4 font-bold ${getFlagColor(result.flag)}`}>
                                {result.value} {result.unit}
                              </td>
                              <td className="py-3 pr-4 text-stone-400">
                                {result.referenceRange}
                              </td>
                              <td className="py-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${getFlagBadge(result.flag)}`}>
                                  {result.flag}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Doctor's Notes */}
                    {lab.doctorNotes && (
                      <div className="mt-5 bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-blue-800 mb-1">Doctor's Notes</p>
                            <p className="text-sm text-blue-700 leading-relaxed">{lab.doctorNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lab Timeline Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-stone-800">Lab Timeline</h3>
        </div>

        <div className="relative pl-8">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-stone-200"></div>

          <div className="space-y-6">
            {allLabsSorted.map((lab, idx) => {
              const isCompleted = lab.status === 'completed';
              const displayDate = isCompleted && lab.completedDate
                ? lab.completedDate
                : lab.requestedDate;

              return (
                <div key={lab.id} className="relative flex items-start gap-4">
                  {/* Dot */}
                  <div
                    className={`absolute -left-8 top-1 w-[11px] h-[11px] rounded-full border-2 border-white shadow-sm ${
                      isCompleted ? 'bg-emerald-500' : 'bg-orange-400'
                    }`}
                  ></div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-stone-700">{lab.name}</p>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-orange-50 text-orange-700'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {isCompleted ? 'Completed' : 'Requested'} {formatDate(displayDate)}
                    </p>
                    {lab.labFacility && (
                      <p className="text-xs text-stone-400 mt-0.5">{lab.labFacility}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
