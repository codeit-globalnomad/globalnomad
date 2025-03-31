import { useRouter } from 'next/navigation';
import { ActivityBasic } from '@/lib/types/myActivities';
import { useDeleteActivity } from '@/lib/hooks/useMyActivities';
import Dropdown from '@/components/Dropdown';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';
import kebab from '@/assets/icons/kebab.svg';

interface MyActivityCardProps {
  activity: ActivityBasic;
}

export default function MyActivityCard({ activity }: MyActivityCardProps) {
  const { mutate: deleteActivity } = useDeleteActivity();

  const router = useRouter();

  const handleDelete = () => {
    if (confirm('체험을 삭제하시겠습니까?')) deleteActivity(activity.id);
  };

  const editDeleteOption = [{ label: '수정하기' }, { label: '삭제하기', onClick: handleDelete }];

  const onClickMyActivityCard = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('.ignore-click')) {
      event.stopPropagation();
      return;
    }
    router.push(`/activities/${activity.id}`);
  };

  return (
    <div
      className='mb-[24px] h-[128px] w-full max-w-[716px] min-w-[344px] cursor-pointer rounded-2xl whitespace-nowrap shadow-md hover:bg-gray-100 md:h-[156px] lg:h-[204px]'
      onClick={onClickMyActivityCard}
    >
      <div className='flex'>
        <div className='relative aspect-[1/1] h-[128px] w-[128px] md:h-[156px] md:w-[156px] lg:h-[204px] lg:w-[204px]'>
          <Image
            src={activity.bannerImageUrl}
            alt={`${activity.title} 배너 이미지`}
            fill
            className='absolute rounded-tl-2xl rounded-bl-2xl object-cover'
          />
        </div>
        <div className='flex w-full flex-col px-[24px] py-[10px] md:py-[14px]'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-[6px]'>
              <Image src={starRating} width={19} height={19} alt='별점' />
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
          <h2 className='text-black-200 text-2lg font-bold md:mt-[6px] md:text-xl'>{activity.title}</h2>
          <span className='text-2lg relative bottom-0 mt-auto text-gray-900 md:text-xl'>
            ₩ {activity.price.toLocaleString()} / 인
          </span>
        </div>
      </div>
    </div>
  );
}
