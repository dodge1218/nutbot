import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LegalDisclaimer from '@/components/LegalDisclaimer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NutBot - Smart Nutrition Tracking',
  description: 'Track your nutrition, identify gaps, and optimize your diet with AI-powered insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-primary-600">NutBot</h1>
                  <span className="ml-2 text-sm text-gray-500">Smart Nutrition Tracking</span>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <a href="/dashboard" className="text-gray-700 hover:text-primary-600">
                    Dashboard
                  </a>
                  <a href="/log-food" className="text-gray-700 hover:text-primary-600">
                    Log Food
                  </a>
                  <a href="/recommendations" className="text-gray-700 hover:text-primary-600">
                    Recommendations
                  </a>
                  <a href="/education" className="text-gray-700 hover:text-primary-600">
                    Education
                  </a>
                  <a href="/settings" className="text-gray-700 hover:text-primary-600">
                    Settings
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <LegalDisclaimer compact />
              <div className="mt-4 text-center text-sm text-gray-500">
                <p>© 2024 NutBot. All rights reserved.</p>
                <p className="mt-1">
                  Built with Next.js, Tailwind CSS, and Prisma
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
