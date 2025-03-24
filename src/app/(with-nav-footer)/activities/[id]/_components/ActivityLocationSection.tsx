import { useRef } from 'react';
import ActivityLocation from './ActivityLocation';

export default function LocationSection() {
  const locationRef = useRef<HTMLDivElement>(null);
  return (
    <div id='location' ref={locationRef}>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <div className='flex flex-col gap-3'>
        <h3 className='text-2lg font-bold md:text-xl'>위치 안내</h3>
        <ActivityLocation />
      </div>
    </div>
  );
}
