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

export default function MobileReservation({ isLoggedIn, currentActivityId, price }: TabletReservationProps) {
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

  const formatDate = (date?: Date) => format(date || today, 'yyyy-MM-dd');

  const selectedTimeSlot = availableTimes.find((slot) => slot.id === selectedTimeId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className='rounded-t-[12px] border-t-1 border-gray-300 bg-white px-5 py-3 md:hidden'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className={'grid h-full grid-cols-[60%_40%] items-center'}>
          <li>
            <div className='text-[22px] font-bold'>
              ₩ {totalPrice.toLocaleString()}
              <span className='text-lg font-normal text-gray-900'> / {peopleCount}인</span>
            </div>
            <div>
              <button
                type='button'
                onClick={handleOpenModal}
                className='cursor-pointer text-left text-lg font-semibold text-green-100 underline'
                aria-label='선택하기'
              >
                {selectedDate && selectedTimeSlot
                  ? `${format(selectedDate, 'yyyy-MM-dd')} / ${selectedTimeSlot.startTime}-${selectedTimeSlot.endTime}`
                  : '선택하기'}
              </button>
              {isModalOpen && (
                <Modal
                  fullScreen
                  onClose={handleCloseModal}
                  className='relative flex h-full w-full flex-col justify-between overflow-auto rounded-none !p-0'
                >
                  <div className='sticky top-0 z-10 flex items-center justify-between bg-white p-6'>
                    <h2 className='text-2xl font-bold'>날짜 / 시간</h2>
                    <button onClick={handleCloseModal} className='cursor-pointer' aria-label='닫기'>
                      <Image src={close} width={36} height={36} alt='닫기 아이콘' />
                    </button>
                  </div>
                  <ol className='flex h-full flex-col gap-[20px] px-6'>
                    <li className='border-grey-10 rounded-[12px] border'>
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
                            className='mobileReservation'
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
                    <li className='flex flex-col gap-2'>
                      <p className='text-[22px] font-bold'>참여 인원수</p>
                      <PeopleCounter peopleCount={peopleCount} setValue={setValue} register={register} />
                      <p className='flex w-full items-center gap-1 text-lg text-[#767676]'>
                        <Image src={alert} width={16} height={16} alt='경고 아이콘' />
                        <span className='overflow-hidden text-[15px] text-ellipsis whitespace-nowrap'>
                          최소 참여 인원 수는 1명 입니다.
                        </span>
                      </p>
                    </li>
                  </ol>
                  <div className='sticky bottom-0 z-10 bg-white p-6'>
                    <Button
                      type='button'
                      variant='default'
                      onClick={handleCloseModal}
                      className='w-full p-[10px]'
                      aria-label='선택 완료'
                    >
                      선택 완료
                    </Button>
                  </div>
                </Modal>
              )}
            </div>
          </li>
          <li className='flex h-full flex-col'>
            <ReservationSubmitButton
              reservationCompleted={reservationCompleted}
              selectedTimeId={selectedTimeId}
              isLoggedIn={isLoggedIn}
              size='mobile'
            />
          </li>
        </ol>
      </form>
    </div>
  );
}
