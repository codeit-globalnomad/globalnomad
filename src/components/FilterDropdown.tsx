'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import arrowFilterDropdown from '@/assets/icons/arrow-filter-dropdown.svg';

interface FilterDropdownOption {
  label: string;
  onClick?: () => void;
}

interface FilterDropdownProps {
  options: FilterDropdownOption[];
  onSelect: (option: FilterDropdownOption | null) => void;
  label: string;
  className?: string;
}

export default function FilterDropdown({ options, onSelect, label, className = '' }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<FilterDropdownOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: FilterDropdownOption) => {
    if (option.label === '전체') {
      setSelected(null);
      onSelect(null);
    } else {
      setSelected(option);
      onSelect(option);
    }
    setIsOpen(false);
  };

  const updatedOptions = [{ label: '전체' }, ...options];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='text-md md:text-2lg flex w-full cursor-pointer items-center justify-center rounded-xl border border-green-100 px-4 py-2 font-medium whitespace-nowrap text-green-100 md:justify-between'
      >
        {selected ? selected.label : label}
        <span className='hidden md:block'>
          <Image src={arrowFilterDropdown} width={20} height={20} alt='필터' />
        </span>
      </button>

      {isOpen && (
        <ul className='absolute left-0 z-10 mt-1 w-full rounded-xl border border-gray-300 bg-white drop-shadow-sm'>
          {updatedOptions.map((option) => (
            <li
              key={option.label}
              onClick={() => handleSelect(option)}
              className={`text-md md:text-2lg h-[40px] cursor-pointer text-center leading-[40px] font-medium text-gray-900 hover:bg-gray-100 md:h-[62px] md:leading-[62px] ${
                option.label === '전체' ? 'rounded-t-xl' : ''
              } ${option.label === updatedOptions[updatedOptions.length - 1].label ? 'rounded-b-xl' : 'border-b border-gray-300'}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
