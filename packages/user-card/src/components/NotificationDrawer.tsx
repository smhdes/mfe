import React from 'react';
import { useDashboardStore } from '../../../../client/src/stores/dashboardStore';

const NotificationDrawer: React.FC = () => {
  const { 
    isNotificationDrawerOpen, 
    notifications, 
    closeNotificationDrawer,
    markNotificationAsRead 
  } = useDashboardStore();

  if (!isNotificationDrawerOpen) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'info':
        return (
          <svg className="text-blue-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg className="text-green-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="text-orange-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="text-blue-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100';
      case 'success':
        return 'bg-green-100';
      case 'warning':
        return 'bg-orange-100';
      default:
        return 'bg-blue-100';
    }
  };

  const formatDistanceToNow = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'az önce';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  };

  return (
    <div className="mt-4 animate-slide-down">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-gray-900">Bildirimler</h3>
            <button
              onClick={closeNotificationDrawer}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                !notification.isRead ? 'bg-blue-50' : ''
              }`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="flex space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationBgColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(notification.createdAt)}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
            Tüm bildirimleri görüntüle
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;