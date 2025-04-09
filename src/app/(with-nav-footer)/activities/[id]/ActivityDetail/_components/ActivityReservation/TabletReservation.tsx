'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Controller } from 'react-hook-form';
import alert from '@/assets/icons/alert.svg';
import close from '@/assets/icons/close-fill.svg';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import AvailableTimeSelector from './AvailableTimeSelector';
import PeopleCounter from './PeopleCounter';
import ReservationCalendar from './ReservationCalendar';
import ReservationSubmitButton from './ReservationSubmitButton';
import { useReservation } from './useReservation';
import 'swiper/css';
import 'swiper/css/pagination';

type TabletReservationProps = {
  isLoggedIn: boolean;
  currentActivityId: number;
  price: number;
};

export default function TabletReservation({ isLoggedIn, currentActivityId, price }: TabletReservationProps) {
  const {
    today,
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
    setSelectedTimeId,
  } = useReservation(currentActivityId, price);

  const formatDate = (date?: Date) => {
    return format(date || today, 'yyyy-MM-dd');
  };

  const selectedTimeSlot = availableTimes.find((slot) => slot.id === selectedTimeId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className='hidden rounded-[12px] border-[1px] border-gray-300 bg-white md:block lg:hidden'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className='flex flex-col gap-3 p-5'>
          <li className='custom-md-size-top text-[28px] font-bold'>
            ₩ {price.toLocaleString()} <span className='text-2lg font-normal text-gray-900'>/ 인</span>
            <hr className='mt-2 border-t-1 border-gray-300' />
          </li>
          <li className='custom-md-size-middle flex flex-col gap-2'>
            <p className='text-xl font-bold'>날짜 / 시간</p>
            <div>
              <button
                type='button'
                onClick={handleOpenModal}
                className='cursor-pointer text-left text-lg font-semibold text-green-100 underline'
                aria-label='선택하기'
              >
                {selectedDate && selectedTimeSlot
                  ? `${formatDate(selectedDate)} / ${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`
                  : '선택하기'}
              </button>
              {isModalOpen && (
                <Modal onClose={handleCloseModal} className='relative w-[380px]'>
                  <ol className='flex flex-col gap-[20px]'>
                    <li className='flex items-center justify-between'>
                      <h2 className='text-2xl font-bold'>날짜 / 시간</h2>
                      <button onClick={handleCloseModal} className='cursor-pointer' aria-label='닫기'>
                        <Image src={close} width={36} height={36} alt='닫기 아이콘' />
                      </button>
                    </li>
                    <li className=''>
                      <Controller
                        name='date'
                        control={control}
                        render={({ field }) => (
                          <ReservationCalendar
                            selectedDate={selectedDate}
                            availableDates={availableDates}
                            onSelectDate={(date) => {
                              setSelectedDate(date);
                              setSelectedTimeId(null);
                              field.onChange(formatDate(date));
                            }}
                            className='tabletReservation'
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
                    <li>
                      <Button
                        type='button'
                        variant='default'
                        onClick={handleCloseModal}
                        className='w-full py-3 text-lg'
                        aria-label='선택 완료'
                      >
                        선택 완료
                      </Button>
                    </li>
                  </ol>
                </Modal>
              )}
            </div>
            <hr className='border-t-1 border-gray-300' />
          </li>
          <li className='custom-md-size-middle flex flex-col gap-2'>
            <p className='text-xl font-bold'>참여 인원수</p>
            <PeopleCounter peopleCount={peopleCount} setValue={setValue} register={register} />
            <p className='second flex w-full items-center gap-1 text-[15px] text-[#767676]'>
              <Image src={alert} width={16} height={16} alt='경고 아이콘' />
              <span className='overflow-hidden text-ellipsis whitespace-nowrap'>최소 참여 인원 수는 1명 입니다.</span>
            </p>
            <hr className='w-full border-t-1 border-gray-300' />
          </li>
          <li className='custom-md-size-bottom flex items-center justify-between font-bold'>
            <span className='text-xl'>총 합계</span>
            <span className='text-[28px]'>₩ {totalPrice.toLocaleString()}</span>
          </li>
        </ol>
        <ReservationSubmitButton
          reservationCompleted={reservationCompleted}
          selectedTimeId={selectedTimeId}
          isLoggedIn={isLoggedIn}
          size='tablet'
        />
      </form>
    </div>
  );
}
