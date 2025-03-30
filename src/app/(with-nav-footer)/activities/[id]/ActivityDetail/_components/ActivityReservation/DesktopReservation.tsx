import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format, isBefore, startOfDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAvailableSchedule, useCreateReservation } from '@/lib/hooks/useActivities';
import { createReservationSchema } from '@/lib/types/activities';
import { useMyReservations } from '@/lib/hooks/useMyReservation';

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
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReservationForm>({
    defaultValues: {
      people: 1,
    },
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availableTimes, setAvailableTimes] = useState<{ id: number; startTime: string; endTime: string }[]>([]);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [size, setSize] = useState<number>(10);

  const today = new Date();
  const currentYear = String(today.getFullYear());
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

  const selectedYear = selectedDate ? format(selectedDate, 'yyyy') : currentYear;
  const selectedMonth = selectedDate ? format(selectedDate, 'MM') : currentMonth;

  const { data: availableSchedule } = useAvailableSchedule(currentActivityId, selectedYear, selectedMonth);

  const { data: myReservations } = useMyReservations({
    size: size,
  });

  useEffect(() => {
    if (myReservations && myReservations.totalCount) {
      setSize(myReservations.totalCount);
    }
  }, [myReservations]);

  useEffect(() => {
    if (selectedDate) {
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      const scheduleForSelectedDate = availableSchedule?.find((schedule) => schedule.date === selectedDateStr);
      setAvailableTimes(scheduleForSelectedDate?.times || []);
    }
  }, [selectedDate, availableSchedule]);

  const handleMonthChange = (date: Date) => {
    setSelectedDate(date);
  };

  const [pricePerPerson] = useState(price);
  const peopleCount = watch('people', 1);
  const totalPrice = pricePerPerson * peopleCount;

  const { mutate: createReservation } = useCreateReservation(currentActivityId);

  const disabledTimeIds = myReservations?.reservations?.map((reservation) => reservation.scheduleId) || [];

  const availableDates = availableSchedule?.map((schedule) => new Date(schedule.date)) || [];

  const onSubmit = () => {
    try {
      if (selectedTimeId === null) {
        alert('시간을 선택해주세요.');
        return;
      }

      const reservationData = {
        scheduleId: Number(selectedTimeId),
        headCount: Number(peopleCount),
      };

      createReservationSchema.parse(reservationData);

      console.log('예약 데이터:', reservationData);
      createReservation(reservationData);
    } catch (error) {
      console.error('Zod validation error:', error);
      alert('예약 데이터를 확인해주세요.');
    }
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(today));
  };

  const handleTimeSelection = (timeId: number) => {
    setSelectedTimeId((prevTimeId) => (prevTimeId === timeId ? null : timeId));
  };

  return (
    <div className='hidden rounded-[12px] border-[1px] border-gray-300 p-4 md:hidden lg:block'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className='space-y-4'>
          <li className='text-xl font-semibold'>
            ₩ {pricePerPerson.toLocaleString()} <span className='text-sm font-normal'>/인</span>
          </li>
          <li>
            <p className='font-medium'>날짜</p>
            <Controller
              name='date'
              control={control}
              rules={{ required: '날짜를 선택해주세요.' }}
              render={({ field }) => (
                <div>
                  <DayPicker
                    mode='single'
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setValue('date', format(date, 'yyyy-MM-dd'));
                        field.onChange(date);
                      }
                    }}
                    onMonthChange={handleMonthChange}
                    disabled={isDateDisabled}
                    locale={ko} // 한국어 적용
                    modifiers={{
                      available: (date) =>
                        availableDates.some(
                          (availableDate) => format(availableDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
                        ),
                    }}
                    modifiersClassNames={{
                      available: 'bg-blue-500 text-white rounded-full',
                    }}
                  />
                  {selectedDate && (
                    <p className='mt-2 text-gray-700'>선택한 날짜: {format(selectedDate, 'yyyy-MM-dd')}</p>
                  )}
                </div>
              )}
            />
            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
          </li>
          <li>
            <p className='font-medium'>예약 가능한 시간</p>
            <div className='flex space-x-2'>
              {availableTimes.length > 0 ? (
                availableTimes.map((timeSlot) => (
                  <label
                    key={timeSlot.id}
                    className={`cursor-pointer rounded-md border p-2 ${
                      selectedTimeId === timeSlot.id ? 'bg-green-100' : ''
                    } ${disabledTimeIds.includes(timeSlot.id) ? 'cursor-not-allowed bg-gray-300 text-gray-500' : ''}`}
                  >
                    <input
                      type='radio'
                      value={`${timeSlot.startTime} - ${timeSlot.endTime}`}
                      onChange={() => handleTimeSelection(timeSlot.id)}
                      className='hidden'
                      disabled={disabledTimeIds.includes(timeSlot.id)}
                    />
                    {timeSlot.startTime} - {timeSlot.endTime}
                  </label>
                ))
              ) : (
                <p className='text-red-500'>이 날짜에는 예약 가능한 시간이 없습니다.</p>
              )}
            </div>
            {errors.time && <p className='text-red-500'>{errors.time.message}</p>}
            <p className='text-sm text-gray-500'>한 번의 예약에는 한 타임만 가능합니다.</p>
          </li>
          <li>
            <p className='font-medium'>참여 인원수</p>
            <div className='flex items-center space-x-2'>
              <button
                type='button'
                className='rounded-md border px-3 py-1'
                onClick={() => setValue('people', peopleCount - 1)}
              >
                -
              </button>
              <input
                type='number'
                {...register('people', { min: 1, required: true })}
                readOnly
                className='w-12 rounded-md border text-center'
              />
              <button
                type='button'
                className='rounded-md border px-3 py-1'
                onClick={() => setValue('people', peopleCount + 1)}
              >
                +
              </button>
            </div>
            <p className='text-sm text-gray-500'>최소 참여 인원 수는 1명 입니다.</p>
          </li>
          <li className='text-lg font-semibold'>총 합계: ₩ {totalPrice.toLocaleString()}</li>
          <button
            type='submit'
            className={`absolute bottom-0 left-0 w-full cursor-pointer rounded-t-none rounded-b-md py-2 text-white ${
              !selectedTimeId || !isLoggedIn ? 'cursor-not-allowed bg-gray-300' : 'bg-green-100 hover:bg-green-100'
            }`}
            disabled={!selectedTimeId || !isLoggedIn}
          >
            예약하기
          </button>
        </ol>
      </form>
    </div>
  );
}
