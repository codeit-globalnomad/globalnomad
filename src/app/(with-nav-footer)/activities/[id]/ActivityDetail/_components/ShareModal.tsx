'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import close from '@/assets/icons/close-fill.svg';
import url from '@/assets/icons/share-url.svg';
import x from '@/assets/icons/share-x.svg';
import Modal from '@/components/Modal';
import { copyToClipboard } from '@/app/(with-nav-footer)/activities/[id]/ActivityDetail/_components/copyToClipboard';
import { FacebookShare } from './FacebookShare';
import KakaoShare from './KakaoShare';

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  bannerImageUrl: string;
  address: string;
  pathname: string;
};

export default function ShareModal({
  isOpen,
  onClose,
  title,
  description,
  bannerImageUrl,
  address,
  pathname,
}: ShareModalProps) {
  const copyUrlToClipboard = () => {
    const urlToCopy = `${window.location.origin}${pathname}`;
    copyToClipboard({
      text: urlToCopy,
      successMessage: 'URL이 클립보드에 복사되었습니다!',
      errorMessage: 'URL 복사에 실패했습니다.',
    });
  };

  const xShareUrl =
    typeof window !== 'undefined'
      ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n📍 ${address}\n`)}&url=${window.location.origin}${pathname}`
      : '';

  const kakaoShare = useMemo(
    () => <KakaoShare title={title} description={description} bannerImageUrl={bannerImageUrl} pathname={pathname} />,
    [title, description, bannerImageUrl, pathname],
  );

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} className='w-[430px] max-w-[90%]'>
      <div className='mb-[20px] flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>공유하기</h2>
        <button onClick={onClose} className='cursor-pointer' aria-label='닫기'>
          <Image src={close} width={36} height={36} alt='닫기 아이콘' />
        </button>
      </div>
      <ol className='flex justify-between'>
        <li className='text-center'>
          <button onClick={copyUrlToClipboard} className='cursor-pointer' aria-label='URL 복사하기'>
            <Image src={url} width={50} height={50} alt='URL 복사하기 아이콘' />
          </button>
          <p className='text-md font-regular'>링크복사</p>
        </li>
        <li className='text-center'>
          {kakaoShare}
          <p className='text-md font-regular'>카카오톡</p>
        </li>
        <li className='text-center'>
          <Link
            href={xShareUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block'
            aria-label='x 공유하기'
          >
            <Image src={x} width={50} height={50} alt='x 공유하기 아이콘' />
          </Link>
          <p className='text-md font-regular'>X</p>
        </li>
        <li className='text-center'>
          <FacebookShare currentUrl={`${window.location.origin}${pathname}`} title={title} address={address} />
          <p className='text-md font-regular'>페이스북</p>
        </li>
      </ol>
    </Modal>
  );
}
