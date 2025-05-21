"use client";

import { notFound } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

type ExamQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

type Course = { 
  id: number; 
  name: string; 
  subjectCount: number; 
  description?: string;
  duration?: string;
  progress?: number;
  subjects?: any[];
  exam?: {
    title: string;
    description: string;
    timeLimit: number; // به دقیقه
    passingScore: number; // درصد
    questions: ExamQuestion[];
  };
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
        exam: {
          title: 'آزمون فصل اول: تنفس سلولی و فتوسنتز',
          description: 'این آزمون برای سنجش میزان یادگیری شما از مباحث تنفس سلولی و فتوسنتز طراحی شده است. لطفاً با دقت به سؤالات پاسخ دهید.',
          timeLimit: 15, // 15 دقیقه
          passingScore: 70, // 70٪
          questions: [
            {
              id: 1,
              question: 'کدام مورد اولین مرحله تنفس سلولی محسوب می‌شود؟',
              options: [
                'چرخه کربس', 
                'گلیکولیز', 
                'زنجیره انتقال الکترون', 
                'اکسیداسیون پیروات'
              ],
              correctAnswer: 1, // گلیکولیز
              explanation: 'گلیکولیز اولین مرحله تنفس سلولی است که در سیتوپلاسم سلول رخ می‌دهد و طی آن یک مولکول گلوکز به دو مولکول پیروات تبدیل می‌شود.'
            },
            {
              id: 2,
              question: 'محصول نهایی گلیکولیز کدام است؟',
              options: [
                'ATP', 
                'پیروات', 
                'NADH', 
                'استیل کوآنزیم A'
              ],
              correctAnswer: 1, // پیروات
              explanation: 'در پایان مرحله گلیکولیز، یک مولکول گلوکز به دو مولکول پیروات تبدیل می‌شود که در صورت وجود اکسیژن، وارد میتوکندری می‌شوند.'
            },
            {
              id: 3,
              question: 'چرخه کربس در کدام بخش سلول رخ می‌دهد؟',
              options: [
                'سیتوپلاسم', 
                'هسته', 
                'ماتریکس میتوکندری', 
                'غشای داخلی میتوکندری'
              ],
              correctAnswer: 2, // ماتریکس میتوکندری
              explanation: 'چرخه کربس یا چرخه اسید سیتریک در ماتریکس میتوکندری رخ می‌دهد.'
            },
            {
              id: 4,
              question: 'فتوسنتز در کدام اندامک سلولی انجام می‌شود؟',
              options: [
                'میتوکندری', 
                'کلروپلاست', 
                'گلژی', 
                'لیزوزوم'
              ],
              correctAnswer: 1, // کلروپلاست
              explanation: 'فتوسنتز در کلروپلاست‌های سلول‌های گیاهی انجام می‌شود. ساختار کلروپلاست به گونه‌ای است که می‌تواند انرژی نور خورشید را جذب کند.'
            },
            {
              id: 5,
              question: 'محصول نهایی واکنش‌های نوری فتوسنتز کدام است؟',
              options: [
                'اکسیژن و NADPH و ATP', 
                'گلوکز و اکسیژن', 
                'کربن دی‌اکسید و آب', 
                'اسیدهای آمینه و گلوکز'
              ],
              correctAnswer: 0, // اکسیژن و NADPH و ATP
              explanation: 'در واکنش‌های نوری فتوسنتز، انرژی نور خورشید برای تولید ATP و NADPH استفاده می‌شود و اکسیژن به عنوان محصول جانبی آزاد می‌شود.'
            },
            {
              id: 6,
              question: 'گیاهان کربن دی‌اکسید را در کدام چرخه تثبیت می‌کنند؟',
              options: [
                'چرخه کربس', 
                'چرخه کالوین', 
                'زنجیره انتقال الکترون', 
                'گلیکولیز'
              ],
              correctAnswer: 1, // چرخه کالوین
              explanation: 'گیاهان کربن دی‌اکسید را در چرخه کالوین تثبیت می‌کنند. در این چرخه، ATP و NADPH تولید شده در واکنش‌های نوری برای تبدیل کربن دی‌اکسید به قندهای سه کربنه استفاده می‌شوند.'
            },
            {
              id: 7,
              question: 'کدام عبارت در مورد تنفس سلولی صحیح است؟',
              options: [
                'تنفس سلولی فقط در حضور اکسیژن انجام می‌شود', 
                'گلیکولیز فقط در حضور اکسیژن انجام می‌شود', 
                'تمام مراحل تنفس سلولی در میتوکندری انجام می‌شود', 
                'گلیکولیز می‌تواند در غیاب اکسیژن نیز انجام شود'
              ],
              correctAnswer: 3, // گلیکولیز می‌تواند در غیاب اکسیژن نیز انجام شود
              explanation: 'گلیکولیز یک فرآیند بی‌هوازی است که می‌تواند در غیاب اکسیژن نیز انجام شود. در شرایط بی‌هوازی، پیروات به مولکول‌هایی مانند لاکتات یا اتانول تبدیل می‌شود.'
            },
            {
              id: 8,
              question: 'کدام مورد از محصولات چرخه کربس نیست؟',
              options: [
                'NADH', 
                'FADH2', 
                'ATP', 
                'اکسیژن'
              ],
              correctAnswer: 3, // اکسیژن
              explanation: 'اکسیژن از محصولات چرخه کربس نیست. محصولات اصلی چرخه کربس شامل NADH، FADH2، ATP و کربن دی‌اکسید هستند.'
            },
            {
              id: 9,
              question: 'مهم‌ترین آنزیم در تثبیت کربن دی‌اکسید در فتوسنتز کدام است؟',
              options: [
                'روبیسکو', 
                'ATP سنتاز', 
                'کلروفیل', 
                'کاتالاز'
              ],
              correctAnswer: 0, // روبیسکو
              explanation: 'روبیسکو (ریبولوز بیس فسفات کربوکسیلاز/اکسیژناز) مهم‌ترین آنزیم در تثبیت کربن دی‌اکسید در چرخه کالوین است. این آنزیم سرعت واکنش تثبیت کربن را تنظیم می‌کند.'
            },
            {
              id: 10,
              question: 'کدام عامل باعث باز شدن روزنه‌های هوایی در گیاهان می‌شود؟',
              options: [
                'افزایش غلظت کربن دی‌اکسید', 
                'کاهش غلظت اکسیژن', 
                'افزایش فشار تورگر سلول‌های نگهبان روزنه', 
                'کاهش دمای محیط'
              ],
              correctAnswer: 2, // افزایش فشار تورگر سلول‌های نگهبان روزنه
              explanation: 'افزایش فشار تورگر (فشار آب) در سلول‌های نگهبان روزنه باعث باز شدن روزنه‌های هوایی در گیاهان می‌شود. این فرآیند با جذب یون‌های پتاسیم و ورود آب به سلول‌های نگهبان انجام می‌شود.'
            }
          ]
        }
      }
    ]
  }
};

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

