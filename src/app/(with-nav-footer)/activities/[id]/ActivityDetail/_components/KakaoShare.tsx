'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import kakaoIcon from '@/assets/icons/share-kakao.svg';
import { toast } from 'react-toastify';

type KakaoShareProps = {
  title: string;
  description: string;
  bannerImageUrl: string;
  pathname: string;
};

const KakaoShare = ({ title, description, bannerImageUrl, pathname }: KakaoShareProps) => {
  const [kakaoReady, setKakaoReady] = useState(false);

  useEffect(() => {
    const loadKakaoScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.Kakao && window.Kakao.isInitialized()) {
          console.log('[Kakao SDK] 이미 초기화됨');
          setKakaoReady(true);
          return;
        }

        const existingScript = document.getElementById('kakao-sdk');
        if (existingScript) {
          console.log('[Kakao SDK] 이미 로드됨');
          return resolve();
        }
        console.log('[Kakao SDK] 로드 시작');
        const script = document.createElement('script');
        script.id = 'kakao-sdk';
        script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
        script.onload = () => {
          console.log('[Kakao SDK] 로드 완료');
          const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
          if (!kakaoApiKey) {
            toast.error('Kakao API key가 설정되지 않았습니다.');
            setKakaoReady(false);
            return;
          }

          if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoApiKey);
          }
          setKakaoReady(true);
        };
        script.onerror = (error) => {
          console.error('[Kakao SDK] 로드 실패', error);
          toast.error('카카오 SDK 로드에 실패했습니다.');
          setKakaoReady(false);
        };
        document.body.appendChild(script);
      });
    };

    loadKakaoScript();
  }, []);

  const kakaoShare = () => {
    if (kakaoReady && window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: description,
          imageUrl: bannerImageUrl,
          link: {
            mobileWebUrl: `${window.location.origin}${pathname}`,
            webUrl: `${window.location.origin}${pathname}`,
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
      toast.error('카카오 공유를 초기화하는데 실패했습니다.');
    }
  };

  return (
    <button onClick={kakaoShare} className='cursor-pointer'>
      <Image src={kakaoIcon} alt='카카오톡 공유하기 아이콘' />
    </button>
  );
};

export default KakaoShare;
