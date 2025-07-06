import { GraduationCap, Search, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === '/') return location === '/' || location === '/dashboard';
    return location === path;
  };

  const getLinkClass = (path: string) => {
    const active = isActive(path);
    return active 
      ? "text-primary border-b-2 border-primary px-1 pb-4 pt-1 text-sm font-medium"
      : "text-gray-500 hover:text-gray-700 px-1 pb-4 pt-1 text-sm font-medium";
  };

  const getMobileLinkClass = (path: string) => {
    const active = isActive(path);
    return active
      ? "text-primary block px-3 py-2 text-base font-medium border-l-4 border-primary"
      : "text-gray-500 hover:text-gray-700 block px-3 py-2 text-base font-medium";
  };

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
              <Link href="/">
                <h1 className="ml-3 text-xl font-semibold text-gray-900 cursor-pointer">
                  Üniversite Dashboard
                </h1>
              </Link>
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/dashboard">
              <a className={getLinkClass('/dashboard')}>
                Dashboard
              </a>
            </Link>
            <Link href="/students">
              <a className={getLinkClass('/students')}>
                Öğrenciler
              </a>
            </Link>
            <Link href="/courses">
              <a className={getLinkClass('/courses')}>
                Dersler
              </a>
            </Link>
            <Link href="/reports">
              <a className={getLinkClass('/reports')}>
                Raporlar
              </a>
            </Link>
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
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link href="/dashboard">
                <a className={getMobileLinkClass('/dashboard')}>
                  Dashboard
                </a>
              </Link>
              <Link href="/students">
                <a className={getMobileLinkClass('/students')}>
                  Öğrenciler
                </a>
              </Link>
              <Link href="/courses">
                <a className={getMobileLinkClass('/courses')}>
                  Dersler
                </a>
              </Link>
              <Link href="/reports">
                <a className={getMobileLinkClass('/reports')}>
                  Raporlar
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
