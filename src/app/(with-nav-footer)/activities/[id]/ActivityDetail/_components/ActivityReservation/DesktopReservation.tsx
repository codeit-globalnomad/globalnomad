import { useEffect, useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import alert from '@/assets/icons/alert.svg';
import decrement from '@/assets/icons/decrement.svg';
import increment from '@/assets/icons/increment.svg';
import Button from '@/components/Button';
import { useAvailableSchedule, useCreateReservation } from '@/lib/hooks/useActivities';
import { useMyReservations } from '@/lib/hooks/useMyReservation';
import 'react-calendar/dist/Calendar.css';
import 'swiper/css';
import 'swiper/css/pagination';
import './CalendarStyles.css';
import DesktopCalender from './DesktopCalendar';
import DesktopAvailableTime from './DesktopAvailableTime';

type DesktopReservationProps = {
  isLoggedIn: boolean;
  currentActivityId: number;
  price: number;
};

type ReservationForm = {
  date: string;
  time: string;
  people: number;
};

export default function DesktopReservation({ isLoggedIn, currentActivityId, price }: DesktopReservationProps) {
  const { register, handleSubmit, control, watch, setValue } = useForm<ReservationForm>({
    defaultValues: {
      people: 1,
    },
  });

  const today = new Date();
  const selectedYear = String(today.getFullYear());
  const selectedMonth = String(today.getMonth() + 1).padStart(2, '0');

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date() || today);
  const [availableTimes, setAvailableTimes] = useState<{ id: number; startTime: string; endTime: string }[]>([]);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [size, setSize] = useState<number>(10);
  const [reservationCompleted, setReservationCompleted] = useState(false);
  const [disabledTimeIds, setDisabledTimeIds] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const peopleCount = watch('people', 1);
  const totalPrice = price * peopleCount;

  const queryClient = useQueryClient();

  const { data: availableSchedule } = useAvailableSchedule(currentActivityId, selectedYear, selectedMonth);
  const { data: myReservations } = useMyReservations({
    size: size,
  });
  const { mutate: createReservation } = useCreateReservation(currentActivityId);

  const availableDates = availableSchedule?.map((schedule) => new Date(schedule.date)) || [];

  const handleTimeSelection = (timeId: number) => {
    setSelectedTimeId((prevTimeId) => (prevTimeId === timeId ? null : timeId));
  };

  useEffect(() => {
    if (myReservations?.totalCount) {
      setSize(myReservations.totalCount);
    }
  }, [myReservations]);

  const updateDisabledTimeIds = () => {
    if (myReservations?.reservations) {
      const updated = myReservations.reservations
        .filter(({ status }) => ['confirmed', 'completed', 'pending'].includes(status))
        .map(({ scheduleId }) => scheduleId);
      setDisabledTimeIds(updated);
    }
  };

  useEffect(updateDisabledTimeIds, [myReservations]);

  useEffect(() => {
    if (selectedDate) {
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      const schedule = availableSchedule?.find(({ date }) => date === selectedDateStr);
      setAvailableTimes(schedule?.times || []);
      setSelectedTimeId(null);
    }
  }, [selectedDate, availableSchedule]);

  useEffect(() => {
    if (selectedDate || selectedTimeId) {
      setReservationCompleted(false);
    }
  }, [selectedDate, selectedTimeId]);

  const onSubmit = () => {
    if (!selectedTimeId) {
      toast.error('예약할 시간을 선택해주세요.');
      return;
    }
    createReservation(
      {
        scheduleId: Number(selectedTimeId),
        headCount: Number(peopleCount),
      },
      {
        onSuccess: () => {
          toast.success('예약이 완료되었습니다.');
          setReservationCompleted(true);
          setSelectedTimeId(null);
          setValue('people', 1);

          setDisabledTimeIds((prev) => [...prev, Number(selectedTimeId)]);
          queryClient.invalidateQueries({
            queryKey: ['availableSchedule', currentActivityId, selectedYear, selectedMonth],
          });
          queryClient.invalidateQueries({ queryKey: ['myReservations', { size }] });
        },
        onError: () => {
          toast.error('예약에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <div className='hidden rounded-[12px] border-[1px] border-gray-300 bg-white md:hidden lg:block'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className='p-5'>
          <li className='mb-4 text-[30px] font-bold'>
            ₩ {price.toLocaleString()} <span className='text-xl font-normal text-gray-900'>/ 인</span>
            <hr className='mt-2 border-t-1 border-gray-300' />
          </li>
          <li className='mb-4 flex flex-col gap-2'>
            <p className='text-xl font-bold'>날짜</p>
            <Controller
              name='date'
              control={control}
              rules={{ required: '날짜를 선택해주세요.' }}
              render={({ field }) => (
                <DesktopCalender
                  control={control}
                  today={today}
                  availableDates={availableDates}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  field={field}
                />
              )}
            />
          </li>
          <li className='flex flex-col gap-2'>
            <DesktopAvailableTime
              availableTimes={availableTimes}
              disabledTimeIds={disabledTimeIds}
              selectedTimeId={selectedTimeId}
              onTimeSelection={handleTimeSelection}
              currentIndex={currentIndex}
              onIndexChange={setCurrentIndex}
            />
            <p className='flex gap-1 text-[15px] text-[#767676]'>
              <Image src={alert} width={16} height={16} alt='경고 아이콘' />
              {availableTimes.length === 0
                ? '이 날짜에는 예약 가능한 시간이 없습니다.'
                : '한 번의 예약에는 한 타임만 가능합니다.'}
            </p>
            <hr className='mt-2 mb-2 border-t-1 border-gray-300' />
          </li>
          <li className='flex flex-col items-baseline gap-2'>
            <p className='text-xl font-bold'>참여 인원수</p>
            <div className='flex w-[120px] items-center rounded-md border border-gray-300'>
              <button
                type='button'
                className='w-[40px] cursor-pointer p-2 text-center'
                onClick={() => setValue('people', peopleCount - 1)}
                aria-label='증가 버튼'
              >
                <Image src={decrement} width={18} height={18} alt='증가 버튼 아이콘' />
              </button>
              <input
                type='text'
                {...register('people', { min: 1, required: true })}
                readOnly
                className='w-[40px] cursor-pointer p-2 text-center'
              />
              <button
                type='button'
                className='w-[40px] cursor-pointer p-2 text-center'
                onClick={() => setValue('people', peopleCount + 1)}
                aria-label='감소 버튼'
              >
                <Image src={increment} width={18} height={18} alt='감소 버튼 아이콘' />
              </button>
            </div>
            <p className='flex gap-1 text-[15px] text-[#767676]'>
              <Image src={alert} width={16} height={16} alt='경고 아이콘' />
              최소 참여 인원 수는 1명 입니다.
            </p>
            <hr className='mt-2 mb-2 w-full border-t-1 border-gray-300' />
          </li>
          <li className='flex justify-between font-bold'>
            <span className='text-xl'>총 합계</span>
            <span className='text-[30px]'>₩ {totalPrice.toLocaleString()}</span>
          </li>
        </ol>
        <Button
          type='submit'
          className={`h-[60px] w-full cursor-pointer rounded-t-none rounded-b-md py-2 font-bold text-white ${
            !selectedTimeId || !isLoggedIn ? 'cursor-not-allowed bg-gray-300' : 'bg-green-100 hover:bg-green-100'
          }`}
          disabled={!selectedTimeId || !isLoggedIn || reservationCompleted}
        >
          {reservationCompleted ? '예약 완료' : '예약하기'}
        </Button>
      </form>
    </div>
  );
}
