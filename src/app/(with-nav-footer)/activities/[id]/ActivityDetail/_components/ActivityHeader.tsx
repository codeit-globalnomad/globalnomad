'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import marker from '@/assets/icons/marker.svg';
import starRating from '@/assets/icons/star-rating.svg';
import share from '@/assets/icons/share.svg';
import { useDeleteActivity } from '@/lib/hooks/useMyActivities';
import { ActivityDetailResponse } from '@/lib/types/activities';
import MoreOptions from './MoreOptions';
import ShareModal from './ShareModal';

type ActivityHeaderProps = {
  activityDetail: ActivityDetailResponse;
  isSameUser: boolean;
};

export default function ActivityHeader({ activityDetail, isSameUser }: ActivityHeaderProps) {
  const { category, title, rating, reviewCount, address, description, bannerImageUrl, id } = activityDetail;
  const [modalStatus, setModalStatus] = useState(false);

  const pathname = usePathname();

  const { mutate: deleteActivity } = useDeleteActivity();

  const onHandleModalStatus = () => {
    setModalStatus(!modalStatus);
  };

  return (
    <div className='md:gap-0.8 flex flex-col gap-[0.3rem] md:gap-1.5'>
      <span className='text-md font-regular opacity-75'>{category}</span>
      <div className='mt-[-1px] flex justify-between'>
        <h1 className='relative w-[80%] text-[28px] leading-tight font-bold break-words break-keep md:text-3xl md:leading-snug'>
          {title}
        </h1>
        <div className={`relative top-[0.26rem] flex items-baseline md:top-0 ${isSameUser ? 'right-[-0.94rem]' : ''}`}>
          <Image
            src={share}
            width={28}
            height={28}
            className='relative top-[-0.125rem] h-[28px] w-[28px] cursor-pointer md:top-[-0.02rem] md:h-[34px] md:w-[34px]'
            onClick={onHandleModalStatus}
            alt='공유하기 아이콘'
          />
          {modalStatus && (
            <ShareModal
              isOpen={modalStatus}
              onClose={onHandleModalStatus}
              title={title}
              description={description}
              bannerImageUrl={bannerImageUrl}
              address={address}
              pathname={pathname}
            />
          )}
          {isSameUser && <MoreOptions activityId={id} onDelete={deleteActivity} />}
        </div>
      </div>
      <ol className={`flex flex-row gap-4 ${isSameUser ? 'md:mt-[-0.3rem]' : ''}`}>
        <li className='font-regular text-md flex items-center gap-1 md:text-lg'>
          <div className='relative h-[26px] w-[20px]'>
            <Image src={starRating} fill style={{ objectFit: 'contain' }} alt='별점 아이콘' />
          </div>
          <span>{rating.toFixed(1)}</span>
          <span>({reviewCount})</span>
        </li>
        <li className='text-md font-regular flex items-center gap-1 md:text-lg'>
          <div className='relative h-[26px] w-[18px] content-center'>
            <Image src={marker} className='h-auto w-[18px]' alt='지도 마커 아이콘' />
          </div>
          <span className='opacity-75'>{address}</span>
        </li>
      </ol>
    </div>
  );
}
