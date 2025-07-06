import { Plus, Eye, Edit, BookOpen, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Course } from '@shared/schema';
import { useState } from 'react';
import CourseModal from './CourseModal';

export default function CourseBar() {
  const { courses, courseFilter, setCourseFilter, addCourse, updateCourse } = useDashboardStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter(course => {
    if (courseFilter === 'active') return course.status === 'active';
    if (courseFilter === 'inactive') return course.status === 'inactive';
    return true;
  });

  const handleAdd = () => {
    setEditCourse(null);
    setModalOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditCourse(course);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditCourse(null);
  };

  const handleModalSave = (course: Omit<Course, 'id'> | Course) => {
    if ('id' in course) {
      updateCourse(course as Course);
    } else {
      addCourse(course as Omit<Course, 'id'>);
    }
    setModalOpen(false);
    setEditCourse(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pasif</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aktif</Badge>;
    }
  };

  const getEnrollmentProgress = (current: number, max: number) => {
    const percentage = max > 0 ? (current / max) * 100 : 0;
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">{current}/{max}</span>
      </div>
    );
  };

  return (
    <div>
      {/* Content Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Ders Listesi</h2>
          <p className="text-sm text-gray-600">
            Tüm dersler ve kayıt durumları
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Select value={courseFilter} onValueChange={(value: 'all' | 'active' | 'inactive') => setCourseFilter(value)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtre seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Dersler</SelectItem>
              <SelectItem value="active">Aktif Dersler</SelectItem>
              <SelectItem value="inactive">Pasif Dersler</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Ders
          </Button>
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">{course.name}</h3>
                    <p className="text-sm text-gray-600">
                      Kod: {course.courseCode}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{course.department}</p>
                    <p className="text-sm text-gray-500">{course.instructor}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="text-left sm:text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusBadge(course.status)}
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        {course.credits} Kredi
                      </Badge>
                    </div>
                    <div className="mb-2">
                      {getEnrollmentProgress(course.currentStudents || 0, course.maxStudents || 0)}
                    </div>
                    <p className="text-sm text-gray-500">{course.semester}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-green-600 p-2 rounded-full hover:bg-green-50"
                      onClick={() => handleEdit(course)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {course.description && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{course.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <CourseModal open={modalOpen} onClose={handleModalClose} onSave={handleModalSave} course={editCourse} />
    </div>
  );
} 