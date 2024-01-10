import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "congtcdev",
  description: "congtcdev - Dạy lập trình",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <NextTopLoader showSpinner={false} />
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
