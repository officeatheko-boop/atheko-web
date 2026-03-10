'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import { Toaster } from 'sonner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if it's an admin page
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      <Toaster richColors />
      {!isAdminRoute && <Footer />}
    </>
  );
}
