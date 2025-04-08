'use client';

import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: { oncomplete: (data: DaumPostcodeData) => void }) => { open(): void };
    };
  }
}

interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}

interface AddressFindProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function AddressFind({ value, onChange, error }: AddressFindProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePostcode = () => {
    if (typeof window === 'undefined' || !isLoaded || !window.daum?.Postcode) {
      alert('주소 검색 스크립트가 아직 로드되지 않았습니다.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data: DaumPostcodeData) {
        const addr = data.address;
        onChange(addr);
      },
    }).open();
  };

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (!document.getElementById('daum-postcode-script')) {
      const script = document.createElement('script');
      script.id = 'daum-postcode-script';
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className='flex items-end gap-2'>
      <div className='flex-1'>
        <Input
          label='주소'
          placeholder='주소를 검색해주세요'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          error={error}
          readOnly
          required
          className='bg-white'
        />
      </div>
      <Button
        type='button'
        onClick={handlePostcode}
        className='text-md roundedpx-5 cursor-pointer px-6 leading-[48px] text-white'
        disabled={!isLoaded}
      >
        검색
      </Button>
    </div>
  );
}
