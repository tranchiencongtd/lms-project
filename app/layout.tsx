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
  icons: "./icon.svg",
  openGraph: {
    title: 'congtcdev - Học lập trình miễn phí',
    description: 'Website dạy lập trình miễn phí. Học lập trình qua dự án thực tế cho các bạn học viên IT. Cung cấp các khoá học chất lượng giúp các bạn tăng kỹ năng và kiến thức trong nghề.',
    images: ['https://raw.githubusercontent.com/tranchiencongtd/hosting-file/main/images/logo2.png'],
    type: "article"
  }
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
