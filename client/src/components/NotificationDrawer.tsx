import { X, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore } from '@/stores/dashboardStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function NotificationDrawer() {
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
        return <Info className="text-blue-600 w-4 h-4" />;
      case 'success':
        return <CheckCircle className="text-green-600 w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="text-orange-600 w-4 h-4" />;
      default:
        return <Info className="text-blue-600 w-4 h-4" />;
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

  return (
    <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Bildirimler</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeNotificationDrawer}
              className="text-gray-400 hover:text-gray-600 p-1 h-6 w-6"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
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
                      {formatDistanceToNow(notification.createdAt, { 
                        addSuffix: true, 
                        locale: tr 
                      })}
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
            <Button
              variant="link"
              className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium p-0"
            >
              Tüm bildirimleri görüntüle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
