'use client';

import Image from 'next/image';
import google from '@/assets/icons/login-google.svg';
import kakao from '@/assets/icons/login-kakao.svg';

export default function SocialButtons() {
  // 구글 또는 카카오 로그인 처리 함수
  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    if (provider === 'kakao') {
      const KAKAO_OAUTH_URL =
        'https://kauth.kakao.com/oauth/authorize?client_id=' +
        process.env.NEXT_PUBLIC_KAKAO_API_KEY! +
        '&redirect_uri=' +
        process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI! +
        '&response_type=code&state=kakao';
      window.location.href = KAKAO_OAUTH_URL;
    } else {
      const GOOGLE_OAUTH_URL =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&` +
        `redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&` +
        `response_type=code&` +
        `scope=openid%20profile%20email&` +
        `state=google`;
      window.location.href = GOOGLE_OAUTH_URL;
    }
  };

  return (
    <div>
      <p className='text-center text-gray-500'>SNS 계정으로 회원가입하기</p>
      <div className='mt-2 flex justify-center space-x-4'>
        <button type='button' onClick={() => handleSocialLogin('google')} className='cursor-pointer'>
          <Image src={google} width={72} height={72} alt='구글 로그인 아이콘' />
        </button>
        <button type='button' onClick={() => handleSocialLogin('kakao')} className='cursor-pointer'>
          <Image src={kakao} width={72} height={72} alt='카카오 로그인 아이콘' />
        </button>
      </div>
    </div>
  );
}
