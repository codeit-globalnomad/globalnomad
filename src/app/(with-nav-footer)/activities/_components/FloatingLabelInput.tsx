'use client';
import { useState } from 'react';

interface FloatingLabelInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
}

export default function FloatingLabelInput({
  id = 'search',
  label,
  placeholder = '',
  onChange,
  className = '',
  value,
}: FloatingLabelInputProps) {
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
        placeholder={placeholder}
        className={`rounded-md border border-gray-800 focus:border-green-200${className}`}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value !== '')}
      />
    </div>
  );
}
