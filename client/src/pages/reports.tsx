import { useEffect } from 'react';
import { BarChart3, Users, BookOpen, TrendingUp, Calendar, Award } from 'lucide-react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDashboardStore } from '@/stores/dashboardStore';
import { mockStudents, mockCourses, getStudentStats, getCourseStats } from '@/lib/mockData';

export default function Reports() {
  const { setStudents, setCourses } = useDashboardStore();

  useEffect(() => {
    // Initialize with mock data
    setStudents(mockStudents);
    setCourses(mockCourses);
  }, [setStudents, setCourses]);

  const studentStats = getStudentStats(mockStudents);
  const courseStats = getCourseStats(mockCourses);

  const stats = [
    {
      title: 'Toplam Öğrenci',
      value: studentStats.totalStudents,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Aktif Öğrenci',
      value: studentStats.activeStudents,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Yabancı Öğrenci',
      value: studentStats.internationalStudents,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Toplam Ders',
      value: courseStats.totalCourses,
      icon: BookOpen,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Aktif Ders',
      value: courseStats.activeCourses,
      icon: BarChart3,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
    },
    {
      title: 'Toplam Kayıt',
      value: courseStats.totalStudents,
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  const departmentStats = mockStudents.reduce((acc, student) => {
    acc[student.department] = (acc[student.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topDepartments = Object.entries(departmentStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Raporlar ve İstatistikler</h1>
          <p className="text-sm text-gray-600 mt-2">
            Üniversite performansı ve öğrenci istatistikleri
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Distribution */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Bölüm Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDepartments.map(([department, count]) => (
                  <div key={department} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{department}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(count / studentStats.totalStudents) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Enrollment */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Ders Kayıt Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourses.slice(0, 5).map((course) => (
                  <div key={course.id} className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{course.name}</p>
                      <p className="text-xs text-gray-500">{course.courseCode}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${course.maxStudents ? ((course.currentStudents || 0) / course.maxStudents) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {course.currentStudents}/{course.maxStudents}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-sm lg:col-span-2">
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Yeni öğrenci kaydı</p>
                    <p className="text-xs text-gray-500">Ahmet Yılmaz sisteme kaydoldu</p>
                  </div>
                  <span className="text-xs text-gray-400">2 saat önce</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Ders kayıtları tamamlandı</p>
                    <p className="text-xs text-gray-500">Güz dönemi kayıtları %95 tamamlandı</p>
                  </div>
                  <span className="text-xs text-gray-400">1 gün önce</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Ödeme hatırlatması</p>
                    <p className="text-xs text-gray-500">3 öğrencinin ödemesi gecikti</p>
                  </div>
                  <span className="text-xs text-gray-400">3 gün önce</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 