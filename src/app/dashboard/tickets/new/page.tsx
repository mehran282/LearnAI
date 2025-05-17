"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TicketDepartment } from '@/components/tickets/TicketDepartmentBadge';

export default function NewTicketPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [department, setDepartment] = useState<TicketDepartment>('education');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // در اینجا باید اطلاعات تیکت به سرور ارسال شود
    // این کد فقط برای نمایش فرایند است
    setTimeout(() => {
      setIsSubmitting(false);
      // بعد از ثبت تیکت، کاربر به صفحه لیست تیکت‌ها هدایت می‌شود
      router.push('/dashboard/tickets');
    }, 1500);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Link 
          href={"/dashboard/tickets" as any}
          className="text-blue-600 hover:text-blue-800 transition-colors mb-2 sm:mb-0 sm:ml-4"
        >
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            بازگشت به لیست تیکت‌ها
          </span>
        </Link>
        <h1 className="text-xl md:text-2xl font-bold">ایجاد تیکت جدید</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              عنوان تیکت
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="مثال: مشکل در دسترسی به دوره"
            />
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              واحد مربوطه
            </label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value as TicketDepartment)}
              className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="education">آموزش</option>
              <option value="technical">فنی</option>
              <option value="financial">مالی</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              متن پیام
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              placeholder="توضیحات خود را وارد کنید..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 md:px-6 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-base w-full sm:w-auto"
            >
              {isSubmitting ? 'در حال ثبت...' : 'ثبت تیکت'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 