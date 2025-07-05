import React from 'react';

const CoursesTab: React.FC = () => {
  const courses = [
    {
      id: 1,
      name: 'Algoritma ve Programlama',
      code: 'CS101',
      instructor: 'Prof. Dr. Ahmet Yılmaz',
      students: 45,
      semester: 'Güz 2024',
      credits: 3
    },
    {
      id: 2,
      name: 'Veri Yapıları',
      code: 'CS201',
      instructor: 'Doç. Dr. Fatma Demir',
      students: 38,
      semester: 'Güz 2024',
      credits: 4
    },
    {
      id: 3,
      name: 'Veritabanı Yönetimi',
      code: 'CS301',
      instructor: 'Prof. Dr. Mehmet Özkan',
      students: 32,
      semester: 'Güz 2024',
      credits: 3
    },
    {
      id: 4,
      name: 'Web Teknolojileri',
      code: 'CS302',
      instructor: 'Dr. Öğr. Üyesi Zeynep Kaya',
      students: 28,
      semester: 'Güz 2024',
      credits: 3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ders Yönetimi</h2>
          <p className="text-sm text-gray-600">Aktif dersler ve öğretim görevlileri</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Güz 2024</option>
            <option>Bahar 2024</option>
            <option>Yaz 2024</option>
          </select>
          <button 
            onClick={() => alert('Yeni ders ekleme özelliği yakında eklenecek!')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Yeni Ders</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{course.code}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-2 rounded-md hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Öğrenci Sayısı</span>
                  <span className="font-medium text-gray-900">{course.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Kredi</span>
                  <span className="font-medium text-gray-900">{course.credits}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Dönem</span>
                  <span className="font-medium text-gray-900">{course.semester}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => alert(`${course.name} dersi detayları yakında eklenecek!`)}
                    className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Detaylar
                  </button>
                  <button 
                    onClick={() => alert(`${course.name} dersi düzenleme özelliği yakında eklenecek!`)}
                    className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Düzenle
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesTab;