import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

type Subject = {
  id: number;
  title: string;
  duration: string;
  isCompleted?: boolean;
  content?: {
    videoUrl?: string;
    description?: string;
    sections?: {
      title: string;
      text: string;
      imageUrl?: string;
    }[];
  };
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
          { 
            id: 1, 
            title: 'تنفس سلولی - قسمت اول', 
            duration: '۱ ساعت', 
            isCompleted: true,
            content: {
              videoUrl: '/videos/sample-video.mp4',
              description: 'در این مبحث با مفاهیم اولیه تنفس سلولی آشنا می‌شوید. تنفس سلولی فرآیندی است که طی آن سلول‌ها از مواد مغذی برای تولید انرژی استفاده می‌کنند.',
              sections: [
                {
                  title: 'مقدمه‌ای بر تنفس سلولی',
                  text: 'تنفس سلولی فرآیندی بیوشیمیایی است که طی آن سلول‌ها از مواد مغذی، به ویژه گلوکز، برای تولید ATP استفاده می‌کنند. ATP مولکولی است که انرژی لازم برای فعالیت‌های سلولی را فراهم می‌کند.',
                  imageUrl: '/images/cell-respiration-intro.png'
                },
                {
                  title: 'مراحل اصلی تنفس سلولی',
                  text: 'تنفس سلولی شامل سه مرحله اصلی است: گلیکولیز، چرخه کربس (چرخه اسید سیتریک) و زنجیره انتقال الکترون. در این مبحث، به بررسی دقیق مرحله گلیکولیز می‌پردازیم.',
                  imageUrl: '/images/glycolysis.png'
                },
                {
                  title: 'گلیکولیز',
                  text: 'گلیکولیز اولین مرحله تنفس سلولی است که در سیتوپلاسم سلول رخ می‌دهد. در این مرحله، یک مولکول گلوکز به دو مولکول پیروات تبدیل می‌شود و در این فرآیند، مقداری ATP و NADH تولید می‌شود. گلیکولیز شامل ۱۰ واکنش آنزیمی متوالی است که به صورت دقیق تنظیم می‌شوند.',
                  imageUrl: '/images/glycolysis-detail.png'
                }
              ]
            }
          },
          { 
            id: 2, 
            title: 'تنفس سلولی - قسمت دوم', 
            duration: '۱:۲۰ ساعت', 
            isCompleted: true,
            content: {
              videoUrl: '/videos/sample-video2.mp4',
              description: 'در این مبحث به بررسی ادامه فرآیند تنفس سلولی می‌پردازیم و با چرخه کربس و زنجیره انتقال الکترون آشنا می‌شویم.',
              sections: [
                {
                  title: 'چرخه کربس',
                  text: 'چرخه کربس یا چرخه اسید سیتریک، دومین مرحله تنفس سلولی است که در میتوکندری رخ می‌دهد. در این چرخه، پیروات حاصل از گلیکولیز وارد واکنش‌های متعددی می‌شود و مولکول‌های حامل انرژی مانند NADH و FADH2 تولید می‌شوند.',
                  imageUrl: '/images/krebs-cycle.png'
                },
                {
                  title: 'زنجیره انتقال الکترون',
                  text: 'زنجیره انتقال الکترون آخرین مرحله تنفس سلولی است که در غشای داخلی میتوکندری رخ می‌دهد. در این مرحله، الکترون‌های پرانرژی از NADH و FADH2 از طریق زنجیره‌ای از پروتئین‌ها منتقل می‌شوند و انرژی آن‌ها برای تولید ATP استفاده می‌شود.'
                }
              ]
            }
          },
          { 
            id: 3, 
            title: 'فتوسنتز و آزمون', 
            duration: '۱:۴۰ ساعت', 
            isCompleted: false,
            content: {
              videoUrl: '/videos/sample-video3.mp4',
              description: 'در این مبحث با فرآیند فتوسنتز آشنا می‌شویم و نحوه تبدیل انرژی نورانی به انرژی شیمیایی در گیاهان را بررسی می‌کنیم.',
              sections: [
                {
                  title: 'مقدمه‌ای بر فتوسنتز',
                  text: 'فتوسنتز فرآیندی است که طی آن گیاهان، جلبک‌ها و برخی باکتری‌ها انرژی نورانی خورشید را به انرژی شیمیایی تبدیل می‌کنند. این فرآیند در کلروپلاست‌های سلول‌های گیاهی رخ می‌دهد و منجر به تولید گلوکز و اکسیژن می‌شود.',
                  imageUrl: '/images/photosynthesis-intro.png'
                },
                {
                  title: 'واکنش‌های نوری',
                  text: 'واکنش‌های نوری فتوسنتز در غشای تیلاکوئید کلروپلاست رخ می‌دهند. در این مرحله، انرژی نورانی جذب شده توسط کلروفیل به انرژی شیمیایی در قالب ATP و NADPH تبدیل می‌شود. همچنین در این مرحله، مولکول‌های آب شکسته می‌شوند و اکسیژن آزاد می‌شود.',
                  imageUrl: '/images/light-reactions.png'
                },
                {
                  title: 'چرخه کالوین',
                  text: 'چرخه کالوین یا واکنش‌های تاریکی فتوسنتز در استرومای کلروپلاست رخ می‌دهند. در این چرخه، ATP و NADPH تولید شده در واکنش‌های نوری برای تثبیت کربن دی‌اکسید و تولید قندهای سه کربنه استفاده می‌شوند. این قندها نهایتاً به گلوکز و سایر مولکول‌های آلی تبدیل می‌شوند.',
                  imageUrl: '/images/calvin-cycle.png'
                }
              ]
            }
          }
        ]
      }
    ]
  }
};

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function SubjectDetailPage({ params }: { params: { id: string, courseId: string, subjectId: string } }) {
  const categoryData = coursesData[params.id];
  if (!categoryData) return notFound();
  
  const courseId = parseInt(params.courseId);
  const course = categoryData.courses.find(c => c.id === courseId);
  if (!course) return notFound();
  
  const subjectId = parseInt(params.subjectId);
  const subject = course.subjects?.find(s => s.id === subjectId);
  if (!subject || !subject.content) return notFound();
  
  // مشخص کردن مبحث قبلی و بعدی
  const currentIndex = course.subjects?.findIndex(s => s.id === subjectId) || 0;
  const prevSubject = currentIndex > 0 ? course.subjects?.[currentIndex - 1] : null;
  const nextSubject = currentIndex < (course.subjects?.length || 0) - 1 ? course.subjects?.[currentIndex + 1] : null;

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
        <Link href={`/dashboard/courses/${params.id}/${courseId}`} className="hover:text-purple-600 transition-colors">
          {course.name}
        </Link>
        <svg className="mx-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span className="text-gray-700 font-medium">{subject.title}</span>
      </div>

      {/* هدر مبحث */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{subject.title}</h1>
        {subject.content.description && (
          <p className="text-gray-600 mb-4">{subject.content.description}</p>
        )}
        
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>مدت زمان: {subject.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
            <span>{toFaDigit(subject.content.sections?.length || 0)} بخش</span>
          </div>
        </div>
      </div>

      {/* ویدیو آموزشی */}
      {subject.content.videoUrl && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">ویدیو آموزشی</h2>
          <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden">
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              controls
              src={subject.content.videoUrl}
              poster="/images/video-thumbnail.jpg"
            ></video>
          </div>
          
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              دانلود ویدیو
            </button>
            
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              علامت‌گذاری به عنوان تکمیل شده
            </button>
          </div>
        </div>
      )}

      {/* محتوای آموزشی */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">محتوای آموزشی</h2>
        
        <div className="space-y-8">
          {subject.content.sections?.map((section, index) => (
            <div key={index} className="border-b border-gray-100 pb-8 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-bold text-gray-800 mb-3">{toFaDigit(index + 1)}. {section.title}</h3>
              <p className="text-gray-700 leading-7 mb-4">{section.text}</p>
              
              {section.imageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200">
                  <img src={section.imageUrl} alt={section.title} className="w-full h-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* دکمه‌های ناوبری */}
      <div className="flex justify-between mt-8">
        {prevSubject ? (
          <Link 
            href={`/dashboard/courses/${params.id}/${courseId}/subject/${prevSubject.id}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            مبحث قبلی: {prevSubject.title}
          </Link>
        ) : (
          <div></div>
        )}
        
        {nextSubject ? (
          <Link 
            href={`/dashboard/courses/${params.id}/${courseId}/subject/${nextSubject.id}`}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            مبحث بعدی: {nextSubject.title}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        ) : (
          <Link 
            href={`/dashboard/courses/${params.id}/${courseId}/exam`}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            شرکت در آزمون دوره
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
} 