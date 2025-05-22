"use client";

import { useState } from 'react';
import Link from 'next/link';

// تابع تبدیل اعداد انگلیسی به فارسی
const toFaDigit = (val: string | number) =>
  String(val).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  
  // اطلاعات مصنوعی کاربر
  const userInfo = {
    name: 'کاربر نمونه',
    email: 'user@example.com',
    phone: '09123456789',
    nationalCode: '1234567890',
    birthday: '1380/04/15',
    educationLevel: 'کارشناسی',
    major: 'مهندسی کامپیوتر',
    address: 'تهران، خیابان انقلاب',
    joinDate: '1402/05/20',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">پروفایل کاربری</h1>
          <p className="text-gray-500 text-sm mt-1">مدیریت اطلاعات حساب کاربری</p>
        </div>
        <Link href="/dashboard" className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          بازگشت به داشبورد
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* هدر پروفایل با عکس کاربر */}
        <div className="bg-purple-50 p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold">
                {userInfo.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 left-0 bg-white p-1.5 rounded-full shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </button>
            </div>
            <div className="text-center sm:text-right">
              <h2 className="text-xl font-bold">{userInfo.name}</h2>
              <p className="text-gray-500 text-sm">{userInfo.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                تاریخ عضویت: {userInfo.joinDate}
              </p>
            </div>
          </div>
        </div>
        
        {/* تب‌های پروفایل */}
        <div className="border-b border-gray-100">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'personal' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('personal')}
            >
              اطلاعات شخصی
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'account' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('account')}
            >
              تنظیمات حساب
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === 'security' 
                  ? 'border-purple-500 text-purple-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('security')}
            >
              امنیت
            </button>
          </div>
        </div>
        
        {/* محتوای تب‌ها */}
        <div className="p-6">
          {/* اطلاعات شخصی */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                  <input 
                    type="text" 
                    value={userInfo.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
                  <input 
                    type="email" 
                    value={userInfo.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
                  <input 
                    type="tel" 
                    value={userInfo.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">کد ملی</label>
                  <input 
                    type="text" 
                    value={userInfo.nationalCode}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-left"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ تولد</label>
                  <input 
                    type="text" 
                    value={userInfo.birthday}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مقطع تحصیلی</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option>دیپلم</option>
                    <option>کاردانی</option>
                    <option selected>کارشناسی</option>
                    <option>کارشناسی ارشد</option>
                    <option>دکتری</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
                  <textarea 
                    rows={3}
                    value={userInfo.address}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          )}
          
          {/* تنظیمات حساب */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">تنظیمات زبان و منطقه زمانی</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">زبان</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option selected>فارسی</option>
                      <option>English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">منطقه زمانی</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option selected>تهران (GMT+3:30)</option>
                      <option>لندن (GMT+0:00)</option>
                      <option>نیویورک (GMT-5:00)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">اعلان‌ها</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">اعلان‌های ایمیلی</p>
                      <p className="text-sm text-gray-500">دریافت اعلان‌ها از طریق ایمیل</p>
                    </div>
                    <div className="relative inline-block w-10 ml-2 align-middle select-none">
                      <input type="checkbox" name="email_notifications" id="email_notifications" className="checked:bg-purple-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked />
                      <label htmlFor="email_notifications" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">اعلان‌های پیامکی</p>
                      <p className="text-sm text-gray-500">دریافت اعلان‌ها از طریق پیامک</p>
                    </div>
                    <div className="relative inline-block w-10 ml-2 align-middle select-none">
                      <input type="checkbox" name="sms_notifications" id="sms_notifications" className="checked:bg-purple-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                      <label htmlFor="sms_notifications" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          )}
          
          {/* امنیت */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">تغییر رمز عبور</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور فعلی</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="رمز عبور فعلی خود را وارد کنید"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور جدید</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="رمز عبور جدید را وارد کنید"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">تکرار رمز عبور جدید</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="رمز عبور جدید را مجدداً وارد کنید"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    <p>رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف بزرگ، حروف کوچک، اعداد و نمادها باشد.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">تأیید دو مرحله‌ای</h3>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-start">
                  <div className="bg-purple-100 p-2 rounded-lg text-purple-600 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">تأیید دو مرحله‌ای</h4>
                        <p className="text-sm text-gray-600 mt-1">با فعال کردن این گزینه، علاوه بر رمز عبور، یک کد تأیید به شماره موبایل شما ارسال می‌شود.</p>
                      </div>
                      <div className="relative inline-block w-10 ml-2 align-middle select-none mt-1">
                        <input type="checkbox" name="two_factor" id="two_factor" className="checked:bg-purple-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                        <label htmlFor="two_factor" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  ذخیره تغییرات
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 