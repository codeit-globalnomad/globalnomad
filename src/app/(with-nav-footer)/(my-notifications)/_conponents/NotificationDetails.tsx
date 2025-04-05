import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import CloseImage from '@/assets/icons/close.svg';

type Props = {
  content: string;
  createdAt: string;
  id: number;
};

const statusColorMap: Record<string, string> = {
  승인: 'text-blue-100',
  거절: 'text-red-100',
};

export default function NotificationDetails({ content, createdAt, id }: Props) {
  const confirmed = content.includes('승인');
  const declined = content.includes('거절');
  const statusDots = [
    { key: 'confirmed', show: confirmed, color: 'bg-blue-100' },
    { key: 'declined', show: declined, color: 'bg-red-100' },
  ];

  return (
    <div className='text-black-100 top-5 left-3 flex flex-col gap-1 rounded-[5px] border-gray-400 bg-white px-3 py-2 text-[14px] leading-[24px] font-normal'>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-between'>
          {statusDots.map(
            ({ key, show, color }) => show && <div key={key} className={`h-[5px] w-[5px] rounded-full ${color}`} />,
          )}

          <Image
            // onClick={handleClickClose}
            className='cursor-pointer'
            src={CloseImage}
            width={20}
            height={20}
            alt='날짜별 예약 현황창 닫기'
            aria-label='예약 현황창 닫기'
          />
        </div>

        <span className='pr-6'>
          {content.split(/(승인|거절)/).map((text, i) => {
            const colorClass = statusColorMap[text];
            return (
              <span key={i} className={colorClass || ''}>
                {text}
              </span>
            );
          })}
        </span>
      </div>
      <span className='text-[12px] leading-[18px] font-normal text-gray-600'>
        {formatDistanceToNow(new Date(createdAt), {
          addSuffix: true,
          locale: ko,
        })}
      </span>
    </div>
  );
}
