import { Pretendard } from '@/font';
import './globals.css';
import { Metadata } from 'next';
import QueryClientProvider from '@/components/provider/queryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: 'GlobalNomad - 체험을 한 곳에서 간편하게',
  description: '다채로운 체험을 간편하게 예약하고, 잊지 못할 추억을 만들어 보세요!',
  openGraph: {
    title: 'GlobalNomad - 체험을 한 곳에서 간편하게',
    description: '다채로운 체험을 간편하게 예약하고, 잊지 못할 추억을 만들어 보세요!',
    images: ['/thumbnail.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${Pretendard.className} bg-gray-100`}>
        <Suspense>
          <QueryClientProvider>{children}</QueryClientProvider>
          <ToastContainer
            position='top-right'
            style={{ marginTop: '70px' }}
            toastClassName='custom-toast'
            autoClose={1500}
          />
        </Suspense>
      </body>
    </html>
  );
}
