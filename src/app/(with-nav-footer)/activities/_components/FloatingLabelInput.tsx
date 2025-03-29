'use client';
import { useState } from 'react';

interface FloatingLabelInputProps {
  id: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function FloatingLabelInput({ id, label, onChange, value, onKeyDown }: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='relative flex flex-col gap-[8px]'>
      <label
        htmlFor={id}
        className={`absolute left-10 bg-white px-1 transition-all md:left-12 ${
          isFocused || value !== '' ? 'top-[-14%] text-sm' : 'top-4 text-base text-gray-700'
        } text-gray-700`}
      >
        {label}
      </label>
      <input
        id={id}
        type='text'
        onChange={onChange}
        className={`focus:outline-black-200 h-[56px] w-full max-w-[1004px] min-w-[187px] rounded-md border border-gray-800 py-[14px] pl-[48px]`}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value !== '')}
        onKeyPress={onKeyDown}
      />
    </div>
  );
}
