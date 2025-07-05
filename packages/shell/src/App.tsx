import React, { useState } from 'react';
import Header from './components/Header';
import { DashboardProvider, useDashboard } from './providers/DashboardProvider';
import LoadingSpinner from './components/LoadingSpinner';
import StudentsTab from './components/StudentsTab';
import CoursesTab from './components/CoursesTab';
import ReportsTab from './components/ReportsTab';
import StudentModal from './components/StudentModal';
import Toast from './components/Toast';

// Temporary inline components until microfrontends are properly set up
const UserCardPlaceholder: React.FC = () => {
  const { 
    user, 
    students, 
    toggleNotificationDrawer, 
    unreadNotificationCount 
  } = useDashboard();

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' as const, isVisible: false });

  if (!user) return <LoadingSpinner />;

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const internationalStudents = students.filter(s => s.isInternational).length;

  return (
    <div className="lg:col-span-4">
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-semibold">
                  {user.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.role}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="relative">
              <button
                onClick={toggleNotificationDrawer}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM8.586 2l1.414 1.414L8.586 4.828 7.172 3.414 8.586 2zM2 7l2 2L3 10l-2-2 1-1zM3 14l2-2 1 1-2 2-1-1zM7.172 20.586l1.414-1.414L10 20.586l-1.414 1.414-1.414-1.414zM15 3h6v2h-6V3z" />
                </svg>
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4 mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
                <div className="text-xs text-gray-500">Toplam Öğrenci</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">{activeStudents}</div>
                <div className="text-xs text-gray-500">Aktif Öğrenci</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{internationalStudents}</div>
                <div className="text-xs text-gray-500">Yabancı Öğrenci</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="space-y-2">
              <button 
                onClick={() => setIsStudentModalOpen(true)}
                className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
              >
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Yeni Öğrenci Ekle
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                <svg className="w-4 h-4 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Rapor Oluştur
              </button>
            </div>
          </div>
        </div>
        
        <StudentModal
          isOpen={isStudentModalOpen}
          onClose={() => setIsStudentModalOpen(false)}
          onSuccess={(message) => setToast({ message, type: 'success', isVisible: true })}
        />
        
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    </div>
  );
};

const ContentBarPlaceholder: React.FC = () => {
  const { students, studentFilter, setStudentFilter } = useDashboard();
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<any>(null);
  const [toast, setToast] = useState({ message: '', type: 'success' as const, isVisible: false });

  const filteredStudents = students.filter(student => {
    if (studentFilter === 'local') return !student.isInternational;
    if (studentFilter === 'international') return student.isInternational;
    return true;
  });

  return (
    <div className="lg:col-span-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Öğrenci Listesi</h2>
          <p className="text-sm text-gray-600">Tüm kayıtlı öğrenciler ve durumları</p>
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
            onClick={() => {
              setStudentToEdit(null);
              setIsStudentModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Yeni Öğrenci
          </button>
        </div>
      </div>

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
                        {student.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">Öğrenci No: {student.studentId}</p>
                    <p className="text-sm text-gray-500">{student.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      {student.isInternational ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Yabancı
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Yerli
                        </span>
                      )}
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {student.status === 'active' ? 'Aktif' : student.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{student.year}. Sınıf</p>
                  </div>
                  <button
                    onClick={() => {
                      setStudentToEdit(student);
                      setIsStudentModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => {
          setIsStudentModalOpen(false);
          setStudentToEdit(null);
        }}
        studentToEdit={studentToEdit}
        onSuccess={(message) => setToast({ message, type: 'success', isVisible: true })}
      />
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentsTab />;
      case 'courses':
        return <CoursesTab />;
      case 'reports':
        return <ReportsTab />;
      case 'dashboard':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <UserCardPlaceholder />
            <ContentBarPlaceholder />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <MainContent />
    </DashboardProvider>
  );
};

export default App;