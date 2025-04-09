'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import kebab from '@/assets/icons/kebab.svg';
import checkIcon from '@/assets/icons/check-circle-filled.svg';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import Modal from '@/components/Modal';

type MoreOptionsProps = {
  activityId: number;
  onDelete: (id: number) => void;
};

export default function MoreOptions({ activityId, onDelete }: MoreOptionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  const dropdownOptions = [
    { label: '수정하기', onClick: () => router.push(`/my-activities/${activityId}/edit-activities`) },
    {
      label: '삭제하기',
      onClick: () => {
        setIsDeleteModalOpen(true);
      },
    },
  ];

  return (
    <>
      <Dropdown
        options={dropdownOptions}
        trigger={
          <Image
            src={kebab}
            width={32}
            height={32}
            className='relative md:top-[0.15rem] md:h-[39px] md:w-[40px]'
            alt='더보기 아이콘'
          />
        }
        dropdownClassName='right-0 z-80'
      />
      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)} className='flex w-[300px] flex-col items-center gap-5'>
          <Image src={checkIcon} width={28} height={28} alt='체크 아이콘' />
          <h2 className='text-2lg'>정말 삭제하시겠어요?</h2>
          <div className='flex w-full justify-between'>
            <Button
              variant='outline'
              onClick={() => setIsDeleteModalOpen(false)}
              className='w-[48%] py-1 text-lg'
              aria-label='삭제 취소'
            >
              아니오
            </Button>
            <Button
              variant='default'
              onClick={async () => {
                try {
                  await onDelete(activityId);
                  toast.success('체험이 삭제되었습니다.');
                  setIsDeleteModalOpen(false);
                  setTimeout(() => {
                    router.push('/activities');
                  }, 1000);
                } catch (error) {
                  if (isAxiosError(error)) {
                    const message = error.response?.data?.message;
                    toast.error(message || '예약 대기 또는 승인된 예약이 있어 체험을 삭제할 수 없습니다.');
                  } else {
                    toast.error('에러가 발생했습니다. 다시 시도해주세요.');
                  }
                }
              }}
              className='w-[48%] py-2 text-lg'
              aria-label='삭제'
            >
              삭제하기
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
