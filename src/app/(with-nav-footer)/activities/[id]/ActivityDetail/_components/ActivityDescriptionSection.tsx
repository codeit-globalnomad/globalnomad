import { useRef } from 'react';
import ActivityDescription from './ActivityDescription';

type ActivityDescriptionSectionProps = {
  description: string;
};

export default function DescriptionSection({ description }: ActivityDescriptionSectionProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  return (
    <div id='description' ref={descriptionRef}>
      <div className='pt-[46px] md:pt-[50px]'></div>
      <ActivityDescription description={description} />
    </div>
  );
}
