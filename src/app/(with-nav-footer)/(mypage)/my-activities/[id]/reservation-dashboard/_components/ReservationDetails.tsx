'use client';

type ReservationStatus = 'pending' | 'confirmed' | 'declined';

export default function ReservationDetails({ type }: { type: ReservationStatus }) {
  return (
    <div>
      <h1>{type === 'pending' ? '신청' : type === 'confirmed' ? '승인' : '거절'} 목록</h1>
    </div>
  );
}
