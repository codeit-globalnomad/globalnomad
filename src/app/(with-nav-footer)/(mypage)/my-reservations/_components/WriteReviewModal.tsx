'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import starIcon from '@/assets/icons/star.svg';
import starFilledIcon from '@/assets/icons/star-hover.svg';
import closeIcon from '@/assets/icons/close-fill.svg';
import { ReservationWithActivity } from '@/lib/types/myReservation';
import { useWriteReviewForReservation } from '@/lib/hooks/useMyReservation';

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
          alert('후기가 작성되었습니다.');
          onClose();
        },
        onError: () => {
          alert('후기 작성에 실패했습니다.');
        },
      },
    );
  };

  return (
    <Modal onClose={onClose}>
      <div className='relative w-full max-w-[480px]'>
        {/* 제목 + 닫기 버튼 */}
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>후기 작성</h2>
          <button onClick={onClose}>
            <Image src={closeIcon} alt='닫기' width={24} height={24} />
          </button>
        </div>

        {/* 체험 정보 */}
        <div className='flex items-start gap-4'>
          <Image
            src={activity.bannerImageUrl}
            alt={activity.title}
            width={126}
            height={126}
            className='h-[126px] w-[126px] rounded-md object-cover'
          />
          <div className='flex flex-1 flex-col justify-start gap-1'>
            <p className='text-black-200 text-xl font-bold'>{activity.title}</p>
            <p className='text-2lg text-black-200'>
              {date} · {startTime} - {endTime} · {headCount}명
            </p>
            {/* 구분선 */}
            <div className='my-1 border-b border-gray-300' />
            {/* 별점 */}
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

        {/* 후기 입력 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='후기를 남겨주세요'
          className='w-full resize-none rounded-md border border-gray-300 p-3 text-sm focus:outline-none'
          rows={5}
        />

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className='bg-black-200 mt-4 w-full rounded-md py-3 font-bold text-white hover:bg-gray-900 disabled:bg-gray-300'
        >
          {isPending ? '작성 중...' : '작성하기'}
        </button>
      </div>
    </Modal>
  );
}
