
import React, { useState } from 'react';
import { AppNotification, DashboardTab } from '../../types';
import { mockNotifications } from '../../data/mockData';

interface Props {
  onTabChange: (tab: DashboardTab) => void;
}

const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays <= 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
};

const NotificationIcon: React.FC<{ type: AppNotification['type'] }> = ({ type }) => {
  switch (type) {
    case 'refill':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    case 'appointment':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'lab':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'medication':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l3 3m0 0l3-3m-3 3V3.75M19.5 11.25l-3-3m0 0l-3 3m3-3v12" />
          <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 16h6M9 12h6M9 8h6" />
        </svg>
      );
    case 'system':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      );
  }
};

const iconColorMap: Record<AppNotification['type'], string> = {
  refill: 'bg-blue-50 text-blue-600',
  appointment: 'bg-emerald-50 text-emerald-600',
  lab: 'bg-indigo-50 text-indigo-600',
  medication: 'bg-orange-50 text-orange-600',
  system: 'bg-stone-100 text-stone-600',
};

export const NotificationCenter: React.FC<Props> = ({ onTabChange }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(
    () => [...mockNotifications].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-stone-700 font-semibold text-lg">
            You have <span className="text-blue-600 font-bold">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors whitespace-nowrap"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`rounded-2xl border p-5 shadow-sm transition-all cursor-pointer hover:shadow-md ${
              notification.read
                ? 'bg-white border-stone-100'
                : 'bg-blue-50 border-blue-100'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${iconColorMap[notification.type]}`}>
                <NotificationIcon type={notification.type} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h4 className="text-stone-800 font-bold text-base">
                    {notification.title}
                    {!notification.read && (
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-2 align-middle" />
                    )}
                  </h4>
                  <span className="text-stone-400 text-xs font-medium whitespace-nowrap flex-shrink-0">
                    {formatRelativeTime(notification.timestamp)}
                  </span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed mb-3">
                  {notification.message}
                </p>
                {notification.actionLabel && notification.actionTab && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(notification.id);
                      onTabChange(notification.actionTab!);
                    }}
                    className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors flex items-center gap-1"
                  >
                    {notification.actionLabel}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {notifications.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <p className="text-stone-500 font-medium text-lg">No notifications yet</p>
          <p className="text-stone-400 text-sm mt-1">We will notify you about important updates here.</p>
        </div>
      )}
    </div>
  );
};
