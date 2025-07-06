import { Plus, Eye, Edit, Flag, Globe, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Student } from '@shared/schema';
import { useState } from 'react';
import StudentModal from './StudentModal';

export default function ContentBar() {
  const { students, studentFilter, setStudentFilter, addStudent, updateStudent } = useDashboardStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(student => {
    if (studentFilter === 'local') return !student.isInternational;
    if (studentFilter === 'international') return student.isInternational;
    return true;
  });

  const handleAdd = () => {
    setEditStudent(null);
    setModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditStudent(student);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditStudent(null);
  };

  const handleModalSave = (student: Omit<Student, 'id'> | Student) => {
    if ('id' in student) {
      updateStudent(student as Student);
    } else {
      addStudent(student as Omit<Student, 'id'>);
    }
    setModalOpen(false);
    setEditStudent(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aktif</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Beklemede</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Pasif</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Aktif</Badge>;
    }
  };

  const getStudentTypeBadge = (isInternational: boolean) => {
    return isInternational ? (
      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
        <Globe className="w-3 h-3 mr-1" />
        Yabancı
      </Badge>
    ) : (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
        <Flag className="w-3 h-3 mr-1" />
        Yerli
      </Badge>
    );
  };

  return (
    <div>
      {/* Content Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Öğrenci Listesi</h2>
          <p className="text-sm text-gray-600">
            Tüm kayıtlı öğrenciler ve durumları
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Select value={studentFilter} onValueChange={(value: 'all' | 'local' | 'international') => setStudentFilter(value)}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtre seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Öğrenciler</SelectItem>
              <SelectItem value="local">Yerli Öğrenciler</SelectItem>
              <SelectItem value="international">Yabancı Öğrenciler</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto" onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Öğrenci
          </Button>
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage src={student.avatar || ''} alt={student.name} />
                    <AvatarFallback>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                    <p className="text-sm text-gray-600">
                      Öğrenci No: {student.studentId}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{student.department}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="text-left sm:text-right">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {getStudentTypeBadge(student.isInternational)}
                      {getStatusBadge(student.status)}
                    </div>
                    <p className="text-sm text-gray-500">{student.year}. Sınıf</p>
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
                      onClick={() => handleEdit(student)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-8 text-center">
        <Button
          variant="outline"
          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
        >
          <ChevronDown className="w-4 h-4 mr-2" />
          Daha Fazla Öğrenci Yükle
        </Button>
      </div>

      {/* Modal */}
      <StudentModal open={modalOpen} onClose={handleModalClose} onSave={handleModalSave} student={editStudent} />
    </div>
  );
}
