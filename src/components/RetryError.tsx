import Image from 'next/image';
import noData from '@/assets/icons/No-data.svg';
import Button from '@/components/Button';
import Link from 'next/link';

export default function RetryError({ onRetry, className = '' }: { onRetry: () => void; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-10 whitespace-nowrap ${className}`}>
      <Image className='h-[136px] w-[136px]' alt='에러' src={noData} priority />
      <div className='text-center'>
        <h1 className='text-xl font-bold text-gray-800 md:text-2xl'>에러가 발생했습니다.</h1>
        <p className='mt-2 text-gray-800 md:text-lg'>잠시 후에 다시 시도해 주세요.</p>
      </div>
      <div className='flex gap-4'>
        <Button variant={'outline'} onClick={onRetry} className='text-md px-6 py-2 md:text-lg'>
          다시 시도하기
        </Button>
        <Link href='/'>
          <Button className='text-md px-6 py-2 md:text-lg'>홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
