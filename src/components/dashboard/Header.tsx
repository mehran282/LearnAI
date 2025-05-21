"use client";

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="bg-white h-16 shadow-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-2 lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors"
          aria-label={isSidebarOpen ? "بستن منو" : "باز کردن منو"}
        >
          {isSidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <Link href="/dashboard" className="flex items-center">
          <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">سیستم آموزش آنلاین</h1>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4 space-x-reverse">
        {/* آیکون اعلان‌ها */}
        <button 
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors relative"
          aria-label="اعلان‌ها"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>
        
        {/* پروفایل کاربر */}
        <div className="relative">
          <button 
            onClick={toggleProfileMenu}
            className="flex items-center focus:outline-none rounded-full focus:ring-2 focus:ring-purple-300 p-0.5"
          >
            <span className="mr-2 font-medium text-sm md:text-base hidden sm:inline-block text-gray-700">کاربر عزیز</span>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-l from-purple-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              ک
            </div>
          </button>
          
          {showProfileMenu && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-30">
              <Link href={"/dashboard/profile" as any} className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors border-r-2 border-white hover:border-purple-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  پروفایل
                </div>
              </Link>
              <Link href={"/dashboard/settings" as any} className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 transition-colors border-r-2 border-white hover:border-purple-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  تنظیمات
                </div>
              </Link>
              <hr className="my-1" />
              <button className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-r-2 border-white hover:border-red-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  خروج
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}; 