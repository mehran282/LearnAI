"use client";

import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showProfileMenu) setShowProfileMenu(false);
  };

  const notifications = [
    {
      id: 1,
      title: 'دوره «برنامه‌نویسی وب» به‌روزرسانی شد',
      time: '۲ ساعت پیش',
      type: 'update',
      read: false,
    },
    {
      id: 2,
      title: 'آزمون «مبانی شبکه» در تاریخ ۱۴۰۳/۰۳/۱۵ برگزار می‌شود',
      time: '۱ روز پیش',
      type: 'exam',
      read: false,
    },
    {
      id: 3,
      title: 'تیکت شما پاسخ داده شد',
      time: '۳ روز پیش',
      type: 'ticket',
      read: true,
    },
  ];

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
          <h1 className="text-lg md:text-xl font-bold text-purple-600">سیستم آموزش آنلاین</h1>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4 space-x-reverse">
        {/* آیکون اعلان‌ها */}
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors relative"
            aria-label="اعلان‌ها"
            onClick={toggleNotifications}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>

          {/* منوی اعلان‌ها */}
          {showNotifications && (
            <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-30">
              <div className="px-4 py-2 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-700">اعلان‌های اخیر</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {notifications.map(notification => (
                      <li key={notification.id} className={`py-3 px-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'border-r-2 border-purple-500 pr-3' : ''}`}>
                        <div className="flex items-start">
                          <div className={`mt-1 mr-1 p-1.5 rounded-lg 
                            ${notification.type === 'update' ? 'bg-blue-100 text-blue-600' : 
                              notification.type === 'exam' ? 'bg-green-100 text-green-600' : 
                              'bg-amber-100 text-amber-600'
                            }`}
                          >
                            {notification.type === 'update' ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                              </svg>
                            ) : notification.type === 'exam' ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                              </svg>
                            )}
                          </div>
                          <div className="mr-3 flex-1">
                            <p className={`font-medium text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="ml-2 w-2 h-2 bg-purple-600 rounded-full"></div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-4 px-4 text-center text-gray-500">
                    <p>اعلان جدیدی ندارید</p>
                  </div>
                )}
              </div>
              <div className="px-4 py-2 border-t border-gray-100 text-center">
                <Link href={"/dashboard/notifications" as any} className="text-xs text-purple-600 hover:text-purple-800">
                  مشاهده همه اعلان‌ها
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* پروفایل کاربر */}
        <div className="relative">
          <button 
            onClick={toggleProfileMenu}
            className="flex items-center focus:outline-none rounded-full focus:ring-2 focus:ring-purple-300 p-0.5"
          >
            <span className="mr-2 font-medium text-sm md:text-base hidden sm:inline-block text-gray-700">کاربر عزیز</span>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold shadow-sm">
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