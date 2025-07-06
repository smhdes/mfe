import { useEffect } from 'react';
import Header from '@/components/Header';
import CourseBar from '@/components/CourseBar';
import { useDashboardStore } from '@/stores/dashboardStore';
import { mockCourses } from '@/lib/mockData';

export default function Courses() {
  const { setCourses } = useDashboardStore();

  useEffect(() => {
    // Initialize with mock data
    setCourses(mockCourses);
  }, [setCourses]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Ders Yönetimi</h1>
          <p className="text-sm text-gray-600 mt-2">
            Tüm dersleri görüntüleyin, ekleyin ve düzenleyin
          </p>
        </div>
        <CourseBar />
      </main>
    </div>
  );
} 