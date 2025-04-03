import { useEffect, useRef, useState } from 'react';
import { format, isBefore, startOfDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Swiper as SwiperType } from 'swiper/types';
import { useQueryClient } from '@tanstack/react-query';
import { useAvailableSchedule, useCreateReservation } from '@/lib/hooks/useActivities';
import { useMyReservations } from '@/lib/hooks/useMyReservation';

type ReservationFormValues = {
  date: string;
  people: number;
};

export const useReservation = (currentActivityId: number, price: number) => {
  const { register, handleSubmit, control, watch, setValue } = useForm<ReservationFormValues>({
    defaultValues: {
      people: 1,
    },
  });
  const today = new Date();
  const selectedYear = String(today.getFullYear());
  const selectedMonth = String(today.getMonth() + 1).padStart(2, '0');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date() || today);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [size, setSize] = useState<number>(10);
  const [disabledTimeIds, setDisabledTimeIds] = useState<number[]>([]);
  const [reservationCompleted, setReservationCompleted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const peopleCount = watch('people', 1);
  const totalPrice = price * peopleCount;

  const queryClient = useQueryClient();
  const { data: availableSchedule } = useAvailableSchedule(currentActivityId, selectedYear, selectedMonth);
  const { data: myReservations } = useMyReservations({
    size: size,
  });
  const { mutate: createReservation } = useCreateReservation(currentActivityId);

  const availableDates = availableSchedule?.map((schedule) => new Date(schedule.date)) || [];
  const isDateDisabled = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(today));
  };

  const [availableTimes, setAvailableTimes] = useState<{ id: number; startTime: string; endTime: string }[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      const schedule = availableSchedule?.find(({ date }) => date === selectedDateStr);
      setAvailableTimes(schedule?.times || []);
      if (swiperRef.current) {
        swiperRef.current.slideTo(0);
        swiperRef.current.update();
      }
      setValue('people', 1);
    }
  }, [selectedDate, availableSchedule, setValue]);

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

  useEffect(() => {
    if (myReservations?.totalCount) {
      setSize(myReservations.totalCount);
    }
  }, [myReservations]);

  useEffect(() => {
    if (myReservations?.reservations) {
      const updated = myReservations.reservations
        .filter(({ status }) => ['confirmed', 'completed', 'pending'].includes(status))
        .map(({ scheduleId }) => scheduleId);
      setDisabledTimeIds(updated);
    }
  }, [myReservations]);

  const handleTimeSelection = (timeId: number) => {
    setSelectedTimeId((prevTimeId) => (prevTimeId === timeId ? null : timeId));
    if (swiperRef.current) {
      const index = availableTimes.findIndex((time) => time.id === timeId);
      if (index !== -1) {
        swiperRef.current.slideTo(index);
      }
    }
  };

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
  return {
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
  };
};
