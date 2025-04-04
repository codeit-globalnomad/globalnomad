'use client';

import { useState } from 'react';

interface FloatingLabelInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FloatingLabelInput({ id, label, value, onChange }: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='relative flex flex-col gap-[8px]'>
      <label
        htmlFor={id}
        className={`absolute left-10 bg-white px-1 text-gray-700 transition-all md:left-12 ${
          isFocused || value !== '' ? 'top-[-14%] text-sm' : 'top-4 text-base'
        }`}
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
      />
    </div>
  );
}
