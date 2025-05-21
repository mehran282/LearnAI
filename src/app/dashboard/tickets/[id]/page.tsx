"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { TicketStatusBadge } from '@/components/tickets/TicketStatusBadge';
import { TicketDepartmentBadge, TicketDepartment } from '@/components/tickets/TicketDepartmentBadge';
import { TicketMessage } from '@/components/tickets/TicketMessage';

type TicketStatus = 'new' | 'in_progress' | 'answered' | 'closed';

type TicketMessage = {
  id: number;
  isAdmin: boolean;
  message: string;
  sender: string;
  date: string;
};

type TicketDetail = {
  id: number;
  title: string;
  status: TicketStatus;
  department: TicketDepartment;
  createdAt: string;
  messages: TicketMessage[];
};

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function TicketDetailPage() {
  const { id } = useParams();
  const ticketId = Array.isArray(id) ? id[0] : id;
  
  // دیتای نمونه برای نمایش - در حالت واقعی از API دریافت می‌شود
  const [ticket, setTicket] = useState<TicketDetail>({
    id: Number(ticketId),
    title: 'مشکل در دسترسی به دوره برنامه‌نویسی وب',
    status: 'in_progress',
    department: 'education',
    createdAt: '۱۴۰۳/۰۳/۱۰',
    messages: [
      {
        id: 1,
        isAdmin: false,
        message: 'سلام، من نمی‌توانم به محتوای دوره برنامه‌نویسی وب دسترسی داشته باشم. با وجود اینکه دوره را خریداری کرده‌ام، هنگام ورود به صفحه دوره با خطا مواجه می‌شوم.',
        sender: 'شما',
        date: '۱۴۰۳/۰۳/۱۰ - ۱۰:۱۵'
      },
      {
        id: 2,
        isAdmin: true,
        message: 'با سلام و احترام\nلطفا نام کاربری خود را ارسال کنید تا بررسی کنیم. همچنین اگر امکان دارد تصویری از خطای مشاهده شده را نیز ارسال نمایید.',
        sender: 'پشتیبان آموزش',
        date: '۱۴۰۳/۰۳/۱۰ - ۱۱:۳۰'
      },
      {
        id: 3,
        isAdmin: false,
        message: 'نام کاربری من example@mail.com است. تصویر خطا را به پیوست ارسال می‌کنم.',
        sender: 'شما',
        date: '۱۴۰۳/۰۳/۱۰ - ۱۱:۴۵'
      }
    ]
  });

  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setIsSubmitting(true);
    
    // در حالت واقعی، پیام به سرور ارسال می‌شود
    setTimeout(() => {
      const newTicketMessage: TicketMessage = {
        id: ticket.messages.length + 1,
        isAdmin: false,
        message: newMessage,
        sender: 'شما',
        date: '۱۴۰۳/۰۳/۱۰ - ۱۲:۰۰'
      };
      
      setTicket(prev => ({
        ...prev,
        messages: [...prev.messages, newTicketMessage],
        status: 'answered'
      }));
      
      setNewMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  const canReply = ticket.status !== 'closed';

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
        <h1 className="text-lg md:text-xl font-bold">تیکت شماره {toFaDigit(ticket.id)}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-6">
        <div className="border-b pb-3 md:pb-4 mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-bold mb-2">{ticket.title}</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="text-gray-600">تاریخ ایجاد: {toFaDigit(ticket.createdAt)}</span>
            <span className="mx-2 hidden sm:inline-block">•</span>
            <TicketStatusBadge status={ticket.status} />
            <span className="mx-2 hidden sm:inline-block">•</span>
            <TicketDepartmentBadge department={ticket.department} />
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <div className="space-y-3 md:space-y-4">
            {ticket.messages.map((msg) => (
              <TicketMessage
                key={msg.id}
                isAdmin={msg.isAdmin}
                message={msg.message}
                sender={msg.sender}
                date={toFaDigit(msg.date)}
              />
            ))}
          </div>
        </div>

        {canReply ? (
          <form onSubmit={handleSubmit} className="border-t pt-3 md:pt-4">
            <div className="mb-3 md:mb-4">
              <label htmlFor="message" className="block mb-2 font-medium text-sm md:text-base">
                پاسخ شما
              </label>
              <textarea
                id="message"
                rows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="پیام خود را وارد کنید..."
                className="w-full px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                disabled={isSubmitting}
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-md transition-colors disabled:opacity-70 text-sm md:text-base w-full sm:w-auto"
              >
                {isSubmitting ? 'در حال ارسال...' : 'ارسال پاسخ'}
              </button>
            </div>
          </form>
        ) : (
          <div className="border-t pt-3 md:pt-4 text-center p-3 md:p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600 text-sm md:text-base">این تیکت بسته شده است و امکان ارسال پاسخ وجود ندارد.</p>
          </div>
        )}
      </div>
    </div>
  );
} 