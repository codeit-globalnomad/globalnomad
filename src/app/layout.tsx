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
      <body className={Pretendard.className}>
        <QueryClientProvider>{children}</QueryClientProvider>
        <ToastContainer position='bottom-center' />
      </body>
    </html>
  );
}
