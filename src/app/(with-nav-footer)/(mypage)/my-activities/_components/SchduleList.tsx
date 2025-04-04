import { CreateSchedule } from '@/lib/types/activities';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { DatepickerStyles } from './DatepickerStyles';
import 'react-datepicker/dist/react-datepicker.css';

interface ScheduleListProps {
  value: CreateSchedule[];
  onChange: (schedules: CreateSchedule[] | null) => void;
  error?: string;
}

export default function ScheduleList({ value, onChange, error }: ScheduleListProps) {
  const [temp, setTemp] = useState<{
    date: Date | null;
    startTime: string;
    endTime: string;
  }>({
    date: null,
    startTime: '',
    endTime: '',
  });

  const addSchedule = () => {
    if (temp.date && temp.startTime && temp.endTime) {
      const formattedDate = temp.date.toISOString().split('T')[0];
      onChange([...value, { date: formattedDate, startTime: temp.startTime, endTime: temp.endTime }]);
      setTemp({ date: null, startTime: '', endTime: '' });
    }
  };

  const removeSchedule = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <>
      <style jsx global>
        {DatepickerStyles}
      </style>
      <div className='mt-[16px] space-y-3'>
        <div className='mt-[16px] space-y-3'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
            <div className='Datepickerstyles flex flex-col sm:w-auto'>
              <label className='text-md mb-1'>날짜</label>
              <DatePicker
                selected={temp.date}
                onChange={(date) => setTemp({ ...temp, date })}
                className='h-[48px] w-full rounded border px-4 sm:w-[379px]'
                placeholderText='YY/MM/DD'
                dateFormat='yy/MM/dd'
              />
            </div>
            <div className='flex flex-col sm:w-auto'>
              <label className='text-md mb-1'>시작 시간</label>
              <input
                type='time'
                className='h-[48px] w-full rounded border px-3 sm:w-[140px]'
                value={temp.startTime}
                onChange={(e) => setTemp({ ...temp, startTime: e.target.value })}
              />
            </div>
            <span className='mt-7 hidden sm:inline'>~</span>
            <div className='flex flex-col sm:w-auto'>
              <label className='text-md mb-1'>종료 시간</label>
              <input
                type='time'
                className='h-[48px] w-full rounded border px-3 sm:w-[140px]'
                value={temp.endTime}
                onChange={(e) => setTemp({ ...temp, endTime: e.target.value })}
              />
            </div>
            <button
              type='button'
              onClick={addSchedule}
              className='mt-2 h-[48px] w-full rounded bg-green-100 text-3xl text-white sm:mt-7 sm:w-[48px]'
            >
              +
            </button>
          </div>
        </div>

        <hr className='text-gray-400' />

        {value.map((item, idx) => (
          <div key={idx} className='flex items-center gap-4'>
            <div className='flex h-[48px] w-[379px] items-center rounded border px-3'>{item.date}</div>
            <div className='flex h-[48px] w-[140px] items-center rounded border px-3'>{item.startTime}</div>
            <span>~</span>
            <div className='flex h-[48px] w-[140px] items-center rounded border px-3'>{item.endTime}</div>
            <button
              type='button'
              onClick={() => removeSchedule(idx)}
              className='h-[48px] w-[48px] rounded border text-3xl text-green-100'
            >
              −
            </button>
          </div>
        ))}

        {error && <div className='text-sm text-red-500'>{error}</div>}
      </div>
    </>
  );
}
