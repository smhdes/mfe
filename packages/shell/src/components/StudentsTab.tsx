import React, { useState } from 'react';
import { useDashboard } from '../providers/DashboardProvider';
import StudentModal from './StudentModal';
import Toast from './Toast';

const StudentsTab: React.FC = () => {
  const { students, studentFilter, setStudentFilter } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<any>(null);
  const [toast, setToast] = useState({ message: '', type: 'success' as const, isVisible: false });

  const filteredStudents = students.filter(student => {
    if (studentFilter === 'local') return !student.isInternational;
    if (studentFilter === 'international') return student.isInternational;
    return true;
  });

  const handleAddStudent = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: any) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setStudentToEdit(null);
  };

  const handleSuccess = (message: string) => {
    setToast({ message, type: 'success', isVisible: true });
  };

  const handleToastClose = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Öğrenci Yönetimi</h2>
          <p className="text-sm text-gray-600">Tüm kayıtlı öğrenciler ve detayları</p>
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
          <button 
            onClick={handleAddStudent}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Yeni Öğrenci</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Öğrenci Listesi ({filteredStudents.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
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
                        {student.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600">Öğrenci No: {student.studentId}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-700">{student.department}</span>
                      {student.isInternational ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Yabancı
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Yerli
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{student.year}. Sınıf</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'active' 
                          ? 'bg-blue-100 text-blue-800' 
                          : student.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.status === 'active' ? 'Aktif' : student.status === 'pending' ? 'Beklemede' : 'Pasif'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditStudent(student)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="p-8 text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Öğrenci bulunamadı</h3>
            <p className="text-gray-500 mb-4">Seçilen filtreye uygun öğrenci bulunmuyor.</p>
            <button
              onClick={handleAddStudent}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              İlk Öğrenciyi Ekle
            </button>
          </div>
        )}
      </div>

      <StudentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        studentToEdit={studentToEdit}
        onSuccess={handleSuccess}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={handleToastClose}
      />
    </div>
  );
};

export default StudentsTab;