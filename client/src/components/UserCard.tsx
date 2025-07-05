import { Bell, UserPlus, FileText, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDashboardStore } from '@/stores/dashboardStore';
import { getStudentStats } from '@/lib/mockData';
import NotificationDrawer from './NotificationDrawer';

export default function UserCard() {
  const { 
    user, 
    students, 
    toggleNotificationDrawer, 
    unreadNotificationCount 
  } = useDashboardStore();

  if (!user) return null;

  const stats = getStudentStats(students);

  return (
    <div className="lg:col-span-4">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          {/* User Profile Section */}
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-16 h-16 ring-4 ring-primary/10">
              <AvatarImage src={user.avatar || ''} alt={user.name} />
              <AvatarFallback className="text-lg font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.role}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            {/* Notification Bell with Badge */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleNotificationDrawer}
                className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs animate-pulse"
                  >
                    {unreadNotificationCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-gray-100 pt-4 mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {stats.totalStudents}
                </div>
                <div className="text-xs text-gray-500">Toplam Öğrenci</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">
                  {stats.activeStudents}
                </div>
                <div className="text-xs text-gray-500">Aktif Öğrenci</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.internationalStudents}
                </div>
                <div className="text-xs text-gray-500">Yabancı Öğrenci</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-100 pt-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 h-auto text-sm text-gray-700 hover:bg-gray-50"
              >
                <UserPlus className="w-4 h-4 mr-2 text-primary" />
                Yeni Öğrenci Ekle
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 h-auto text-sm text-gray-700 hover:bg-gray-50"
              >
                <FileText className="w-4 h-4 mr-2 text-cyan-600" />
                Rapor Oluştur
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start px-3 py-2 h-auto text-sm text-gray-700 hover:bg-gray-50"
              >
                <Calendar className="w-4 h-4 mr-2 text-green-600" />
                Takvim Görüntüle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <NotificationDrawer />
    </div>
  );
}
