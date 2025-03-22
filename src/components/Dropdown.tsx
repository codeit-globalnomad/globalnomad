'use client';
import { useState, useRef } from 'react';
import { useClickOutside } from '@/lib/utils/useClickOutside';

interface DropdownOption {
  label: string;
  onClick?: () => void;
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  trigger: React.ReactNode;
  dropdownClassName?: string;
}

export default function Dropdown({ options, onSelect, trigger, dropdownClassName = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  const handleSelect = (option: DropdownOption) => {
    option.onClick?.();
    onSelect(option);
    setIsOpen(false);
  };

  const dropdownOpen = () => setIsOpen((prev) => !prev);

  return (
    <div ref={ref} className='relative'>
      <button onClick={dropdownOpen} className='cursor-pointer'>
        {trigger}
      </button>

      {isOpen && (
        <ul
          className={`absolute cursor-pointer rounded-xl border border-gray-300 bg-white whitespace-nowrap drop-shadow-sm ${dropdownClassName}`}
        >
          {options.map((option, index) => (
            <li
              key={option.label}
              onClick={() => handleSelect(option)}
              className={`text-md h-[45px] w-[130px] cursor-pointer text-center leading-[45px] font-medium text-gray-900 hover:bg-gray-100 md:h-[56px] md:w-[160px] md:text-lg md:leading-[56px] ${
                index === 0 ? 'rounded-t-xl' : ''
              } ${index === options.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-300'}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
