'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Controller } from 'react-hook-form';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { format } from 'date-fns';
import alert from '@/assets/icons/alert.svg';
import close from '@/assets/icons/close-fill.svg';
import 'react-calendar/dist/Calendar.css';
import 'swiper/css';
import 'swiper/css/pagination';
import './ActivityReservationStyles.css';
import { useReservation } from './useReservation';
import ActivityReservationCalendar from './ActivityReservationCalendar';
import AvailableTimeSelector from './AvailableTimeSelector';
import PeopleCounter from './PeopleCounter';
import ReservationSubmitButton from './ReservationSubmitButton';

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
  } = useReservation(currentActivityId, price);

  const formatDate = (date?: Date) => {
    const targetDate = date || today;

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const selectedTimeSlot = availableTimes.find((slot) => slot.id === selectedTimeId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className='h-[84px] rounded-t-[12px] border-t-1 border-gray-200 bg-white px-5 py-3 md:hidden'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className='grid h-full grid-cols-[70%_30%] items-center'>
          <li>
            <div className='text-[22px] font-bold'>
              ₩ {totalPrice.toLocaleString()}
              <span className='text-2lg font-normal text-gray-900'> / {peopleCount}인</span>
            </div>
            <div>
              <div>
                <button
                  type='button'
                  onClick={handleOpenModal}
                  className='cursor-pointer text-lg font-semibold text-green-100 underline'
                >
                  {selectedDate && selectedTimeSlot
                    ? `${formatDate(selectedDate)} / ${selectedTimeSlot.startTime}-${selectedTimeSlot.endTime}`
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
                      <button onClick={handleCloseModal} className='cursor-pointer'>
                        <Image src={close} width={36} height={36} alt='닫기 아이콘' />
                      </button>
                    </div>
                    <ol className='flex h-full flex-col gap-[20px] px-6'>
                      <li className='border-grey-10 rounded-[12px] border'>
                        <Controller
                          name='date'
                          control={control}
                          render={({ field }) => (
                            <ActivityReservationCalendar
                              selectedDate={selectedDate}
                              availableDates={availableDates}
                              onSelectDate={(date) => {
                                setSelectedDate(date);
                                field.onChange(format(date, 'yyyy-MM-dd'));
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
                          <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
                            최소 참여 인원 수는 1명 입니다.
                          </span>
                        </p>
                      </li>
                    </ol>
                    <div className='sticky bottom-0 z-10 bg-white p-6'>
                      <Button type='button' variant='default' onClick={handleCloseModal} className='w-full p-[10px]'>
                        선택 완료
                      </Button>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
          </li>
          <li className='flex h-full justify-end'>
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
