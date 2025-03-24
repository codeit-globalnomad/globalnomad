'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import starRating from '@/assets/icons/star-rating.svg';
import marker from '@/assets/icons/marker.svg';
import share from '@/assets/icons/share.svg';
import close from '@/assets/icons/close-fill.svg';
import kakao from '@/assets/icons/share-kakao.svg';
import url from '@/assets/icons/share-url.svg';
import facebook from '@/assets/icons/share-facebook.svg';
import x from '@/assets/icons/share-x.svg';
import Modal from '@/components/Modal';
import { ActivityDetailResponse } from '@/lib/types/activities';

type ActivityHeaderProps = {
  activityDetail: ActivityDetailResponse;
};

export default function ActivityHeader({ activityDetail }: ActivityHeaderProps) {
  const { category, title, rating, reviewCount, address } = activityDetail;
  const [modalStatus, setModalStatus] = useState(false);

  const onHandleModalStatus = () => {
    setModalStatus(!modalStatus);
  };

  return (
    <div className='flex flex-col gap-2'>
      <span className='text-md font-regular opacity-75'>{category}</span>
      <div className='flex justify-between'>
        <h1 className='w-[80%] text-2xl font-bold md:text-3xl'>{title}</h1>
        <div>
          <Image src={share} className='cursor-pointer' alt='공유하기 아이콘' onClick={onHandleModalStatus} />
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
                  <button className='cursor-pointer'>
                    <Image src={url} alt='URL 복사하기 아이콘' />
                  </button>
                </li>
                <li>
                  <Link href=''>
                    <Image src={kakao} alt='카카오톡 공유하기 아이콘' />
                  </Link>
                </li>
                <li>
                  <Link href=''>
                    <Image src={x} alt='x 공유하기 아이콘' />
                  </Link>
                </li>
                <li>
                  <Link href=''>
                    <Image src={facebook} alt='페이스북 아이콘' />
                  </Link>
                </li>
              </ul>
            </Modal>
          )}
        </div>
        {/* 더보기 <Dropdown /> */}
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
