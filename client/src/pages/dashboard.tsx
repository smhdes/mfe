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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <UserCard />
          <ContentBar />
        </div>
      </main>
    </div>
  );
}
