import React, { useState, useEffect } from 'react';
import { useDashboard } from '../providers/DashboardProvider';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentToEdit?: any;
  onSuccess: (message: string) => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ 
  isOpen, 
  onClose, 
  studentToEdit,
  onSuccess 
}) => {
  const { students, setStudents } = useDashboard();
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    department: '',
    year: 1,
    isInternational: false,
    status: 'active',
    country: ''
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        studentId: studentToEdit.studentId || '',
        email: studentToEdit.email || '',
        department: studentToEdit.department || '',
        year: studentToEdit.year || 1,
        isInternational: studentToEdit.isInternational || false,
        status: studentToEdit.status || 'active',
        country: studentToEdit.country || ''
      });
    } else {
      setFormData({
        name: '',
        studentId: '',
        email: '',
        department: '',
        year: 1,
        isInternational: false,
        status: 'active',
        country: ''
      });
    }
  }, [studentToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (studentToEdit) {
      // Edit existing student
      const updatedStudents = students.map(student => 
        student.id === studentToEdit.id 
          ? { ...student, ...formData }
          : student
      );
      setStudents(updatedStudents);
      onSuccess('Öğrenci başarıyla güncellendi!');
    } else {
      // Add new student
      const newStudent = {
        id: Date.now(), // Simple ID generation
        ...formData,
        avatar: undefined,
        createdAt: new Date()
      };
      setStudents([...students, newStudent]);
      onSuccess('Öğrenci başarıyla eklendi!');
    }
    
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {studentToEdit ? 'Öğrenci Düzenle' : 'Yeni Öğrenci Ekle'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Öğrenci Numarası
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bölüm
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Bölüm Seçin</option>
                <option value="Bilgisayar Mühendisliği">Bilgisayar Mühendisliği</option>
                <option value="Elektrik Mühendisliği">Elektrik Mühendisliği</option>
                <option value="Makine Mühendisliği">Makine Mühendisliği</option>
                <option value="Endüstri Mühendisliği">Endüstri Mühendisliği</option>
                <option value="İktisat">İktisat</option>
                <option value="İşletme">İşletme</option>
                <option value="Psikoloji">Psikoloji</option>
                <option value="Hukuk">Hukuk</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sınıf
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1. Sınıf</option>
                <option value={2}>2. Sınıf</option>
                <option value={3}>3. Sınıf</option>
                <option value={4}>4. Sınıf</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durum
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Aktif</option>
                <option value="inactive">Pasif</option>
                <option value="pending">Beklemede</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isInternational"
                checked={formData.isInternational}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Yabancı Öğrenci
              </label>
            </div>

            {formData.isInternational && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ülke
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                {studentToEdit ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;