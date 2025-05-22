"use client";

import { useState } from 'react';
import Link from 'next/link';

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

// فونت وزیر از CDN
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

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState('active');
  
  // نمونه داده آزمون‌ها
  const exams = {
    active: [
      {
        id: 1,
        title: 'آزمون میان‌ترم برنامه‌نویسی وب',
        course: 'برنامه‌نویسی وب',
        startDate: '۱۴۰۳/۰۳/۱۰',
        startTime: '۱۰:۰۰',
        duration: '۶۰',
        questions: '۲۰',
        status: 'در حال برگزاری',
        remainingTime: '۴۰ دقیقه',
      },
    ],
    upcoming: [
      {
        id: 2,
        title: 'آزمون پایان‌ترم مبانی شبکه',
        course: 'مبانی شبکه',
        startDate: '۱۴۰۳/۰۳/۱۵',
        startTime: '۰۹:۰۰',
        duration: '۹۰',
        questions: '۳۰',
        status: 'آینده',
        remainingDays: '۵ روز',
      },
      {
        id: 3,
        title: 'آزمون میان‌ترم پایگاه داده',
        course: 'پایگاه داده',
        startDate: '۱۴۰۳/۰۳/۲۰',
        startTime: '۱۴:۰۰',
        duration: '۷۵',
        questions: '۲۵',
        status: 'آینده',
        remainingDays: '۱۰ روز',
      },
    ],
    past: [
      {
        id: 4,
        title: 'آزمون میان‌ترم الگوریتم‌ها',
        course: 'طراحی الگوریتم',
        startDate: '۱۴۰۳/۰۲/۱۰',
        score: '۱۶',
        totalScore: '۲۰',
        duration: '۶۰',
        questions: '۲۰',
        status: 'اتمام یافته',
      },
      {
        id: 5,
        title: 'آزمون پایان‌ترم سیستم‌عامل',
        course: 'سیستم‌عامل',
        startDate: '۱۴۰۳/۰۲/۲۰',
        score: '۱۸',
        totalScore: '۲۰',
        duration: '۹۰',
        questions: '۳۰',
        status: 'اتمام یافته',
      },
    ],
  };

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">آزمون‌های من</h1>
            <p className="text-gray-500 text-sm mt-1">لیست آزمون‌های شما در دوره‌های مختلف</p>
          </div>
          <Link href="/dashboard" className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            بازگشت به داشبورد
          </Link>
        </div>

        {/* تب‌های آزمون */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex overflow-x-auto">
              <button 
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'active' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('active')}
              >
                آزمون‌های فعال
                {exams.active.length > 0 && (
                  <span className="bg-purple-100 text-purple-600 text-xs rounded-full py-0.5 px-2 mr-2">
                    {toFaDigit(exams.active.length)}
                  </span>
                )}
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'upcoming' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('upcoming')}
              >
                آزمون‌های آینده
                {exams.upcoming.length > 0 && (
                  <span className="bg-blue-100 text-blue-600 text-xs rounded-full py-0.5 px-2 mr-2">
                    {toFaDigit(exams.upcoming.length)}
                  </span>
                )}
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === 'past' 
                    ? 'border-purple-500 text-purple-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('past')}
              >
                آزمون‌های گذشته
                {exams.past.length > 0 && (
                  <span className="bg-gray-100 text-gray-600 text-xs rounded-full py-0.5 px-2 mr-2">
                    {toFaDigit(exams.past.length)}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* محتوای تب‌ها */}
          <div className="p-4 md:p-6">
            {/* آزمون‌های فعال */}
            {activeTab === 'active' && (
              <>
                {exams.active.length > 0 ? (
                  <div className="space-y-4">
                    {exams.active.map((exam) => (
                      <div key={exam.id} className="bg-white border border-green-100 rounded-lg p-4 md:p-5 flex flex-col md:flex-row gap-4 relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-full w-1 bg-green-500"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="bg-green-100 text-green-600 text-xs font-medium py-1 px-2 rounded">
                              {exam.status}
                            </div>
                            <div className="text-xs text-gray-500">
                              زمان باقیمانده: {exam.remainingTime}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{exam.title}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                              </svg>
                              <span className="text-sm">{exam.course}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <span className="text-sm">{exam.startDate}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="text-sm">{exam.startTime}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="text-sm">{exam.questions} سوال</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-end md:self-center">
                          <Link href={`/dashboard/courses/1/${exam.id}/exam` as any} className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <span>ادامه آزمون</span>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">آزمون فعالی وجود ندارد</h3>
                    <p className="text-gray-500">در حال حاضر آزمون فعالی برای شرکت وجود ندارد.</p>
                  </div>
                )}
              </>
            )}
            
            {/* آزمون‌های آینده */}
            {activeTab === 'upcoming' && (
              <>
                {exams.upcoming.length > 0 ? (
                  <div className="space-y-4">
                    {exams.upcoming.map((exam) => (
                      <div key={exam.id} className="bg-white border border-blue-100 rounded-lg p-4 md:p-5 flex flex-col md:flex-row gap-4 relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-full w-1 bg-blue-500"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-2 rounded">
                              {exam.status}
                            </div>
                            <div className="text-xs text-gray-500">
                              تا شروع: {exam.remainingDays}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{exam.title}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                              </svg>
                              <span className="text-sm">{exam.course}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <span className="text-sm">{exam.startDate}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="text-sm">{exam.startTime}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="text-sm">{exam.questions} سوال</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-end md:self-center">
                          <button disabled className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-not-allowed">
                            <span>منتظر شروع</span>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">آزمون آینده‌ای وجود ندارد</h3>
                    <p className="text-gray-500">در حال حاضر آزمون آینده‌ای برای شرکت وجود ندارد.</p>
                  </div>
                )}
              </>
            )}
            
            {/* آزمون‌های گذشته */}
            {activeTab === 'past' && (
              <>
                {exams.past.length > 0 ? (
                  <div className="space-y-4">
                    {exams.past.map((exam) => (
                      <div key={exam.id} className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 flex flex-col md:flex-row gap-4 relative overflow-hidden">
                        <div className="absolute right-0 top-0 h-full w-1 bg-gray-400"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-2 rounded">
                              {exam.status}
                            </div>
                            <div className="bg-amber-100 text-amber-600 text-xs font-medium py-1 px-2 rounded">
                              نمره: {exam.score} از {exam.totalScore}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{exam.title}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                              </svg>
                              <span className="text-sm">{exam.course}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                              <span className="text-sm">{exam.startDate}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <span className="text-sm">{exam.questions} سوال</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center md:justify-end md:self-center">
                          <Link href={`/dashboard/courses/1/${exam.id}/exam/result` as any} className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            <span>مشاهده نتایج</span>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">آزمون گذشته‌ای وجود ندارد</h3>
                    <p className="text-gray-500">شما هنوز در هیچ آزمونی شرکت نکرده‌اید.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 