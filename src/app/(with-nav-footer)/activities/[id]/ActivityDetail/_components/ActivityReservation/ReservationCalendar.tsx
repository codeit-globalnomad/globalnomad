import Calendar from 'react-calendar';
import { format } from 'date-fns';

interface ActivityReservationCalendarProps {
  selectedDate: Date | undefined;
  availableDates: Date[];
  onSelectDate: (date: Date) => void;
  className: string;
  isDateDisabled: (date: Date) => boolean;
}

const ActivityReservationCalendar: React.FC<ActivityReservationCalendarProps> = ({
  selectedDate,
  availableDates,
  onSelectDate,
  className,
  isDateDisabled,
}) => {
  const today = new Date();
  const formatCalendarDay = (locale: string | undefined, date: Date): string => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  };

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

        if (
          availableDates.some((availableDate) => format(availableDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
        ) {
          className = 'react-calendar__tile--available';
        }
        if (selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
          className += ' react-calendar__tile--selected';
        }
        if (format(today, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
          className += selectedDate ? ' react-calendar__tile--today-underline' : ' react-calendar__tile--now';
        }

        return className;
      }}
    />
  );
};

export default ActivityReservationCalendar;
