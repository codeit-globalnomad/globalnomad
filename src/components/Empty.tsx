import Image from 'next/image';
import emptyIcon from '@/assets/icons/empty.svg';

interface EmptyProps {
  children: React.ReactNode;
  imageAlt?: string;
}

export default function Empty({ children, imageAlt = '빈 상태 아이콘' }: EmptyProps) {
  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <Image src={emptyIcon} alt={imageAlt} className='mb-6 h-[120px] w-[120px]' />
      <p className='text-lg font-medium text-gray-500'>{children}</p>
    </div>
  );
}
