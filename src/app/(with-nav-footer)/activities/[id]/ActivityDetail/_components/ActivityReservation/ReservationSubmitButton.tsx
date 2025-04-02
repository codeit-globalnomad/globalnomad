import Button from '@/components/Button';

type ReservationSubmitButtonProps = {
  reservationCompleted: boolean;
  selectedTimeId: number | null;
  isLoggedIn: boolean;
  size?: 'desktop' | 'tablet' | 'mobile';
};

const ReservationSubmitButton = ({
  reservationCompleted,
  selectedTimeId,
  isLoggedIn,
  size = 'desktop',
}: ReservationSubmitButtonProps) => {
  const height = size === 'desktop' ? 'h-[60px]' : 'h-[50px]';
  const rounded = size === 'mobile' ? 'rounded-md' : 'rounded-t-none rounded-b-md';
  const disabled = !selectedTimeId || !isLoggedIn;
  const bgColor = disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-100 hover:bg-green-100';

  return (
    <Button
      type='submit'
      className={`w-full py-2 font-bold text-white ${height} ${rounded} ${bgColor}`}
      disabled={disabled || reservationCompleted}
    >
      {reservationCompleted ? '예약 완료' : '예약하기'}
    </Button>
  );
};

export default ReservationSubmitButton;
