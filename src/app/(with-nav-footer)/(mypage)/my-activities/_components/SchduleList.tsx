import { CreateSchedule } from '@/lib/types/activities';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { DatepickerStyles } from './DatepickerStyles';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/components/Button';

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
      const formattedDate = temp.date
        .toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\. /g, '-')
        .replace(/\.$/, '');
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
        <div className='flex items-center gap-4'>
          <div className='Datepickerstyles flex w-full max-w-[379px] min-w-[130px] flex-col'>
            <label className='text-md mb-1'>날짜</label>
            <DatePicker
              selected={temp.date}
              onChange={(date) => setTemp({ ...temp, date })}
              className='h-[48px] w-full max-w-[379px] min-w-[130px] rounded border px-4'
              placeholderText='YY/MM/DD'
              dateFormat='yy/MM/dd'
            />
          </div>
          <div className='flex w-full max-w-[140px] min-w-[79px] flex-col'>
            <label className='text-md mb-1'>시작 시간</label>
            <input
              type='time'
              className='h-[48px] w-full rounded border bg-white px-3'
              value={temp.startTime}
              onChange={(e) => setTemp({ ...temp, startTime: e.target.value })}
            />
          </div>
          <span className='mt-7'>~</span>
          <div className='flex w-full max-w-[140px] min-w-[79px] flex-col'>
            <label className='text-md mb-1'>종료 시간</label>
            <input
              type='time'
              className='h-[48px] w-full rounded border bg-white px-3'
              value={temp.endTime}
              onChange={(e) => setTemp({ ...temp, endTime: e.target.value })}
            />
          </div>
          <Button type='button' onClick={addSchedule} className='mt-7 h-[48px] w-[48px] px-4 text-3xl leading-[42px]'>
            +
          </Button>
        </div>

        <hr className='text-gray-400' />

        {value.map((item, idx) => (
          <div key={idx} className='flex items-center gap-4'>
            <div className='flex h-[48px] w-full max-w-[379px] min-w-[130px] flex-col rounded border bg-white px-3 leading-[48px]'>
              {item.date}
            </div>
            <div className='flex h-[48px] w-full max-w-[140px] min-w-[79px] items-center rounded border px-3'>
              {item.startTime}
            </div>
            <span>~</span>
            <div className='flex h-[48px] w-full max-w-[140px] min-w-[79px] items-center rounded border px-3'>
              {item.endTime}
            </div>
            <Button
              type='button'
              variant='outline'
              onClick={() => removeSchedule(idx)}
              className='h-[48px] w-[48px] px-4 text-3xl leading-[42px]'
            >
              -
            </Button>
          </div>
        ))}

        {error && <div className='text-sm text-red-500'>{error}</div>}
      </div>
    </>
  );
}
