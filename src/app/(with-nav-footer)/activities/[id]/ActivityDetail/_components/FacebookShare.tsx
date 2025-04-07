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
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
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
          window.FB.login((loginResponse) => {
            if (loginResponse.authResponse) {
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
      window.open(facebookUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button onClick={shareFacebook} className='cursor-pointer' aria-label='페이스북 공유'>
      <Image src={facebook} width={50} height={50} alt='페이스북 아이콘' />
    </button>
  );
};
