import Button from '@/components/Button';

type ReservationSubmitButtonProps = {
  reservationCompleted: boolean;
  selectedTimeId: number | null;
  isLoggedIn: boolean;
  size?: 'desktop' | 'tablet' | 'mobile';
};

export default function ReservationSubmitButton({
  reservationCompleted,
  selectedTimeId,
  isLoggedIn,
  size = 'desktop',
}: ReservationSubmitButtonProps) {
  const height = size === 'desktop' ? 'h-[60px]' : 'h-[50px]';
  const rounded = size === 'mobile' ? 'rounded-md' : 'rounded-t-none rounded-b-md';
  const disabled = !selectedTimeId || !isLoggedIn;
  const bgColor = disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-100 hover:bg-green-100';

  return (
    <Button
      type='submit'
      className={`flex !h-full w-full flex-col p-0 ${!isLoggedIn ? 'text-2lg' : 'text-[17px]'} font-bold text-white md:!h-auto md:py-3.5 lg:py-4 ${height} ${rounded} ${bgColor}`}
      disabled={disabled || reservationCompleted}
      aria-label='예약 신청'
    >
      {reservationCompleted ? '예약 완료' : '예약하기'}
      {!isLoggedIn && (
        <p className='font-overflow-hidden text-center text-xs font-normal text-ellipsis whitespace-nowrap text-white'>
          로그인 후 예약 가능
        </p>
      )}
    </Button>
  );
}
