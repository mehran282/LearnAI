import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

type Course = { 
  id: number; 
  name: string; 
  subjectCount: number; 
  description?: string;
  duration?: string;
  progress?: number;
};

type CoursesDataType = {
  [key: string]: {
    title: string;
    description?: string;
    courses: Course[];
  };
};

const coursesData: CoursesDataType = {
  'bio-11': {
    title: 'زیست شناسی پایه یازدهم',
    description: 'دوره‌های زیست شناسی پایه یازدهم برای آمادگی کنکور و امتحانات نهایی',
    courses: [
      { 
        id: 1, 
        name: 'فصل ۱ پایه یازدهم', 
        subjectCount: 3, 
        description: 'مباحث پایه در تنفس سلولی و فتوسنتز', 
        duration: '۴ ساعت',
        progress: 75
      },
      { 
        id: 2, 
        name: 'فصل ۲ پایه یازدهم', 
        subjectCount: 3, 
        description: 'تقسیم سلولی و چرخه سلولی', 
        duration: '۵ ساعت',
        progress: 40
      },
      { 
        id: 3, 
        name: 'فصل ۳ پایه یازدهم', 
        subjectCount: 3, 
        description: 'سیستم گردش خون و تنفس', 
        duration: '۶ ساعت',
        progress: 0
      },
    ],
  },
  'bio-12': {
    title: 'زیست شناسی پایه دوازدهم',
    description: 'دوره‌های زیست شناسی پایه دوازدهم برای آمادگی کنکور و امتحانات نهایی',
    courses: [
      { 
        id: 1, 
        name: 'فصل ۵ پایه دوازدهم', 
        subjectCount: 3, 
        description: 'ژنتیک مندلی و وراثت', 
        duration: '۷ ساعت',
        progress: 100
      },
      { 
        id: 2, 
        name: 'فصل ۶ پایه دوازدهم', 
        subjectCount: 3, 
        description: 'ژنتیک جمعیت و تکامل', 
        duration: '۵ ساعت',
        progress: 30
      },
      { 
        id: 3, 
        name: 'فصل ۷ پایه دوازدهم', 
        subjectCount: 3, 
        description: 'رفتارشناسی و محیط زیست', 
        duration: '۴ ساعت',
        progress: 0
      },
      { 
        id: 4, 
        name: 'فصل ۸ پایه دوازدهم', 
        subjectCount: 3, 
        description: 'بیوتکنولوژی و مهندسی ژنتیک', 
        duration: '۶ ساعت',
        progress: 0
      },
    ],
  },
};

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function CourseListPage({ params }: { params: { id: string } }) {
  const data = coursesData[params.id];
  if (!data) return notFound();

  return (
    <div className="container mx-auto py-8 px-4">
      {/* هدر صفحه */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{data.title}</h1>
            {data.description && (
              <p className="text-gray-600 max-w-2xl">{data.description}</p>
            )}
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو در دوره‌ها..."
                className="w-full md:w-64 px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                aria-label="جستجو در دوره‌ها"
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
      </div>

      {/* فیلترها */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          همه دوره‌ها
        </button>
        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          تکمیل شده
        </button>
        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          در حال مطالعه
        </button>
        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          شروع نشده
        </button>
      </div>

      {/* لیست دوره‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.courses.map((course: Course) => (
          <Link
            key={course.id}
            href={{ pathname: `/dashboard/courses/${params.id}/${course.id}` }}
            className="bg-white rounded-xl shadow hover:shadow-xl border border-gray-100 hover:border-purple-300 transition-all duration-300 overflow-hidden flex flex-col"
            tabIndex={0}
            aria-label={course.name}
          >
            {/* نوار پیشرفت */}
            {course.progress !== undefined && (
              <div className="w-full h-1 bg-gray-100">
                <div 
                  className={`h-full ${
                    course.progress === 100 
                      ? 'bg-green-500' 
                      : course.progress > 0 
                        ? 'bg-purple-500' 
                        : 'bg-gray-200'
                  }`} 
                  style={{ width: `${course.progress}%` }}
                  aria-label={`پیشرفت ${toFaDigit(course.progress)}٪`}
                  role="progressbar"
                  aria-valuenow={course.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            )}
            
            <div className="p-5 flex-1 flex flex-col">
              {/* وضعیت دوره */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg font-bold text-gray-800">{course.name}</h2>
                <div>
                  {course.progress === 100 && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-bold rounded-full px-2 py-1">
                      تکمیل شده
                    </span>
                  )}
                  {course.progress !== undefined && course.progress > 0 && course.progress < 100 && (
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs font-bold rounded-full px-2 py-1">
                      در حال مطالعه
                    </span>
                  )}
                  {course.progress === 0 && (
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs font-bold rounded-full px-2 py-1">
                      شروع نشده
                    </span>
                  )}
                </div>
              </div>
              
              {/* توضیحات دوره */}
              {course.description && (
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              )}
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <span className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 ml-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    {toFaDigit(course.subjectCount)} مبحث
                  </span>
                  
                  {course.duration && (
                    <span className="flex items-center text-xs text-gray-500">
                      <svg className="w-4 h-4 ml-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {course.duration}
                    </span>
                  )}
                </div>
                
                <div className="rounded-full w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* دکمه درخواست دوره جدید */}
      <div className="mt-10 flex justify-center">
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          درخواست محتوای جدید
        </button>
      </div>
    </div>
  );
} 