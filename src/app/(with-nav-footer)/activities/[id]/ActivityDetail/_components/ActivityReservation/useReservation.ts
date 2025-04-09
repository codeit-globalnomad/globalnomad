import { useEffect, useRef, useState } from 'react';
import { format, isBefore, startOfDay, isAfter, parseISO, isToday } from 'date-fns';
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
  const today = new Date();

  const { register, handleSubmit, control, watch, setValue } = useForm<ReservationFormValues>({
    defaultValues: {
      date: format(today, 'yyyy-MM-dd'),
      people: 1,
    },
  });

  const selectedYear = format(today, 'yyyy');
  const selectedMonth = format(today, 'MM');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date() || today);
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);
  const [size, setSize] = useState<number>(10);
  const [disabledTimeIds, setDisabledTimeIds] = useState<number[]>([]);
  const [reservationCompleted, setReservationCompleted] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);
  const peopleCount = watch('people', 1);
  const totalPrice = price * peopleCount;
  const queryClient = useQueryClient();

  const { data: availableSchedule, refetch: refetchSchedule } = useAvailableSchedule(
    currentActivityId,
    selectedYear,
    selectedMonth,
  );
  const { data: myReservations, refetch: refetchMyReservations } = useMyReservations({
    size: size,
  });
  const { mutate: createReservation } = useCreateReservation(currentActivityId);

  const availableDates = availableSchedule?.map((schedule) => parseISO(schedule.date)) || [];
  const isDateDisabled = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(today));
  };

  const [availableTimes, setAvailableTimes] = useState<{ id: number; startTime: string; endTime: string }[]>([]);

  const lastSelectedTimeIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (selectedDate) {
      refetchMyReservations();
      refetchSchedule();
      setSelectedTimeId(null);

      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      setValue('date', selectedDateStr);

      const schedule = availableSchedule?.find(({ date }) => date === selectedDateStr);
      const now = new Date();
      let filteredTimes = schedule?.times || [];

      if (isToday(selectedDate)) {
        filteredTimes = filteredTimes.filter((time) => {
          const [hour, minute] = time.startTime.split(':').map(Number);
          const startDateTime = new Date(selectedDate);
          startDateTime.setHours(hour, minute, 0, 0);
          return isAfter(startDateTime, now);
        });
      }
      setAvailableTimes(filteredTimes);

      if (swiperRef.current) {
        const index =
          lastSelectedTimeIdRef.current !== null
            ? filteredTimes.findIndex((time) => time.id === lastSelectedTimeIdRef.current)
            : 0;
        swiperRef.current.slideTo(index >= 0 ? index : 0);
        swiperRef.current.update();
      }

      setValue('people', 1);
    }
  }, [selectedDate, availableSchedule, setValue, refetchSchedule, refetchMyReservations]);

  useEffect(() => {
    if (selectedDate || selectedTimeId) {
      setReservationCompleted(false);
    }
  }, [selectedDate, selectedTimeId]);

  useEffect(() => {
    if (myReservations?.totalCount) {
      setSize(myReservations.totalCount);
    }

    if (myReservations?.reservations) {
      const updated = myReservations.reservations
        .filter(({ status }) => ['pending'].includes(status))
        .map(({ scheduleId }) => scheduleId);
      setDisabledTimeIds(updated);
    }
  }, [myReservations]);

  useEffect(() => {
    if (reservationCompleted) {
      lastSelectedTimeIdRef.current = null;
    }
  }, [reservationCompleted]);

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
          lastSelectedTimeIdRef.current = selectedTimeId;
          toast.success('예약이 완료되었습니다.');
          setReservationCompleted(true);
          setSelectedTimeId(null);
          setValue('people', 1);
          setDisabledTimeIds((prev) => [...prev, Number(selectedTimeId)]);
          refetchMyReservations();
          refetchSchedule();
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
