import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'MSHG Intel — Marketing Dashboard',
  description: 'Marketing analytics dashboard for Real Dough Pizza Co.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('mshg-auth')?.value === 'authenticated';

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {isAuthenticated ? (
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-60 pt-14 lg:pt-0">
              <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
