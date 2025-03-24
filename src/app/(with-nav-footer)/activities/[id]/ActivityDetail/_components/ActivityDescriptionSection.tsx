import { useRef } from 'react';
import ActivityDescription from './ActivityDescription';

export default function DescriptionSection() {
  const descriptionRef = useRef<HTMLDivElement>(null);
  return (
    <div id='description' ref={descriptionRef}>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <ActivityDescription />
    </div>
  );
}
