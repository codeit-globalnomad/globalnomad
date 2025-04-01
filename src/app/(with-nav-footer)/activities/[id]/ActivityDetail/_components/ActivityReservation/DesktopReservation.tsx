import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
import { useForm, Controller } from 'react-hook-form';
import { format, isBefore, startOfDay } from 'date-fns';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import { toast } from 'react-toastify';
import alert from '@/assets/icons/alert.svg';
import increment from '@/assets/icons/increment.svg';
import decrement from '@/assets/icons/decrement.svg';
import { useAvailableSchedule, useCreateReservation } from '@/lib/hooks/useActivities';
import { useMyReservations } from '@/lib/hooks/useMyReservation';
import 'swiper/css';
import 'swiper/css/pagination';
import leftArrow from '@/assets/icons/left-arrow.svg';
import 'react-calendar/dist/Calendar.css';
import './CalendarStyles.css';
import { useQueryClient } from '@tanstack/react-query';

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

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availableTimes, setAvailableTimes] = useState<{ id: number; startTime: string; endTime: string }[]>([]);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [reservationCompleted, setReservationCompleted] = useState(false); // 예약 완료 상태 추가

  const [size, setSize] = useState<number>(10);

  const today = new Date();
  const currentYear = String(today.getFullYear());
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

  const [selectedYear] = useState(currentYear);
  const [selectedMonth] = useState(currentMonth);

  const queryClient = useQueryClient();

  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: availableSchedule, refetch: refetchAvailableSchedule } = useAvailableSchedule(
    currentActivityId,
    selectedYear,
    selectedMonth,
  );
  const { data: myReservations, refetch: refetchMyReservations } = useMyReservations({
    size: size,
  });

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (myReservations && myReservations.totalCount) {
      setSize(myReservations.totalCount);
    }
  }, [myReservations]);

  const [pricePerPerson] = useState(price);
  const peopleCount = watch('people', 1);
  const totalPrice = pricePerPerson * peopleCount;

  const { mutate: createReservation } = useCreateReservation(currentActivityId);
  const [disabledTimeIds, setDisabledTimeIds] = useState<number[]>([]);

  const availableDates = availableSchedule?.map((schedule) => new Date(schedule.date)) || [];

  const isDateDisabled = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(today));
  };

  const handleTimeSelection = (timeId: number) => {
    setSelectedTimeId((prevTimeId) => (prevTimeId === timeId ? null : timeId));
  };

  const onSubmit = () => {
    console.log('selectedTimeId:', selectedTimeId);
    console.log('peopleCount:', peopleCount);

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
        onSuccess: (data) => {
          console.log('Reservation Success:', data);
          toast.success('예약이 완료되었습니다.');

          setReservationCompleted(true); // 예약 완료 상태로 설정
          setSelectedTimeId(null); // 선택한 시간 초기화
          setValue('people', 1); // 사람 수 초기화

          // 예약 성공 후 scheduleId를 disabledTimeIds에 추가
          setDisabledTimeIds((prevDisabledTimeIds) => {
            const updatedDisabledTimeIds = [...prevDisabledTimeIds, Number(selectedTimeId)];
            console.log('Updated disabledTimeIds:', updatedDisabledTimeIds); // 상태 업데이트 후 확인
            return updatedDisabledTimeIds;
          });

          queryClient.invalidateQueries({
            queryKey: ['availableSchedule', currentActivityId, selectedYear, selectedMonth],
          });

          queryClient.invalidateQueries({
            queryKey: ['myReservations', { size: size }],
          });
        },
        onError: (error) => {
          console.error('Reservation Error:', error);
          toast.error('예약에 실패했습니다. 다시 시도해주세요.');
        },
      },
    );
  };

  useEffect(() => {
    if (selectedDate) {
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      const scheduleForSelectedDate = availableSchedule?.find((schedule) => schedule.date === selectedDateStr);
      setAvailableTimes(scheduleForSelectedDate?.times || []);
      if (swiperRef.current) {
        swiperRef.current.slideTo(0);
      }
    }
  }, [selectedDate, availableSchedule]);

  useEffect(() => {
    if (myReservations?.reservations) {
      const updatedDisabledTimeIds =
        myReservations.reservations
          ?.filter(
            (reservation) =>
              reservation.status === 'confirmed' ||
              reservation.status === 'completed' ||
              reservation.status === 'pending',
          )
          .map((reservation) => reservation.scheduleId) || [];

      console.log('업데이트된 비활성화시킬 스케쥴아이디', updatedDisabledTimeIds); // 확인을 위한 로그 추가
      setDisabledTimeIds(updatedDisabledTimeIds);
    }
  }, [myReservations]);

  // useEffect를 사용하여 disabledTimeIds가 변경될 때마다 UI 업데이트
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update(); // Swiper UI 강제 업데이트
    }
  }, [disabledTimeIds]);

  useEffect(() => {
    if (selectedDate || selectedTimeId) {
      setReservationCompleted(false); // 예약 완료 상태 초기화
    }
  }, [selectedDate, selectedTimeId]);

  return (
    <div className='hidden rounded-[12px] border-[1px] border-gray-300 md:hidden lg:block'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ol className='p-5'>
          <li className='mb-4 text-[30px] font-bold'>
            ₩ {pricePerPerson.toLocaleString()} <span className='text-xl font-normal text-gray-900'>/ 인</span>
            <hr className='mt-2 border-t-1 border-gray-300' />
          </li>
          <li className='mb-4 flex flex-col gap-2'>
            <p className='text-xl font-bold'>날짜</p>
            <Controller
              name='date'
              control={control}
              rules={{ required: '날짜를 선택해주세요.' }}
              render={({ field }) => (
                <div>
                  <Calendar
                    value={selectedDate || today}
                    onClickDay={(date) => {
                      if (!isDateDisabled(date)) {
                        setSelectedDate(date);
                        field.onChange(format(date, 'yyyy-MM-dd'));
                      }
                    }}
                    minDate={today}
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
                        if (selectedDate) {
                          className += ' react-calendar__tile--today-underline';
                        } else {
                          className += ' react-calendar__tile--now';
                        }
                      }

                      return className;
                    }}
                    locale='ko'
                    calendarType='gregory'
                    prev2Label={null}
                    next2Label={null}
                    formatDay={(locale, date) => date.getDate().toString()}
                  />
                </div>
              )}
            />
            {/* <hr className='mt-2 mb-2 border-t-1 border-gray-300' /> */}
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
                  }}
                  onSlideChange={(swiper) => {
                    setCurrentIndex(swiper.activeIndex); // activeIndex로 currentIndex 갱신
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
                        pointerEvents: disabledTimeIds.includes(timeSlot.id) ? 'none' : 'auto', // 비활성화된 시간에 대해 클릭 방지
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
                // <p className='text-red-500'>이 날짜에는 예약 가능한 시간이 없습니다.</p>
              )}
            </div>
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
                className='w-[40px] p-2 text-center'
                onClick={() => setValue('people', peopleCount - 1)}
                aria-label='증가 버튼'
              >
                <Image src={decrement} width={18} height={18} alt='증가 버튼 아이콘' />
              </button>
              <input
                type='text'
                {...register('people', { min: 1, required: true })}
                readOnly
                className='w-[40px] p-2 text-center'
              />
              <button
                type='button'
                className='w-[40px] p-2 text-center'
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
        <button
          type='submit'
          className={`h-[60px] w-full cursor-pointer rounded-t-none rounded-b-md py-2 font-bold text-white ${
            !selectedTimeId || !isLoggedIn ? 'cursor-not-allowed bg-gray-300' : 'bg-green-100 hover:bg-green-100'
          }`}
          disabled={!selectedTimeId || !isLoggedIn || reservationCompleted}
        >
          {reservationCompleted ? '예약 완료' : '예약하기'}
        </button>
      </form>
    </div>
  );
}
