import { format, isSameDay, startOfDay } from 'date-fns';
import Calendar from 'react-calendar';
import './ActivityReservationStyles.css';

interface ReservationCalendarProps {
  selectedDate: Date | undefined;
  availableDates: Date[];
  onSelectDate: (date: Date) => void;
  className: string;
  isDateDisabled: (date: Date) => boolean;
}

export default function ReservationCalendar({
  selectedDate,
  availableDates,
  onSelectDate,
  className,
  isDateDisabled,
}: ReservationCalendarProps) {
  const today = startOfDay(new Date());
  const formatCalendarDay = (_: string | undefined, date: Date): string => format(date, 'dd');

  return (
    <Calendar
      className={className}
      minDate={today}
      locale='ko'
      calendarType='gregory'
      prev2Label={null}
      next2Label={null}
      formatDay={formatCalendarDay}
      value={selectedDate || today}
      onClickDay={(date) => {
        if (!isDateDisabled(date)) {
          onSelectDate(date);
        }
      }}
      tileClassName={({ date }) => {
        let className = '';

        if (availableDates.some((d) => isSameDay(d, date))) {
          className = 'react-calendar__tile--available';
        }
        if (selectedDate && isSameDay(selectedDate, date)) {
          className += ' react-calendar__tile--selected';
        }
        if (isSameDay(today, date)) {
          className += selectedDate ? ' react-calendar__tile--today-underline' : ' react-calendar__tile--now';
        }

        return className;
      }}
    />
  );
}
