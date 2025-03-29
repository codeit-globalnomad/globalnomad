'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import bed from '@/assets/icons/bed.svg';
import FloatingLabelInput from './FloatingLabelInput';

export default function SearchBar({ onSearch, searchTerm }: { onSearch(term: string): void; searchTerm: string }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSearchClick = () => onSearch(inputValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch(inputValue);
  };

  return (
    <div className='w-full min-w-[375px] px-4 md:px-6'>
      <div className='mx-auto h-[129px] w-full max-w-[1200px] min-w-[343px] justify-center rounded-2xl bg-white drop-shadow-md md:h-[184px]'>
        <div className='px-[24px] py-[16px] md:py-[32px]'>
          <div className='text-black-100 text-lg font-bold md:text-xl'>무엇을 체험하고 싶으신가요?</div>
          <div className='relative mt-[15px] flex items-center gap-[12px] md:mt-[32px]'>
            <div className='relative flex-grow'>
              <FloatingLabelInput
                id='search'
                label='내가 원하는 체험은'
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyDown={handleKeyDown}
              />
              <Image src={bed} width={24} height={24} alt='침대' className='absolute top-[16px] left-[12px]' />
            </div>
            <Button
              className='px-[20px] py-[15px] whitespace-nowrap md:px-[40px] md:py-[15px]'
              onClick={handleSearchClick}
              type='submit'
            >
              검색하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
