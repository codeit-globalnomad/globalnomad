'use client';
import { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useClickOutside } from '@/lib/utils/useClickOutside';

interface FilterDropdownOption {
  label: string;
  value?: string | number;
  onClick?: () => void;
}

interface FilterDropdownProps {
  options: FilterDropdownOption[];
  onSelect: (option: FilterDropdownOption | null) => void;
  label: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  icon: StaticImageData;
  includeAllOption?: boolean;
  iconVisibleOnMobile?: boolean;
  autoSelectFirstOption?: boolean;
  selected?: FilterDropdownOption | null;
  value?: string;
}

export default function FilterDropdown({
  options,
  label,
  onSelect,
  value,
  buttonClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  icon,
  includeAllOption = false,
  iconVisibleOnMobile = false,
  autoSelectFirstOption = false,
}: FilterDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updatedOptions, setUpdatedOptions] = useState<FilterDropdownOption[]>([]);

  useClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    const newOptions = includeAllOption && !autoSelectFirstOption ? [{ label: '전체' }, ...options] : options;
    setUpdatedOptions(newOptions);
  }, [includeAllOption, autoSelectFirstOption, options]);

  const selectedOption = updatedOptions.find((opt) => opt.label === value) || null;

  const handleSelect = (option: FilterDropdownOption) => {
    onSelect(option.label === '전체' ? null : option);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className='relative'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`flex cursor-pointer items-center bg-white whitespace-nowrap ${
          selectedOption ? 'opacity-100' : 'text-gray-700'
        } ${iconVisibleOnMobile ? 'justify-center' : 'justify-between'} ${buttonClassName}`}
      >
        {selectedOption ? selectedOption.label : label}
        <Image
          src={icon}
          alt='필터 드롭다운 아이콘'
          className={`h-[20px] w-[20px] ${iconVisibleOnMobile ? 'hidden md:block' : 'block'}`}
        />
      </button>

      {isOpen && (
        <ul className={`absolute left-0 z-10 mt-1 ${dropdownClassName}`}>
          {updatedOptions.map((option, idx) => (
            <li
              key={`${option.label}-${idx}`}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer text-center hover:bg-gray-100 ${
                idx === 0 ? 'rounded-t-xl' : ''
              } ${idx === updatedOptions.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-300'} ${optionClassName}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
