import React from 'react';
import Link from 'next/link';

type CourseCategory = {
  id: string;
  title: string;
  image: string;
  href: string;
  count?: number;
};

const courseCategories: CourseCategory[] = [
  {
    id: 'bio-11',
    title: 'زیست شناسی پایه یازدهم',
    image: '/images/bio11.png',
    href: '/dashboard/courses/bio-11',
    count: 3
  },
  {
    id: 'bio-12',
    title: 'زیست شناسی پایه دوازدهم',
    image: '/images/bio12.png',
    href: '/dashboard/courses/bio-12',
    count: 4
  },
];

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

const CoursesCategoriesPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">دسته‌بندی دوره‌ها</h1>
        <div className="mt-4 sm:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی دوره..."
              className="w-full sm:w-64 px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              aria-label="جستجوی دوره"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseCategories.map((cat) => (
          <Link
            key={cat.id}
            href={{ pathname: cat.href }}
            className="group relative block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-300"
            tabIndex={0}
            aria-label={cat.title}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/80 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            
            <div className="relative h-44 bg-purple-100 overflow-hidden">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="p-5 relative z-20">
              <h2 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors mb-2">{cat.title}</h2>
              
              <div className="flex items-center justify-between mt-3">
                <span className="bg-purple-50 text-purple-700 rounded-full px-3 py-1 text-xs font-bold">
                  {cat.count ? `${toFaDigit(cat.count)} فصل` : 'بدون فصل'}
                </span>
                
                <span className="text-gray-500 group-hover:text-purple-600 transition-colors inline-flex items-center text-sm">
                  مشاهده دوره‌ها
                  <svg className="w-4 h-4 mr-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-10">
        <div className="text-center p-6 bg-purple-50 rounded-2xl shadow-sm border border-purple-100">
          <h3 className="text-lg font-bold text-purple-800 mb-2">دوره مورد نظرتان را نمی‌یابید؟</h3>
          <p className="text-purple-600 mb-4">با پشتیبانی تماس بگیرید یا درخواست دوره جدید ثبت کنید</p>
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="درخواست دوره جدید"
          >
            درخواست دوره جدید
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesCategoriesPage; 