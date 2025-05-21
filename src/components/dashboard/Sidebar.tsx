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
    { 
      name: 'داشبورد', 
      path: '/dashboard',
      icon: (
        <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      )
    },
    { 
      name: 'تیکت‌ها', 
      path: '/dashboard/tickets',
      icon: (
        <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
        </svg>
      )
    },
    { 
      name: 'دوره‌ها', 
      path: '/dashboard/courses',
      icon: (
        <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      )
    },
    { 
      name: 'آزمون‌ها', 
      path: '/dashboard/exams',
      icon: (
        <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      )
    },
    { 
      name: 'پروفایل', 
      path: '/dashboard/profile',
      icon: (
        <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      )
    },
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
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">سیستم آموزش آنلاین</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors"
            aria-label="بستن منو"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-l from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              ک
            </div>
            <div className="mr-3">
              <p className="text-sm font-medium text-gray-900">کاربر عزیز</p>
              <p className="text-xs text-gray-500">example@gmail.com</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-2 px-2">
          <p className="text-xs text-gray-500 px-4 mb-2">منو اصلی</p>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  href={item.path as any}
                  className={`flex items-center py-2 px-4 rounded-lg transition-colors text-sm ${
                    pathname === item.path || pathname.startsWith(`${item.path}/`) 
                      ? 'bg-purple-100 text-purple-800 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (onClose && window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <div className={`${pathname === item.path || pathname.startsWith(`${item.path}/`) ? 'text-purple-700' : 'text-gray-500'}`}>
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <hr className="my-6 border-gray-200" />
          
          <p className="text-xs text-gray-500 px-4 mb-2">پشتیبانی</p>
          <ul className="space-y-1">
            <li>
              <Link 
                href={"/dashboard/help" as any}
                className="flex items-center py-2 px-4 rounded-lg transition-colors text-sm text-gray-700 hover:bg-gray-100"
              >
                <svg className="w-5 h-5 ml-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                راهنما
              </Link>
            </li>
            <li>
              <Link 
                href={"/dashboard/contact" as any}
                className="flex items-center py-2 px-4 rounded-lg transition-colors text-sm text-gray-700 hover:bg-gray-100"
              >
                <svg className="w-5 h-5 ml-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                تماس با ما
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 right-0 left-0 p-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-purple-700 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <div className="mr-3">
                <h3 className="text-sm font-medium text-purple-900">ارتقا به حساب ویژه</h3>
                <p className="text-xs text-purple-700 mt-1">دسترسی به تمام آموزش‌ها</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 