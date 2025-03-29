'use client';

import Modal from '@/components/Modal';
import Image from 'next/image';
import checkIcon from '@/assets/icons/check-circle-filled.svg';
import { useCancelMyReservation } from '@/lib/hooks/useMyReservation';

type CancelReservationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  reservationId: number;
  onCancel: () => void;
};

export default function CancelReservationModal({
  isOpen,
  onClose,
  reservationId,
  onCancel,
}: CancelReservationModalProps) {
  const { mutate: cancelReservation } = useCancelMyReservation();

  if (!isOpen) return null;

  const handleCancel = () => {
    cancelReservation(reservationId, {
      onSuccess: () => {
        onCancel();
        onClose();
      },
      onError: (error) => {
        console.error('예약 취소 실패:', error);
      },
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className='flex w-[300px] flex-col items-center gap-4 text-center'>
        <div className='p-2'>
          <Image src={checkIcon} alt='체크 아이콘' width={24} height={24} />
        </div>
        <p className='font-regular text-black-100 text-lg'>예약을 취소하시겠어요?</p>
        <div className='mt-4 flex w-full justify-center gap-2'>
          <button
            onClick={onClose}
            aria-label='닫기 버튼'
            className='text-black-200 border-black-200 min-w-[90px] rounded-md border bg-white px-4 py-2 text-lg font-bold'
          >
            아니요
          </button>
          <button
            onClick={handleCancel}
            className='bg-black-200 min-w-[90px] rounded-md px-4 py-2 text-lg font-bold text-white'
          >
            취소하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
