import { useEffect } from 'react';
import Header from '@/components/Header';
import ContentBar from '@/components/ContentBar';
import { useDashboardStore } from '@/stores/dashboardStore';
import { mockStudents } from '@/lib/mockData';

export default function Students() {
  const { setStudents } = useDashboardStore();

  useEffect(() => {
    // Initialize with mock data
    setStudents(mockStudents);
  }, [setStudents]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Öğrenci Yönetimi</h1>
          <p className="text-sm text-gray-600 mt-2">
            Tüm öğrencileri görüntüleyin, ekleyin ve düzenleyin
          </p>
        </div>
        <ContentBar />
      </main>
    </div>
  );
} 