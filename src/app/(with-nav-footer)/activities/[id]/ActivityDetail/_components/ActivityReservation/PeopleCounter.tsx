import Image from 'next/image';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import decrement from '@/assets/icons/decrement.svg';
import increment from '@/assets/icons/increment.svg';

type ReservationFormValues = {
  date: string;
  people: number;
};

type PeopleCounterProps = {
  peopleCount: number;
  setValue: UseFormSetValue<ReservationFormValues>;
  register: UseFormRegister<ReservationFormValues>;
};

export default function PeopleCounter({ peopleCount, setValue, register }: PeopleCounterProps) {
  return (
    <div className='flex w-[120px] items-center rounded-md border border-gray-300'>
      <button
        type='button'
        className='w-[40px] cursor-pointer p-2 text-center'
        onClick={() => setValue('people', Math.max(1, peopleCount - 1))}
        aria-label='감소'
      >
        <Image src={decrement} width={18} height={18} alt='감소 버튼 아이콘' />
      </button>
      <input
        type='text'
        {...register('people', { required: true })}
        readOnly
        className='w-[40px] p-2 text-center md:text-lg'
      />
      <button
        type='button'
        className='w-[40px] cursor-pointer p-2 text-center'
        onClick={() => setValue('people', peopleCount + 1)}
        aria-label='증가'
      >
        <Image src={increment} width={18} height={18} alt='증가 버튼 아이콘' />
      </button>
    </div>
  );
}
