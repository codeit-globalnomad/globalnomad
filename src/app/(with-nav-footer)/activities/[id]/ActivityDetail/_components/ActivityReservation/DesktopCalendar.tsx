import Calendar from 'react-calendar';
import { Control, FieldValues } from 'react-hook-form';
import { format, isBefore, startOfDay } from 'date-fns';

type DesktopCalenderProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  today: Date;
  availableDates: Date[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date) => void;
  field: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    ref: React.Ref<HTMLInputElement>;
  };
};

export default function DesktopCalender<T extends FieldValues = FieldValues>({
  today,
  availableDates,
  selectedDate,
  setSelectedDate,
  field,
}: DesktopCalenderProps<T>) {
  const isDateDisabled = (date: Date) => isBefore(startOfDay(date), startOfDay(today));

  const formatCalendarDay = (locale: string | undefined, date: Date): string => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  };

  return (
    <Calendar
      className='desktopReservation'
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
      locale='ko'
      calendarType='gregory'
      prev2Label={null}
      next2Label={null}
      formatDay={formatCalendarDay}
    />
  );
}
