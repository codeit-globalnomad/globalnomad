import { Pretendard } from '@/font';
import './globals.css';
import { Metadata } from 'next';
import QueryClientProvider from '@/components/provider/queryProvider';

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
      </body>
    </html>
  );
}
