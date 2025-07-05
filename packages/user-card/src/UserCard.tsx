import React from 'react';
import { useDashboardStore } from '../../../client/src/stores/dashboardStore';
import NotificationDrawer from './components/NotificationDrawer';

const UserCard: React.FC = () => {
  const { 
    user, 
    students, 
    toggleNotificationDrawer, 
    unreadNotificationCount 
  } = useDashboardStore();

  if (!user) return null;

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const internationalStudents = students.filter(s => s.isInternational).length;

  return (
    <div className="lg:col-span-4">
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6">
          {/* User Profile Section */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-semibold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.role}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                onClick={toggleNotificationDrawer}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM8.586 2l1.414 1.414L8.586 4.828 7.172 3.414 8.586 2zM2 7l2 2L3 10l-2-2 1-1zM3 14l2-2 1 1-2 2-1-1zM7.172 20.586l1.414-1.414L10 20.586l-1.414 1.414-1.414-1.414zM15 3h6v2h-6V3z" />
                </svg>
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-gray-100 pt-4 mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {totalStudents}
                </div>
                <div className="text-xs text-gray-500">Toplam Öğrenci</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">
                  {activeStudents}
                </div>
                <div className="text-xs text-gray-500">Aktif Öğrenci</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {internationalStudents}
                </div>
                <div className="text-xs text-gray-500">Yabancı Öğrenci</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-100 pt-4">
            <div className="space-y-2">
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Yeni Öğrenci Ekle
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                <svg className="w-4 h-4 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Rapor Oluştur
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8h4m-4 4h4m-4-8h4" />
                </svg>
                Takvim Görüntüle
              </button>
            </div>
          </div>
        </div>
      </div>

      <NotificationDrawer />
    </div>
  );
};

export default UserCard;