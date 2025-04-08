'use client';

import Modal from '@/components/Modal';
import Image from 'next/image';
import checkIcon from '@/assets/icons/check-circle-filled.svg';
import { useDeleteActivity } from '@/lib/hooks/useMyActivities';
import Button from '@/components/Button';
import { toast } from 'react-toastify';

type DeleteActivityModalProps = {
  isOpen: boolean;
  reservationId: number;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteActivityModal({ isOpen, reservationId, onClose, onDelete }: DeleteActivityModalProps) {
  const { mutate: deleteActivity } = useDeleteActivity();

  if (!isOpen) return null;

  const handleDelete = () => {
    deleteActivity(reservationId, {
      onSuccess: () => {
        toast.success('체험이 삭제되었습니다.');
        onDelete();
        onClose();
      },
      onError: (error) => {
        console.error('체험 삭제 실패:', error);
        toast.error('에러가 발생했습니다. 다시 시도해주세요.');
      },
    });
  };

  return (
    <Modal onClose={onClose} className='flex w-[300px] flex-col items-center gap-5'>
      <Image src={checkIcon} alt='체크 아이콘' width={28} height={28} />
      <p className='font-regular text-black-100 text-2lg'>정말 삭제하시겠어요?</p>
      <div className='flex w-full justify-between'>
        <Button variant='outline' onClick={onClose} className='w-[48%] py-1 text-lg' aria-label='삭제 취소'>
          아니오
        </Button>
        <Button onClick={handleDelete} className='w-[48%] py-2 text-lg' aria-label='삭제'>
          삭제하기
        </Button>
      </div>
    </Modal>
  );
}
