"use client";

import { useState } from 'react';
import Link from 'next/link';
import { TicketStatusBadge } from '@/components/tickets/TicketStatusBadge';
import { TicketDepartmentBadge } from '@/components/tickets/TicketDepartmentBadge';

type Ticket = {
  id: number;
  title: string;
  status: 'new' | 'in_progress' | 'answered' | 'closed';
  department: 'education' | 'technical' | 'financial';
  createdAt: string;
  lastUpdated: string;
};

export default function TicketsPage() {
  // این دیتا در حالت واقعی از API دریافت می‌شود
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: 'مشکل در دسترسی به دوره برنامه‌نویسی وب',
      status: 'new',
      department: 'education',
      createdAt: '۱۴۰۳/۰۳/۱۰',
      lastUpdated: '۱۴۰۳/۰۳/۱۰'
    },
    {
      id: 2,
      title: 'سوال در مورد پرداخت شهریه',
      status: 'in_progress',
      department: 'financial',
      createdAt: '۱۴۰۳/۰۳/۰۵',
      lastUpdated: '۱۴۰۳/۰۳/۰۷'
    },
    {
      id: 3,
      title: 'مشکل در بارگذاری ویدیوهای آموزشی',
      status: 'answered',
      department: 'technical',
      createdAt: '۱۴۰۳/۰۲/۲۵',
      lastUpdated: '۱۴۰۳/۰۲/۲۸'
    },
    {
      id: 4,
      title: 'درخواست تغییر گروه آموزشی',
      status: 'closed',
      department: 'education',
      createdAt: '۱۴۰۳/۰۲/۱۵',
      lastUpdated: '۱۴۰۳/۰۲/۲۰'
    }
  ]);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 className="text-xl md:text-2xl font-bold">تیکت‌های پشتیبانی</h1>
        <Link 
          href={"/dashboard/tickets/new" as any}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors text-center sm:text-right touch-manipulation"
        >
          ایجاد تیکت جدید
        </Link>
      </div>

      {/* نمایش کارت‌ها در حالت موبایل */}
      <div className="sm:hidden space-y-4">
        {tickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="bg-white rounded-lg shadow p-4 touch-manipulation"
            onClick={() => window.location.href = `/dashboard/tickets/${ticket.id}`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium">{ticket.title}</h3>
              <span className="text-gray-500 text-sm">#{ticket.id}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <TicketStatusBadge status={ticket.status} />
              <TicketDepartmentBadge department={ticket.department} />
            </div>
            <div className="text-sm text-gray-500 flex justify-between">
              <span>ایجاد: {ticket.createdAt}</span>
              <span>بروزرسانی: {ticket.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>

      {/* نمایش جدول در تبلت و دسکتاپ */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                  شماره
                </th>
                <th scope="col" className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                  عنوان
                </th>
                <th scope="col" className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                  وضعیت
                </th>
                <th scope="col" className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                  واحد
                </th>
                <th scope="col" className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                  تاریخ ایجاد
                </th>
                <th scope="col" className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider">
                  آخرین بروزرسانی
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer touch-manipulation" onClick={() => window.location.href = `/dashboard/tickets/${ticket.id}`}>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ticket.id}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ticket.title}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <TicketStatusBadge status={ticket.status} />
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <TicketDepartmentBadge department={ticket.department} />
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.createdAt}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.lastUpdated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 