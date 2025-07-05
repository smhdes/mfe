import { GraduationCap, Search, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white w-4 h-4" />
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Üniversite Dashboard
              </h1>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-primary border-b-2 border-primary px-1 pb-4 pt-1 text-sm font-medium"
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

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
            >
              <Settings className="w-5 h-5" />
            </Button>
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
