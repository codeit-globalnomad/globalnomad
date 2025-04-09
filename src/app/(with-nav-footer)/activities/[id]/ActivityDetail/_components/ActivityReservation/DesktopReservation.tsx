'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { Controller } from 'react-hook-form';
import alert from '@/assets/icons/alert.svg';
import AvailableTimeSelector from './AvailableTimeSelector';
import PeopleCounter from './PeopleCounter';
import ReservationCalendar from './ReservationCalendar';
import ReservationSubmitButton from './ReservationSubmitButton';
import { useReservation } from './useReservation';
import 'swiper/css';
import 'swiper/css/pagination';

type DesktopReservationProps = {
  isLoggedIn: boolean;
  currentActivityId: number;
  price: number;
};

export default function DesktopReservation({ isLoggedIn, currentActivityId, price }: DesktopReservationProps) {
  const {
    register,
    handleSubmit,
    control,
    selectedDate,
    setSelectedDate,
    selectedTimeId,
    handleTimeSelection,
    availableDates,
    availableTimes,
    disabledTimeIds,
    isDateDisabled,
    onSubmit,
    totalPrice,
    reservationCompleted,
    peopleCount,
    swiperRef,
    setValue,
  } = useReservation(currentActivityId, price);

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
                <ReservationCalendar
                  selectedDate={selectedDate}
                  availableDates={availableDates}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                    field.onChange(format(date, 'yyyy-MM-dd'));
                  }}
                  className='desktopReservation'
                  isDateDisabled={isDateDisabled}
                />
              )}
            />
          </li>
          <AvailableTimeSelector
            availableTimes={availableTimes}
            selectedTimeId={selectedTimeId}
            disabledTimeIds={disabledTimeIds}
            selectedDate={selectedDate}
            onSelectTime={handleTimeSelection}
            swiperRef={swiperRef}
          />
          <li className='flex flex-col items-baseline gap-2'>
            <p className='text-xl font-bold'>참여 인원수</p>
            <PeopleCounter peopleCount={peopleCount} setValue={setValue} register={register} />
            <p className='flex gap-1 text-[15px] text-[#767676]'>
              <Image src={alert} className='h-auto w-[16px]' alt='경고 아이콘' />
              최소 참여 인원 수는 1명 입니다.
            </p>
            <hr className='mt-2 mb-2 w-full border-t-1 border-gray-300' />
          </li>
          <li className='flex justify-between font-bold'>
            <span className='text-xl'>총 합계</span>
            <span className='text-[30px]'>₩ {totalPrice.toLocaleString()}</span>
          </li>
        </ol>
        <ReservationSubmitButton
          reservationCompleted={reservationCompleted}
          selectedTimeId={selectedTimeId}
          isLoggedIn={isLoggedIn}
          size='desktop'
        />
      </form>
    </div>
  );
}
