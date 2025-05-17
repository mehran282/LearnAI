import './globals/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'سیستم آموزش آنلاین',
  description: 'سیستم آموزش آنلاین و آزمون آنلاین',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazirmatn bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
} 