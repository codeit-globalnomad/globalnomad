'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import kakaoIcon from '@/assets/icons/share-kakao.svg';

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
        const existingScript = document.getElementById('kakao-sdk');
        if (existingScript) {
          return resolve();
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
        const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

        if (!kakaoApiKey) {
          alert('Kakao API key가 설정되지 않았습니다.');
          return;
        }

        if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoApiKey);
          setKakaoReady(true);
        }
      })
      .catch(() => {
        alert('카카오 SDK 로드에 실패했습니다.');
      });
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
      alert('카카오 공유를 초기화하는데 실패했습니다.');
    }
  };

  return (
    <button onClick={kakaoShare} className='cursor-pointer'>
      <Image src={kakaoIcon} alt='카카오톡 공유하기 아이콘' />
    </button>
  );
};

export default KakaoShare;
