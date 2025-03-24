'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const { category, title, rating, reviewCount, address, description, bannerImageUrl } = activityDetail;
  const [modalStatus, setModalStatus] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const loadKakaoScript = () => {
      return new Promise<void>((resolve, reject) => {
        const existingScript = document.getElementById('kakao-sdk');
        if (existingScript) {
          return resolve(); // 이미 스크립트가 로드되어 있으면 그냥 resolve
        }
        const script = document.createElement('script');
        script.id = 'kakao-sdk';
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
      });
    };

    loadKakaoScript()
      .then(() => {
        if (typeof window !== 'undefined' && window.Kakao) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY); // 카카오 API 키 초기화
          setKakaoReady(true);
        }
      })
      .catch((error) => {
        console.error('카카오 SDK 로드 실패:', error);
        alert('카카오 SDK 로드에 실패했습니다.');
      });
  }, []);

  const onHandleModalStatus = () => {
    setModalStatus(!modalStatus);
  };

  const copyUrlToClipboard = async () => {
    try {
      const urlToCopy = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(urlToCopy);
      alert('URL이 클립보드에 복사되었습니다!');
    } catch (error) {
      alert('URL 복사에 실패했습니다.');
    }
  };

  const kakaoShare = () => {
    if (kakaoReady && window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title, // 활동 제목
          description: description, // 설명 (필요 시 변경)
          imageUrl: bannerImageUrl, // 공유할 이미지 (필요시 변경)
          link: {
            mobileWebUrl: `${window.location.origin}${pathname}`, // 모바일 웹 링크
            webUrl: `${window.location.origin}${pathname}`, // 웹 링크
          },
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: `${window.location.origin}${pathname}`,
              webUrl: `${window.location.origin}${pathname}`,
            },
          },
        ],
      });
    } else {
      alert('카카오 공유를 초기화하는데 실패했습니다.');
    }
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
                  <button onClick={copyUrlToClipboard} className='cursor-pointer'>
                    <Image src={url} alt='URL 복사하기 아이콘' />
                  </button>
                </li>
                <li>
                  <button onClick={kakaoShare} className='cursor-pointer'>
                    <Image src={kakao} alt='카카오톡 공유하기 아이콘' />
                  </button>
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
