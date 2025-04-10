'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import Modal from '@/components/Modal';
import { useOauthSignup } from '@/lib/hooks/useOauth';
import Input from '@/components/Input';

export default function OauthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  const provider = searchParams.get('provider') as 'kakao' | 'google'; // 필요시 파싱
  const state = searchParams.get('state'); // 'signup' | 'signin'
  const error = searchParams.get('error');

  const signup = useOauthSignup(provider || 'kakao'); // default는 카카오로 가정
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (error === 'Nickname is required' && state === 'signup') {
      setIsModalOpen(true);
    } else if (error) {
      alert(decodeURIComponent(error));
      router.push('/login');
    } else {
      router.push('/');
    }
  }, [error, state]);

  const handleNicknameSubmit = (nickname: string) => {
    if (!code) return;

    signup.mutate(
      {
        token: code,
        nickname,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
      },
      {
        onSuccess: () => {
          setIsModalOpen(true);
          router.push('/');
        },
        onError: (err) => {
          alert(err.message);
        },
      },
    );
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Input>닉네임</Input>
        </Modal>
      )}
    </>
  );
}
