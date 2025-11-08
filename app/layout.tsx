import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LegalDisclaimer from '@/components/LegalDisclaimer';
import Header from '@/components/Header';

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
          <Header />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <LegalDisclaimer compact />
              <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>© 2025 NutBot. All rights reserved.</p>
                <p className="mt-2 flex items-center justify-center space-x-4">
                  <span>Built with Next.js, Tailwind CSS, and Prisma</span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