// تابع تبدیل ثانیه به فرمت mm:ss
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${toFaDigit(minutes.toString().padStart(2, '0'))}:${toFaDigit(secs.toString().padStart(2, '0'))}`;
};

export default function ExamPage({ params }: { params: { id: string, courseId: string } }) {
  const categoryData = coursesData[params.id];
  if (!categoryData) return notFound();
  
  const courseId = parseInt(params.courseId);
  const course = categoryData.courses.find(c => c.id === courseId);
  if (!course || !course.exam) return notFound();
  
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(course.exam.questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(course.exam.timeLimit * 60);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (examStarted && !examCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [examStarted, examCompleted]);
  
  const handleStartExam = () => {
    setExamStarted(true);
  };
  
  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < course.exam!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSubmitExam = () => {
    let correctAnswers = 0;
    
    selectedAnswers.forEach((selectedAnswer, index) => {
      if (selectedAnswer === course.exam!.questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / course.exam!.questions.length) * 100);
    setScore(finalScore);
    setExamCompleted(true);
    setShowResults(true);
  };
  
  const isPassing = score >= course.exam.passingScore;
  
  // وضعیت سؤالات (پاسخ داده شده یا نشده)
  const questionsStatus = selectedAnswers.map(answer => answer !== -1);
  
  // تعداد سؤالات پاسخ داده شده
  const answeredQuestionsCount = questionsStatus.filter(status => status).length;
  
  if (!examStarted) {
    return (
      <>
        <style jsx global>{`
          ${vazirFontFace}
          body {
            font-family: 'Vazirmatn', sans-serif;
            direction: rtl;
          }
        `}</style>
        <div className="container mx-auto py-4 px-3 sm:py-8 sm:px-4">
          {/* مسیر دسترسی (breadcrumb) */}
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 overflow-x-auto">
            <Link href="/dashboard" className="hover:text-purple-600 transition-colors flex items-center">
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              داشبورد
            </Link>
            <svg className="mx-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <Link href="/dashboard/courses" className="hover:text-purple-600 transition-colors flex items-center whitespace-nowrap">
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              دوره‌ها
            </Link>
            <svg className="mx-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <Link href={`/dashboard/courses/${params.id}`} className="hover:text-purple-600 transition-colors whitespace-nowrap">
              {categoryData.title}
            </Link>
            <svg className="mx-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <Link href={`/dashboard/courses/${params.id}/${courseId}`} className="hover:text-purple-600 transition-colors whitespace-nowrap">
              {course.name}
            </Link>
            <svg className="mx-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="text-gray-700 font-medium whitespace-nowrap">آزمون</span>
          </div>
          
          {/* صفحه شروع آزمون */}
          <div className="max-w-3xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-6 h-6 ml-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              {course.exam.title}
            </h1>
            <p className="text-gray-600 mb-6">{course.exam.description}</p>
            
            <div className="mb-6 grid gap-3 grid-cols-2 sm:grid-cols-4">
              <div className="bg-purple-50 p-3 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 ml-2 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-xs text-purple-700 font-bold">تعداد سؤالات</p>
                </div>
                <p className="text-base sm:text-xl font-bold text-purple-800 mt-1">{toFaDigit(course.exam.questions.length)} سؤال</p>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 ml-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-xs text-blue-700 font-bold">زمان آزمون</p>
                </div>
                <p className="text-base sm:text-xl font-bold text-blue-800 mt-1">{toFaDigit(course.exam.timeLimit)} دقیقه</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 ml-2 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-xs text-green-700 font-bold">نمره قبولی</p>
                </div>
                <p className="text-base sm:text-xl font-bold text-green-800 mt-1">{toFaDigit(course.exam.passingScore)}٪</p>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-xl">
                <div className="flex items-center">
                  <svg className="w-5 h-5 ml-2 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <p className="text-xs text-amber-700 font-bold">نوع آزمون</p>
                </div>
                <p className="text-base sm:text-xl font-bold text-amber-800 mt-1">چهار گزینه‌ای</p>
              </div>
            </div>
            
            <div className="mb-6 bg-yellow-50 border border-yellow-200 p-3 sm:p-4 rounded-xl">
              <h3 className="text-base sm:text-lg font-bold text-yellow-800 mb-2 flex items-center">
                <svg className="w-5 h-5 ml-1 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                توجه
              </h3>
              <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm">
                <li>پس از شروع آزمون، زمان‌سنج فعال می‌شود و نمی‌توانید آن را متوقف کنید.</li>
                <li>در صورت پایان زمان، آزمون به صورت خودکار ثبت می‌شود.</li>
                <li>می‌توانید در بین سؤالات جابجا شوید و پاسخ‌های خود را تغییر دهید.</li>
                <li>پس از اتمام آزمون، نتیجه به همراه پاسخ‌های صحیح نمایش داده می‌شود.</li>
              </ul>
            </div>
            
            <div className="flex justify-between">
              <Link 
                href={`/dashboard/courses/${params.id}/${courseId}`}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                </svg>
                بازگشت
              </Link>
              
              <button 
                onClick={handleStartExam}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                شروع آزمون
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  if (showResults) {
    return (
      <>
        <style jsx global>{`
          ${vazirFontFace}
          body {
            font-family: 'Vazirmatn', sans-serif;
            direction: rtl;
          }
        `}</style>
        <div className="container mx-auto py-4 px-3 sm:py-8 sm:px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <svg className="w-6 h-6 ml-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              نتیجه آزمون
            </h1>
            
            <div className="mb-8 text-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto relative">
                <svg className="w-28 h-28 sm:w-36 sm:h-36 transform -rotate-90" viewBox="0 0 100 100">
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
                    stroke={isPassing ? "#22C55E" : "#EF4444"}
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * score) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl font-bold text-gray-800">
                  {toFaDigit(score)}٪
                </div>
              </div>
              <p className="mt-4 text-lg font-bold text-gray-700 flex items-center justify-center">
                نتیجه: 
                {isPassing ? (
                  <span className="text-green-600 mr-1 flex items-center">
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    قبول
                  </span>
                ) : (
                  <span className="text-red-600 mr-1 flex items-center">
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    مردود
                  </span>
                )}
              </p>
              <p className="mt-2 text-gray-600 flex items-center justify-center">
                <svg className="w-5 h-5 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
                شما به {toFaDigit(answeredQuestionsCount)} سؤال از {toFaDigit(course.exam.questions.length)} سؤال پاسخ دادید.
              </p>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 ml-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              بررسی پاسخ‌ها
            </h2>
            
            <div className="space-y-6">
              {course.exam.questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-xl p-4 sm:p-6">
                  <p className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex">
                    <span className="ml-2 flex items-center justify-center bg-purple-100 text-purple-800 w-6 h-6 rounded-full text-sm">
                      {toFaDigit(index + 1)}
                    </span>
                    {question.question}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-50 border-green-200'
                            : optionIndex === selectedAnswers[index] && optionIndex !== question.correctAnswer
                              ? 'bg-red-50 border-red-200'
                              : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ml-2 ${
                            optionIndex === question.correctAnswer
                              ? 'bg-green-500 text-white'
                              : optionIndex === selectedAnswers[index] && optionIndex !== question.correctAnswer
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200'
                          }`}>
                            {optionIndex === question.correctAnswer ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            ) : optionIndex === selectedAnswers[index] && optionIndex !== question.correctAnswer ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            ) : (
                              <span className="text-xs text-gray-500">{toFaDigit(optionIndex + 1)}</span>
                            )}
                          </div>
                          <span className="text-gray-700 text-sm sm:text-base">{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs font-medium text-blue-800 flex items-center">
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        توضیح:
                      </p>
                      <p className="text-blue-700 mt-1 text-sm">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between">
              <Link 
                href={`/dashboard/courses/${params.id}/${courseId}`}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center text-sm sm:text-base"
              >
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                </svg>
                بازگشت به دوره
              </Link>
              
              <button 
                onClick={() => {
                  setExamStarted(false);
                  setExamCompleted(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers(Array(course.exam!.questions.length).fill(-1));
                  setTimeLeft(course.exam!.timeLimit * 60);
                  setShowResults(false);
                }}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center text-sm sm:text-base"
              >
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                تلاش مجدد
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <style jsx global>{`
        ${vazirFontFace}
        body {
          font-family: 'Vazirmatn', sans-serif;
          direction: rtl;
        }
      `}</style>
      <div className="container mx-auto py-4 px-3 sm:py-8 sm:px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-8">
          {/* هدر آزمون */}
          <div className="flex justify-between items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 ml-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                {course.exam.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center">
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                سؤال {toFaDigit(currentQuestion + 1)} از {toFaDigit(course.exam.questions.length)}
              </p>
            </div>
            
            <div className="text-center bg-purple-50 px-3 py-2 rounded-lg">
              <div className="text-lg sm:text-xl font-bold text-purple-800 flex items-center justify-center">
                <svg className="w-5 h-5 ml-1 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-purple-600">زمان باقیمانده</p>
            </div>
          </div>
          
          {/* اطلاعات تکمیلی */}
          <div className="mb-4 flex justify-between text-xs bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center">
              <svg className="w-4 h-4 ml-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{toFaDigit(answeredQuestionsCount)} سؤال پاسخ داده شده</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 ml-1 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span>{toFaDigit(course.exam.questions.length - answeredQuestionsCount)} سؤال باقیمانده</span>
            </div>
          </div>
          
          {/* سؤال فعلی */}
          <div className="mb-5">
            <div className="bg-purple-50 p-3 rounded-lg mb-4">
              <p className="text-base sm:text-lg font-bold text-gray-800 flex items-start">
                <span className="flex-shrink-0 ml-2 flex items-center justify-center bg-purple-600 text-white w-6 h-6 rounded-full text-sm mt-0.5">
                  {toFaDigit(currentQuestion + 1)}
                </span>
                <span>{course.exam.questions[currentQuestion].question}</span>
              </p>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {course.exam.questions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedAnswers[currentQuestion] === index
                      ? 'bg-purple-50 border-purple-300'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectAnswer(currentQuestion, index)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 ml-2 sm:ml-3 rounded-full border flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-purple-600 border-purple-600'
                        : 'border-gray-400'
                    }`}>
                      {selectedAnswers[currentQuestion] === index ? (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      ) : (
                        <span className="text-xs text-gray-500">{toFaDigit(index + 1)}</span>
                      )}
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* ناوبری سؤالات */}
          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-2 flex items-center">
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
              </svg>
              جابجایی بین سؤالات:
            </p>
            <div className="grid grid-cols-7 sm:grid-cols-10 gap-1 sm:gap-2">
              {questionsStatus.map((isAnswered, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-md sm:rounded-lg text-xs font-bold flex items-center justify-center ${
                    index === currentQuestion
                      ? 'bg-purple-600 text-white'
                      : isAnswered
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-800 border border-gray-300'
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {toFaDigit(index + 1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* دکمه‌های کنترل */}
          <div className="flex justify-between mt-5 sm:mt-8">
            <button
              disabled={currentQuestion === 0}
              onClick={handlePrevQuestion}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1 text-sm ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
              </svg>
              سؤال قبلی
            </button>
            
            {currentQuestion < course.exam.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-1 text-sm"
              >
                سؤال بعدی
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-3 py-2 sm:px-6 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1 text-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                پایان و ثبت آزمون
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 