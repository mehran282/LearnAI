import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

type Subject = {
  id: number;
  title: string;
  duration: string;
  isCompleted?: boolean;
};

type Course = { 
  id: number; 
  name: string; 
  subjectCount: number; 
  description?: string;
  duration?: string;
  progress?: number;
  subjects?: Subject[];
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
        progress: 75,
        subjects: [
          { id: 1, title: 'تنفس سلولی - قسمت اول', duration: '۱ ساعت', isCompleted: true },
          { id: 2, title: 'تنفس سلولی - قسمت دوم', duration: '۱:۲۰ ساعت', isCompleted: true },
          { id: 3, title: 'فتوسنتز و آزمون', duration: '۱:۴۰ ساعت', isCompleted: false }
        ]
      },
      { 
        id: 2, 
        name: 'فصل ۲ پایه یازدهم', 
        subjectCount: 3, 
        description: 'تقسیم سلولی و چرخه سلولی', 
        duration: '۵ ساعت',
        progress: 40,
        subjects: [
          { id: 1, title: 'تقسیم میتوز', duration: '۱:۳۰ ساعت', isCompleted: true },
          { id: 2, title: 'تقسیم میوز', duration: '۱:۴۰ ساعت', isCompleted: false },
          { id: 3, title: 'چرخه سلولی و آزمون', duration: '۱:۵۰ ساعت', isCompleted: false }
        ]
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
        progress: 100,
        subjects: [
          { id: 1, title: 'وراثت مندلی - قسمت اول', duration: '۲ ساعت', isCompleted: true },
          { id: 2, title: 'وراثت مندلی - قسمت دوم', duration: '۲:۳۰ ساعت', isCompleted: true },
          { id: 3, title: 'حل مسائل ژنتیک و آزمون', duration: '۲:۳۰ ساعت', isCompleted: true }
        ]
      },
    ],
  },
};

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function CourseDetailPage({ params }: { params: { id: string, courseId: string } }) {
  const categoryData = coursesData[params.id];
  if (!categoryData) return notFound();
  
  const courseId = parseInt(params.courseId);
  const course = categoryData.courses.find(c => c.id === courseId);
  if (!course) return notFound();
  
  // محاسبه تعداد مباحث تکمیل شده
  const completedSubjects = course.subjects?.filter(s => s.isCompleted).length || 0;
  const totalSubjects = course.subjects?.length || 0;
  const progressPercentage = totalSubjects ? Math.round((completedSubjects / totalSubjects) * 100) : 0;

  return (
    <div className="container mx-auto py-8 px-4">
      {/* مسیر دسترسی (breadcrumb) */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-purple-600 transition-colors">
          داشبورد
        </Link>
        <svg className="mx-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <Link href="/dashboard/courses" className="hover:text-purple-600 transition-colors">
          دوره‌ها
        </Link>
        <svg className="mx-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <Link href={`/dashboard/courses/${params.id}`} className="hover:text-purple-600 transition-colors">
          {categoryData.title}
        </Link>
        <svg className="mx-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span className="text-gray-700 font-medium">{course.name}</span>
      </div>

      {/* هدر دوره */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{course.name}</h1>
            {course.description && (
              <p className="text-gray-600 max-w-2xl mb-4">{course.description}</p>
            )}
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>{toFaDigit(totalSubjects)} مبحث</span>
              </div>
              
              {course.duration && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>مدت زمان: {course.duration}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{toFaDigit(completedSubjects)} مبحث تکمیل شده</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
            <div className="w-24 h-24 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E9D5FF"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={progressPercentage === 100 ? "#22C55E" : "#A855F7"}
                  strokeWidth="10"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progressPercentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-800">
                {toFaDigit(progressPercentage)}٪
              </div>
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">پیشرفت دوره</span>
          </div>
        </div>
      </div>

      {/* لیست مباحث دوره */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">مباحث این دوره</h2>
        
        <div className="space-y-4">
          {course.subjects?.map((subject, index) => (
            <div 
              key={subject.id}
              className={`p-4 rounded-xl border ${
                subject.isCompleted 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              } hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    subject.isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-purple-100 text-purple-500'
                  }`}>
                    {subject.isCompleted ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      <span className="text-sm font-bold">{toFaDigit(index + 1)}</span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{subject.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-gray-500 text-sm flex items-center">
                        <svg className="w-4 h-4 ml-1 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {subject.duration}
                      </span>
                      
                      {subject.isCompleted ? (
                        <span className="text-green-600 text-sm font-medium flex items-center">
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          تکمیل شده
                        </span>
                      ) : (
                        <span className="text-purple-600 text-sm font-medium">در انتظار مطالعه</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <Link
                  href={`/dashboard/courses/${params.id}/${courseId}/subject/${subject.id}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    subject.isCompleted 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  } transition-colors`}
                >
                  {subject.isCompleted ? 'مشاهده مجدد' : 'شروع یادگیری'}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* دکمه‌های پایین صفحه */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            دانلود جزوه دوره
          </button>
          <Link 
            href={`/dashboard/courses/${params.id}/${course.id}/exam`}
            className="px-6 py-3 bg-white text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            شرکت در آزمون دوره
          </Link>
        </div>
      </div>
    </div>
  );
} 