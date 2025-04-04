import { Pretendard } from '@/font';
import './globals.css';
import { Metadata } from 'next';
import QueryClientProvider from '@/components/provider/queryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'GlobalNomad',
  description: '여러 종류의 체험을 예약하세요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${Pretendard.className} bg-gray-100`}>
        <QueryClientProvider>{children}</QueryClientProvider>
        <ToastContainer position='top-right' />
      </body>
    </html>
  );
}
