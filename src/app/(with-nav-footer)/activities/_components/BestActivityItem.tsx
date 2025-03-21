import starRating from '@/assets/icons/star-rating.svg';
import Image from 'next/image';
import { Activity } from '@/lib/types/activities';
import Link from 'next/link';

interface BestActivityItemProps {
  activity: Activity;
}

export default function BestActivityItem({ activity }: BestActivityItemProps) {
  return (
    <div className='relative aspect-[1.03] h-full max-h-[384px] min-h-[186px] w-full max-w-[384px] min-w-[186px] cursor-pointer overflow-hidden rounded-3xl'>
      <Link href={`/activities/${activity.id}`}>
        <Image
          src={activity.bannerImageUrl}
          fill
          className='object-cover transition-transform duration-300 ease-in-out will-change-transform hover:scale-105'
          alt={`${activity.title} 배너 이미지`}
          style={{ transformOrigin: 'center' }}
        />
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/100' />
        <div className='absolute bottom-0 px-5 pb-[24px] md:pb-[30px]'>
          <div className='flex gap-[5px]'>
            <Image src={starRating} width={18} height={18} alt='별점' />
            <p className='text-md font-semibold text-white'>
              {activity.rating.toFixed(1)} ({activity.reviewCount})
            </p>
          </div>
          <div className='text-2lg mt-[6px] line-clamp-2 font-bold break-keep text-white md:mt-[20px] md:text-3xl'>
            {activity.title}
          </div>
          <div className='mt-[5px] flex items-center gap-[5px] md:mt-[20px]'>
            <div className='text-lg font-bold text-white md:text-xl'>₩ {activity.price.toLocaleString()}</div>
            <div className='text-md font-medium text-gray-700'>/ 인</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
