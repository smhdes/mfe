import { Plus, Eye, Edit, Flag, Globe, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDashboardStore } from '@/stores/dashboardStore';
import { Student } from '@shared/schema';

export default function ContentBar() {
  const { students, studentFilter, setStudentFilter } = useDashboardStore();

  const filteredStudents = students.filter(student => {
    if (studentFilter === 'local') return !student.isInternational;
    if (studentFilter === 'international') return student.isInternational;
    return true;
  });

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
    <div className="lg:col-span-8">
      {/* Content Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Öğrenci Listesi</h2>
          <p className="text-sm text-gray-600">
            Tüm kayıtlı öğrenciler ve durumları
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={studentFilter} onValueChange={(value: 'all' | 'local' | 'international') => setStudentFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtre seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Öğrenciler</SelectItem>
              <SelectItem value="local">Yerli Öğrenciler</SelectItem>
              <SelectItem value="international">Yabancı Öğrenciler</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary text-white hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Öğrenci
          </Button>
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={student.avatar || ''} alt={student.name} />
                    <AvatarFallback>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">
                      Öğrenci No: {student.studentId}
                    </p>
                    <p className="text-sm text-gray-500">{student.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
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
          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <ChevronDown className="w-4 h-4 mr-2" />
          Daha Fazla Öğrenci Yükle
        </Button>
      </div>
    </div>
  );
}
