"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// افزودن فونت وزیرمتن
const vazirFontFace = `
  @font-face {
    font-family: 'Vazirmatn';
    src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Vazirmatn';
    src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Vazirmatn';
    src: url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/webfonts/Vazirmatn-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
`;

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // هر دقیقه بروزرسانی شود
    
    return () => clearInterval(timer);
  }, []);

  const persianDate = new Intl.DateTimeFormat('fa-IR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(currentTime);

  const cards = [
    { 
      title: 'تیکت‌ها', 
      description: 'مدیریت تیکت‌های پشتیبانی',
      link: '/dashboard/tickets',
      count: 3,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
        </svg>
      )
    },
    { 
      title: 'دوره‌ها', 
      description: 'مشاهده دوره‌های در حال یادگیری',
      link: '/dashboard/courses',
      count: 5,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      )
    },
    { 
      title: 'آزمون‌ها', 
      description: 'شرکت در آزمون‌های آنلاین',
      link: '/dashboard/exams',
      count: 2,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      )
    },
  ];

  const recentCourses = [
    { id: 1, title: 'زیست شناسی پایه یازدهم', progress: 75, lastActivity: '۲ ساعت پیش' },
    { id: 2, title: 'شیمی پایه دهم', progress: 40, lastActivity: '۱ روز پیش' },
    { id: 3, title: 'ریاضی پایه دوازدهم', progress: 60, lastActivity: '۳ روز پیش' },
  ];

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
    <>
      <style jsx global>{`
        ${vazirFontFace}
        body {
          font-family: 'Vazirmatn', sans-serif;
          direction: rtl;
        }
      `}</style>

      <div className="space-y-6">
        {/* بخش خوشامدگویی */}
        <div className="bg-gradient-to-l from-purple-600 to-blue-700 text-white p-4 md:p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-2">سلام، خوش آمدید 👋</h1>
              <p className="text-sm md:text-base text-purple-100">
                <span className="ml-2">{persianDate}</span>
                <span className="inline-flex items-center">
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  امروز
                </span>
              </p>
            </div>
            <div className="hidden md:block">
              <svg className="w-20 h-20 text-blue-200 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* کارت‌های آمار */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.link as any}
              className="group block bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className={`${card.bgColor} p-3 rounded-xl mr-4`}>
                    <div className={`text-gradient bg-gradient-to-r ${card.color}`}>
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold mb-1 group-hover:text-purple-600 transition-colors">{card.title}</h2>
                    <p className="text-gray-500 text-sm">{card.description}</p>
                  </div>
                </div>
                <div className={`bg-gradient-to-r ${card.color} text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0`}>
                  {toFaDigit(card.count)}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* آخرین دوره‌ها */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center">
              <svg className="w-5 h-5 ml-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              دوره‌های اخیر
            </h2>
            <Link href="/dashboard/courses" className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
              مشاهده همه
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentCourses.map(course => (
              <div key={course.id} className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <span className="text-xs text-gray-500">{course.lastActivity}</span>
                </div>
                <div className="relative pt-1">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        پیشرفت دوره
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {toFaDigit(course.progress)}٪
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200">
                    <div
                      style={{ width: `${course.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* اعلان‌ها */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center">
            <svg className="w-5 h-5 ml-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            اعلان‌های اخیر
          </h2>
          
          <ul className="divide-y divide-gray-100">
            {notifications.map(notification => (
              <li key={notification.id} className={`py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors ${!notification.read ? 'border-r-4 border-purple-500 pr-3' : ''}`}>
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
        </div>

        {/* بخش دکمه‌ها */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/dashboard/courses"
            className="flex items-center justify-center py-3 px-4 bg-purple-100 text-purple-700 rounded-xl text-center font-bold shadow hover:bg-purple-200 transition-all"
          >
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            دوره‌ها
          </Link>
          <Link
            href={"/dashboard/exams" as any}
            className="flex items-center justify-center py-3 px-4 bg-green-100 text-green-700 rounded-xl text-center font-bold shadow hover:bg-green-200 transition-all"
          >
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            آزمون‌ها
          </Link>
        </div>
      </div>
    </>
  );
} 