'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
import starRating from '@/assets/icons/star-rating.svg';
import marker from '@/assets/icons/marker.svg';
import share from '@/assets/icons/share.svg';
import close from '@/assets/icons/close-fill.svg';
import url from '@/assets/icons/share-url.svg';
import x from '@/assets/icons/share-x.svg';
import Modal from '@/components/Modal';
import { ActivityDetailResponse } from '@/lib/types/activities';
import KakaoShare from './KakaoShare';
import { FacebookShare } from './FacebookShare';
import Dropdown from '@/components/Dropdown';
import kebab from '@/assets/icons/kebab.svg';
import { useRouter } from 'next/navigation';
import { useDeleteActivity } from '@/lib/hooks/useMyActivities';

type ActivityHeaderProps = {
  activityDetail: ActivityDetailResponse;
  isSameUser: boolean;
};

export default function ActivityHeader({ activityDetail, isSameUser }: ActivityHeaderProps) {
  const { category, title, rating, reviewCount, address, description, bannerImageUrl, id } = activityDetail;
  const [modalStatus, setModalStatus] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { mutate: deleteActivity } = useDeleteActivity();

  const onHandleModalStatus = () => {
    setModalStatus(!modalStatus);
  };

  const copyUrlToClipboard = async () => {
    try {
      const urlToCopy = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(urlToCopy);
      toast.success('URL이 클립보드에 복사되었습니다!');
    } catch {
      toast.error('URL 복사에 실패했습니다.');
    }
  };

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n📍 ${address}\n`)}&url=${window.location.origin}${pathname}`;

  const dropdownOptions = [
    { label: '수정하기', onClick: () => router.push(`/my-activities/${id}`) },
    {
      label: '삭제하기',
      onClick: () => {
        deleteActivity(id);
        toast.success('체험이 삭제되었습니다.');
        setTimeout(() => {
          router.push('/activities');
        }, 3000);
      },
    },
  ];

  const handleSelectOption = (option: { label: string }) => {
    console.log(`선택된 옵션: ${option.label}`);
  };

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-md font-regular opacity-75'>{category}</span>
      <div className='flex justify-between'>
        <h1 className='w-[80%] text-2xl font-bold md:text-3xl'>{title}</h1>
        <div className='flex items-baseline'>
          <Image
            src={share}
            width={36}
            height={36}
            className='relative top-[-1.5px] cursor-pointer'
            alt='공유하기 아이콘'
            onClick={onHandleModalStatus}
          />
          {modalStatus && (
            <Modal onClose={onHandleModalStatus}>
              <div className='mb-[36px] flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>공유하기</h2>
                <button onClick={onHandleModalStatus} className='cursor-pointer'>
                  <Image src={close} alt='닫기 아이콘' />
                </button>
              </div>
              <ul className='flex justify-between'>
                <li>
                  <button onClick={copyUrlToClipboard} className='cursor-pointer'>
                    <Image src={url} alt='URL 복사하기 아이콘' />
                  </button>
                </li>
                <li>
                  <KakaoShare
                    title={title}
                    description={description}
                    bannerImageUrl={bannerImageUrl}
                    pathname={pathname}
                  />
                </li>
                <li>
                  <Link href={xShareUrl} target='_blank' rel='noopener noreferrer'>
                    <Image src={x} alt='x 공유하기 아이콘' />
                  </Link>
                </li>
                <li>
                  <FacebookShare currentUrl={`${window.location.origin}${pathname}`} title={title} address={address} />
                </li>
              </ul>
            </Modal>
          )}
          {isSameUser && (
            <Dropdown
              options={dropdownOptions} // 옵션 설정
              onSelect={handleSelectOption} // 항목 선택 시 실행할 함수
              trigger={<Image src={kebab} alt='더보기 아이콘' />} // 드롭다운을 열 트리거 버튼
              dropdownClassName='right-0 z-80' // 드롭다운 스타일 수정 (선택사항)
            />
          )}
        </div>
      </div>
      <div className='align-center flex flex-row gap-4'>
        {/* Rating */}
        <div className='font-regular text-md flex gap-1 md:text-lg'>
          <Image src={starRating} alt='별점 아이콘' />
          <span>{rating}</span>
          <span>({reviewCount})</span>
        </div>
        {/* Address */}
        <div className='text-md font-regular flex gap-1 md:text-lg'>
          <Image src={marker} alt='지도 마커 아이콘' />
          <span className='opacity-75'>{address}</span>
        </div>
      </div>
    </div>
  );
}
