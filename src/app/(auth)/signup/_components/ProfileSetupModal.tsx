// components/ProfileSetupModal.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useOauthSignup } from '@/lib/hooks/useOauth';

interface ProfileModalProps {
  provider: 'google' | 'kakao';
  token: string;
  redirectUri: string;
  onClose: () => void;
}

const ProfileSetupModal = ({ provider, token, redirectUri, onClose }: ProfileModalProps) => {
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const oauthSignup = useOauthSignup(provider);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (error) setError(null);
  };

  // 회원가입 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 회원가입 요청
      const response = await oauthSignup.mutateAsync({
        nickname,
        redirectUri,
        token,
      });

      // 성공 시 홈으로 리다이렉트
      if (response) {
        router.push('/');
      }
    } catch (err) {
      console.error('회원가입 실패:', err);
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'>
      <div className='w-full max-w-md rounded-lg bg-white p-6'>
        <h2 className='mb-6 text-center text-2xl font-bold'>프로필 설정</h2>

        <form onSubmit={handleSubmit}>
          {/* 닉네임 입력 영역 */}
          <div className='mb-6'>
            <label htmlFor='nickname' className='mb-1 block text-sm font-medium text-gray-700'>
              닉네임 <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='nickname'
              className={`w-full border px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              placeholder='닉네임을 입력해주세요'
              value={nickname}
              onChange={handleNicknameChange}
              maxLength={20}
            />
            {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
            <p className='mt-1 text-xs text-gray-500'>최대 20자까지 입력 가능합니다</p>
          </div>

          {/* 버튼 영역 */}
          <div className='flex space-x-3'>
            <button
              type='button'
              className='flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none'
              onClick={onClose}
              disabled={isSubmitting}
            >
              취소
            </button>
            <button
              type='submit'
              className='flex-1 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none disabled:bg-blue-300'
              disabled={isSubmitting}
            >
              {isSubmitting ? '처리중...' : '가입하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupModal;
