import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🎓</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Üniversite Dashboard
              </h1>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-blue-600 border-b-2 border-blue-600 px-1 pb-4 pt-1 text-sm font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 px-1 pb-4 pt-1 text-sm font-medium"
            >
              Öğrenciler
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 px-1 pb-4 pt-1 text-sm font-medium"
            >
              Dersler
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 px-1 pb-4 pt-1 text-sm font-medium"
            >
              Raporlar
            </a>
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
            <button className="md:hidden text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100">
              <span className="sr-only">Menü</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;