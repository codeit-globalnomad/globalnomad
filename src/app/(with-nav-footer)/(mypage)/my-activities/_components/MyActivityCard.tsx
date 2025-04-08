import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ActivityBasic } from '@/lib/types/myActivities';
import DeleteActivityModal from './DeleteActivityModal';
import Dropdown from '@/components/Dropdown';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';
import kebab from '@/assets/icons/kebab.svg';

interface MyActivityCardProps {
  activity: ActivityBasic;
}

export default function MyActivityCard({ activity }: MyActivityCardProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const editDeleteOption = [
    { label: '수정하기', onClick: () => router.push(`/my-activities/${activity.id}/edit-activities`) },
    { label: '삭제하기', onClick: () => setIsDeleteModalOpen(true) },
  ];

  const onClickMyActivityCard = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('.ignore-click')) {
      event.stopPropagation();
      return;
    }
    router.push(`/activities/${activity.id}`);
  };

  return (
    <>
      <div
        className='mt-[24px] mb-[24px] h-[136px] w-full max-w-full min-w-[344px] cursor-pointer rounded-2xl bg-white shadow-md hover:bg-gray-100 md:h-[156px]'
        onClick={onClickMyActivityCard}
      >
        <div className='flex'>
          <div className='relative aspect-[1/1] h-[136px] w-[136px] md:h-[156px] md:w-[156px]'>
            <Image
              src={activity.bannerImageUrl}
              alt={`${activity.title} 배너 이미지`}
              fill
              sizes='(min-width: 1024px) 204px, (min-width: 768px) 156px, 128px'
              className='absolute rounded-tl-2xl rounded-bl-2xl object-cover'
            />
          </div>
          <div className='flex w-full flex-col px-[24px] py-[10px] md:py-[14px]'>
            <div className='flex h-[32px] items-center justify-between'>
              <div className='flex items-center gap-[6px]'>
                <Image src={starRating} className='h-[18px] w-[18px]' alt='별점' />
                <p className='text-black-100 text-md md:text-lg'>
                  {activity.rating.toFixed(1)} ({activity.reviewCount})
                </p>
              </div>
              <div className='z-10 mt-2' onClick={(e) => e.stopPropagation()}>
                <Dropdown
                  trigger={<Image src={kebab} alt='케밥' width={28} height={28} />}
                  options={editDeleteOption}
                  onSelect={() => {}}
                  dropdownClassName='right-0'
                />
              </div>
            </div>
            <h2 className='text-black-200 text-2lg line-clamp-1 font-bold break-keep md:mt-[6px] md:text-xl'>
              {activity.title}
            </h2>
            <span className='md:text-2lg relative bottom-0 mt-auto text-lg text-gray-900'>
              ₩ {activity.price.toLocaleString()} / 인
            </span>
          </div>
        </div>
      </div>
      <DeleteActivityModal
        isOpen={isDeleteModalOpen}
        reservationId={activity.id}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
