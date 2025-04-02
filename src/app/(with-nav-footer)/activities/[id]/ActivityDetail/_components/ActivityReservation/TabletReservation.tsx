'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form'; // Controller 추가
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Calendar from 'react-calendar';
import { toast } from 'react-toastify';
import { format, isBefore, startOfDay } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import { useQueryClient } from '@tanstack/react-query';
import alert from '@/assets/icons/alert.svg';
import decrement from '@/assets/icons/decrement.svg';
import increment from '@/assets/icons/increment.svg';
import leftArrow from '@/assets/icons/left-arrow.svg';
import close from '@/assets/icons/close-fill.svg';
import { useAvailableSchedule, useCreateReservation } from '@/lib/hooks/useActivities';
import { useMyReservations } from '@/lib/hooks/useMyReservation';
import 'react-calendar/dist/Calendar.css';
import 'swiper/css';
import 'swiper/css/pagination';
import './CalendarStyles.css';

type TabletReservationProps = {
  isLoggedIn: boolean;
  currentActivityId: number;
  price: number;
};

type ReservationForm = {
  date: string;
  time: string;
  people: number;
};

type Value = Date | [Date | null, Date | null] | null;

export default function TabletReservation({ isLoggedIn, currentActivityId, price }: TabletReservationProps) {
  const { register, handleSubmit, control, watch, setValue } = useForm<ReservationForm>({
    defaultValues: {
      people: 1,
    },
  });

  const today = new Date();
  const selectedYear = String(today.getFullYear());
  const selectedMonth = String(today.getMonth() + 1).padStart(2, '0');

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Value) => {
    if (date instanceof Date) {
      setSelectedDate(date);
    } else if (Array.isArray(date) && date[0] instanceof Date) {
      setSelectedDate(date[0]); // 시작 날짜만 선택
    }
    setSelectedTimeId(null);
  };

  const formatDate = (date?: Date) => {
    const targetDate = date || today;

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const [availableTimes, setAvailableTimes] = useState<{ id: number; startTime: string; endTime: string }[]>([]);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [size, setSize] = useState<number>(10);
  const [reservationCompleted, setReservationCompleted] = useState(false);
  const [disabledTimeIds, setDisabledTimeIds] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedTimeSlot = availableTimes.find((slot) => slot.id === selectedTimeId);

  const peopleCount = watch('people', 1);
  const totalPrice = price * peopleCount;

  const queryClient = useQueryClient();
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: availableSchedule } = useAvailableSchedule(currentActivityId, selectedYear, selectedMonth);
  const { data: myReservations } = useMyReservations({
    size: size,
  });
  const { mutate: createReservation } = useCreateReservation(currentActivityId);

  const availableDates = availableSchedule?.map((schedule) => new Date(schedule.date)) || [];

  const isDateDisabled = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(today));
  };

  const handleTimeSelection = (timeId: number) => {
    setSelectedTimeId((prevTimeId) => (prevTimeId === timeId ? null : timeId));
  };

  const formatCalendarDay = (locale: string | undefined, date: Date): string => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
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
      swiperRef.current?.slideTo(0);
    }
  }, [selectedDate, availableSchedule]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [disabledTimeIds]);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const handleOpenModal = () => setIsModalOpen(true);

  // 모달 닫기
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className='hidden rounded-[12px] border-[1px] border-gray-300 bg-white md:block lg:hidden'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className='flex flex-col gap-3 p-5'>
          <li className='text-[28px] font-bold'>
            ₩ {price.toLocaleString()} <span className='text-2lg font-normal text-gray-900'>/ 인</span>
            <hr className='mt-2 border-t-1 border-gray-300' />
          </li>
          <li className='flex flex-col gap-2'>
            <p className='text-xl font-bold'>날짜 / 시간</p>
            <div>
              <button
                type='button'
                onClick={handleOpenModal}
                className='cursor-pointer text-lg text-green-100 underline'
              >
                {selectedDate && selectedTimeSlot
                  ? `${formatDate(selectedDate)} / ${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`
                  : '선택하기'}
              </button>

              {isModalOpen && (
                <Modal onClose={handleCloseModal} className='relative w-[350px]'>
                  <ol className='flex flex-col gap-[20px]'>
                    <li className='flex items-center justify-between'>
                      <h2 className='text-2xl font-bold'>날짜 / 시간</h2>
                      <button onClick={handleCloseModal} className='cursor-pointer'>
                        <Image src={close} width={36} height={36} alt='닫기 아이콘' />
                      </button>
                    </li>
                    <li className=''>
                      <Controller
                        name='date'
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            className='tabletReservation'
                            minDate={today}
                            locale='ko'
                            calendarType='gregory'
                            prev2Label={null}
                            next2Label={null}
                            formatDay={formatCalendarDay}
                            onChange={handleDateChange}
                            value={selectedDate}
                            onClickDay={(date) => {
                              if (!isDateDisabled(date)) {
                                setSelectedDate(date);
                                field.onChange(format(date, 'yyyy-MM-dd'));
                              }
                            }}
                            tileClassName={({ date }) => {
                              let className = '';
                              if (
                                availableDates.some(
                                  (availableDate) => format(availableDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
                                )
                              ) {
                                className = 'react-calendar__tile--available';
                              }
                              if (selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
                                className += ' react-calendar__tile--selected';
                              }
                              if (format(today, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
                                className += selectedDate
                                  ? ' react-calendar__tile--today-underline'
                                  : ' react-calendar__tile--now';
                              }
                              return className;
                            }}
                          />
                        )}
                      />
                    </li>
                    <li className='flex flex-col gap-2'>
                      <div className='flex items-center justify-between'>
                        <p className='text-xl font-bold'>예약 가능한 시간</p>
                        <div className='z-10 mr-[-10px] flex cursor-pointer'>
                          <div className={`custom-prev ${currentIndex === 0 ? 'pointer-events-none opacity-50' : ''}`}>
                            <Image src={leftArrow} width={26} height={26} alt='이전 화살표 아이콘' />
                          </div>
                          <div
                            className={`custom-next ${currentIndex === availableTimes.length - 1 ? 'pointer-events-none opacity-50' : ''}`}
                          >
                            <Image
                              src={leftArrow}
                              width={26}
                              height={26}
                              alt='다음 화살표 아이콘'
                              className='scale-x-[-1] transform'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex space-x-2'>
                        {availableTimes.length > 0 ? (
                          <Swiper
                            modules={[Navigation, Keyboard]}
                            onSwiper={(swiper) => {
                              swiperRef.current = swiper;
                              if (selectedTimeId) {
                                const timeIndex = availableTimes.findIndex(
                                  (timeSlot) => timeSlot.id === selectedTimeId,
                                );
                                if (timeIndex !== -1) {
                                  swiper.slideTo(timeIndex);
                                }
                              }
                            }}
                            onSlideChange={(swiper) => {
                              setCurrentIndex(swiper.activeIndex);
                            }}
                            navigation={{
                              nextEl: '.custom-next',
                              prevEl: '.custom-prev',
                            }}
                            keyboard={{
                              enabled: true,
                            }}
                            spaceBetween={10}
                            slidesPerView='auto'
                            loop={false}
                            className='m-0 h-auto'
                            centeredSlides={false}
                            key={disabledTimeIds.length}
                          >
                            {availableTimes.map((timeSlot) => (
                              <SwiperSlide
                                key={`${timeSlot.id}-${selectedTimeId}-${selectedDate}`}
                                style={{
                                  width: 'auto',
                                  flexShrink: 0,
                                  display: 'flex',
                                  alignItems: 'center',
                                  pointerEvents: disabledTimeIds.includes(timeSlot.id) ? 'none' : 'auto',
                                }}
                              >
                                <label
                                  className={`cursor-pointer rounded-md border-[1px] p-2 text-lg whitespace-nowrap ${
                                    selectedTimeId === timeSlot.id ? 'bg-green-100 text-white' : ''
                                  } ${disabledTimeIds.includes(timeSlot.id) ? 'cursor-not-allowed border-gray-400 bg-gray-200 text-gray-500' : 'border-green-100'}`}
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
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        ) : (
                          <></>
                        )}
                      </div>
                      <p className='flex gap-1 text-[15px] text-[#767676]'>
                        <Image src={alert} width={16} height={16} alt='경고 아이콘' />
                        {availableTimes.length === 0
                          ? '이 날짜에는 예약 가능한 시간이 없습니다.'
                          : '한 번의 예약에는 한 타임만 가능합니다.'}
                      </p>
                    </li>
                    <li>
                      <Button type='button' variant='default' onClick={handleCloseModal} className='w-full p-[10px]'>
                        선택 완료
                      </Button>
                    </li>
                  </ol>
                </Modal>
              )}
            </div>
            <hr className='border-t-1 border-gray-300' />
          </li>
          <li className='flex flex-col gap-2'>
            <p className='text-xl font-bold'>참여 인원수</p>
            <div className='flex w-[120px] items-center rounded-md border border-gray-300'>
              <button
                type='button'
                className='w-[40px] cursor-pointer p-2 text-center'
                onClick={() => setValue('people', Math.max(1, peopleCount - 1))}
              >
                <Image src={decrement} width={18} height={18} alt='감소 버튼 아이콘' />
              </button>
              <input
                type='text'
                {...register('people', { required: true })}
                readOnly
                className='w-[40px] p-2 text-center'
              />
              <button
                type='button'
                className='w-[40px] cursor-pointer p-2 text-center'
                onClick={() => setValue('people', peopleCount + 1)}
              >
                <Image src={increment} width={18} height={18} alt='증가 버튼 아이콘' />
              </button>
            </div>
            <p className='flex gap-1 text-[15px] text-[#767676]'>
              <Image src={alert} width={16} height={16} alt='경고 아이콘' />
              최소 참여 인원 수는 1명 입니다.
            </p>
            <hr className='w-full border-t-1 border-gray-300' />
          </li>
          <li className='flex items-center justify-between font-bold'>
            <span className='text-xl'>총 합계</span>
            <span className='text-[28px]'>₩ {totalPrice.toLocaleString()}</span>
          </li>
        </ol>
        <Button
          type='submit'
          className={`h-[50px] w-full cursor-pointer rounded-t-none rounded-b-md py-2 font-bold text-white ${
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
