import { useEffect } from 'react';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';
import ContentBar from '@/components/ContentBar';
import { useDashboardStore } from '@/stores/dashboardStore';
import { mockUser, mockStudents, mockNotifications } from '@/lib/mockData';

export default function Dashboard() {
  const { setUser, setStudents, setNotifications } = useDashboardStore();

  useEffect(() => {
    // Initialize with mock data
    setUser(mockUser);
    setStudents(mockStudents);
    setNotifications(mockNotifications);
  }, [setUser, setStudents, setNotifications]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          <div className="xl:col-span-4 order-2 xl:order-1">
            <UserCard />
          </div>
          <div className="xl:col-span-8 order-1 xl:order-2">
            <ContentBar />
          </div>
        </div>
      </main>
    </div>
  );
}
