'use client';

import Image from 'next/image';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import facebook from '@/assets/icons/share-facebook.svg';

type FacebookShareProps = {
  currentUrl: string;
  title: string;
  address: string;
};

export const FacebookShare = ({ currentUrl, title, address }: FacebookShareProps) => {
  const shareText = `${title}\n📍 ${address}\n\n${currentUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;

  const shareFacebook = async () => {
    if (isMobile) {
      // 모바일 환경: 로그인 상태 확인 및 공유
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          // 이미 로그인된 상태에서 공유
          window.FB.ui(
            {
              method: 'share',
              href: currentUrl,
            },
            function (response) {
              if (response && !response.error_message) {
                toast.success('공유 성공');
              } else {
                toast.error('공유 실패');
              }
            },
          );
        } else {
          // 로그인 필요
          window.FB.login((loginResponse) => {
            if (loginResponse.authResponse) {
              // 로그인 성공 후 바로 공유
              window.FB.ui(
                {
                  method: 'share',
                  href: currentUrl,
                },
                function (shareResponse) {
                  if (shareResponse && !shareResponse.error_message) {
                    toast.success('공유 성공');
                  } else {
                    toast.error('공유 실패');
                  }
                },
              );
            } else {
              toast.warning('로그인을 취소했습니다.');
            }
          });
        }
      });
    } else {
      // PC 환경: 단순 팝업 공유
      window.location.href = facebookUrl;
    }
  };

  return (
    <button onClick={shareFacebook} className='cursor-pointer'>
      <Image src={facebook} alt='페이스북 아이콘' />
    </button>
  );
};
