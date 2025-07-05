import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Öğrenciler', icon: '👨‍🎓' },
    { id: 'courses', label: 'Dersler', icon: '📚' },
    { id: 'reports', label: 'Raporlar', icon: '📈' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎓</span>
              </div>
              <h1 className="ml-2 sm:ml-3 text-sm xs:text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                <span className="hidden xs:inline">Üniversite Dashboard</span>
                <span className="xs:hidden">Ü.D</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-1 pb-4 pt-1 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100">
              <span className="sr-only">Ara</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100">
              <span className="sr-only">Ayarlar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
            >
              <span className="sr-only">Menü</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 transition-all duration-200 ease-in-out">
            <nav className="flex flex-col space-y-2 pt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;