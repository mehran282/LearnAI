"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'داشبورد', path: '/dashboard' },
    { name: 'تیکت‌ها', path: '/dashboard/tickets' },
    { name: 'دوره‌ها', path: '/dashboard/courses' },
    { name: 'آزمون‌ها', path: '/dashboard/exams' },
    { name: 'پروفایل', path: '/dashboard/profile' },
  ];

  return (
    <>
      {/* تیره کردن پس‌زمینه در حالت موبایل وقتی منو باز است */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    
      <div 
        className={`fixed top-0 right-0 z-30 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-blue-600">سیستم آموزش آنلاین</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            aria-label="بستن منو"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-4 px-2">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path} className="mb-1">
                <Link 
                  href={item.path as any}
                  className={`block py-3 md:py-2 px-4 rounded-md transition-colors text-base ${
                    pathname === item.path || pathname.startsWith(`${item.path}/`) 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (onClose && window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}; 