import Link from 'next/link';

export default function Dashboard() {
  const cards = [
    { 
      title: 'تیکت‌ها', 
      description: 'مدیریت تیکت‌های پشتیبانی',
      link: '/dashboard/tickets',
      count: 3,
      color: 'bg-blue-500'
    },
    { 
      title: 'دوره‌ها', 
      description: 'مشاهده لیست دوره‌های در حال یادگیری',
      link: '/dashboard/courses',
      count: 5,
      color: 'bg-green-500'
    },
    { 
      title: 'آزمون‌ها', 
      description: 'شرکت در آزمون‌های آنلاین',
      link: '/dashboard/exams',
      count: 2,
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-xl md:text-2xl font-bold">داشبورد</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.link as any}
            className="block bg-white p-4 md:p-6 rounded-lg shadow hover:shadow-md transition-shadow touch-manipulation"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{card.title}</h2>
                <p className="text-gray-600 text-sm md:text-base">{card.description}</p>
              </div>
              <div className={`${card.color} text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl font-bold`}>
                {card.count}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">اعلان‌های اخیر</h2>
        <ul className="space-y-3 md:space-y-4">
          <li className="pb-3 md:pb-4 border-b">
            <p className="font-medium text-sm md:text-base">دوره «برنامه‌نویسی وب» به‌روزرسانی شد</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">۲ ساعت پیش</p>
          </li>
          <li className="pb-3 md:pb-4 border-b">
            <p className="font-medium text-sm md:text-base">آزمون «مبانی شبکه» در تاریخ ۱۴۰۳/۰۳/۱۵ برگزار می‌شود</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">۱ روز پیش</p>
          </li>
          <li>
            <p className="font-medium text-sm md:text-base">تیکت شما پاسخ داده شد</p>
            <p className="text-gray-600 text-xs md:text-sm mt-1">۳ روز پیش</p>
          </li>
        </ul>
      </div>
    </div>
  );
} 