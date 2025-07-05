import React from 'react';
import { useDashboardStore } from '../../../client/src/stores/dashboardStore';

const ContentBar: React.FC = () => {
  const { students, studentFilter, setStudentFilter } = useDashboardStore();

  const filteredStudents = students.filter(student => {
    if (studentFilter === 'local') return !student.isInternational;
    if (studentFilter === 'international') return student.isInternational;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Aktif
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Beklemede
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Pasif
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Aktif
          </span>
        );
    }
  };

  const getStudentTypeBadge = (isInternational: boolean) => {
    return isInternational ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945" />
        </svg>
        Yabancı
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6v1a1 1 0 01-1 1H3z" />
        </svg>
        Yerli
      </span>
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
          <select 
            value={studentFilter} 
            onChange={(e) => setStudentFilter(e.target.value as 'all' | 'local' | 'international')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Öğrenciler</option>
            <option value="local">Yerli Öğrenciler</option>
            <option value="international">Yabancı Öğrenciler</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Yeni Öğrenci
          </button>
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    {student.avatar ? (
                      <img 
                        src={student.avatar} 
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
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
                    <button className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-8 text-center">
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Daha Fazla Öğrenci Yükle
        </button>
      </div>
    </div>
  );
};

export default ContentBar;