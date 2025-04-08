'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import starIcon from '@/assets/icons/star.svg';
import starFilledIcon from '@/assets/icons/star-hover.svg';
import closeIcon from '@/assets/icons/close-fill.svg';
import { ReservationWithActivity } from '@/lib/types/myReservation';
import { useWriteReviewForReservation } from '@/lib/hooks/useMyReservation';
import { toast } from 'react-toastify';

type WriteReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  reservation: ReservationWithActivity;
};

export default function WriteReviewModal({ isOpen, onClose, reservation }: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');

  const { mutate: writeReview, isPending } = useWriteReviewForReservation();
  const { activity, id: reservationId, date, startTime, endTime, headCount } = reservation;

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating < 1 || content.trim() === '') {
      alert('별점과 후기를 모두 작성해주세요.');
      return;
    }

    writeReview(
      {
        reservationId,
        reviewData: {
          rating,
          content,
        },
      },
      {
        onSuccess: () => {
          toast.success('후기가 작성되었습니다!');
          onClose();
        },
        onError: () => {
          toast.error('후기 작성에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Modal onClose={onClose}>
      <div className='relative w-full max-w-[480px]'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-black-100 text-xl font-bold'>후기 작성</h2>
          <button onClick={onClose}>
            <Image src={closeIcon} alt='닫기' width={24} height={24} className='cursor-pointer' />
          </button>
        </div>
        <div className='flex items-start gap-4'>
          <Image
            src={activity.bannerImageUrl}
            alt={`${activity.title} 배너 이미지`}
            width={126}
            height={126}
            className='h-[126px] w-[126px] rounded-md object-cover'
          />
          <div className='flex flex-1 flex-col justify-start gap-1'>
            <p className='text-black-200 text-2lg font-semibold'>{activity.title}</p>
            <p className='text-black-200 text-lg'>
              {date} · {startTime} - {endTime} · {headCount}명
            </p>
            <div className='my-1 border-b border-gray-300' />
            <div className='mb-6 flex gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className='cursor-pointer'
                >
                  <Image
                    src={hoverRating >= star || rating >= star ? starFilledIcon : starIcon}
                    alt={`${star}점`}
                    width={30}
                    height={30}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='후기를 남겨주세요'
          className='text-black-100 text-md mt-[20px] w-full resize-none rounded-md border border-gray-300 p-3 focus:outline-none'
          rows={5}
        />
        <Button onClick={handleSubmit} disabled={isPending} className='mt-4 w-full py-3 text-lg font-bold'>
          {isPending ? '작성 중...' : '작성하기'}
        </Button>
      </div>
    </Modal>
  );
}
