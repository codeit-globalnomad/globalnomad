'use client';

import Modal from '@/components/Modal';
import Image from 'next/image';
import checkIcon from '@/assets/icons/check-circle-filled.svg';
import { useCancelMyReservation } from '@/lib/hooks/useMyReservation';
import Button from '@/components/Button';
import { toast } from 'react-toastify';

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
        toast.success('예약이 취소되었습니다.');
        onCancel();
        onClose();
      },
      onError: (error) => {
        console.error('예약 취소 실패:', error);
        toast.error('예약 취소에 실패했어요.');
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
          <Button variant='outline' onClick={onClose} className='!w-fit min-w-[90px] px-4 py-2 text-lg font-bold'>
            아니오
          </Button>
          <Button variant='default' onClick={handleCancel} className='!w-fit min-w-[90px] px-4 py-2 text-lg font-bold'>
            취소하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
