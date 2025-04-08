'use client';
import Image, { StaticImageData } from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import profileDefault from '@/assets/icons/profile-default.svg';

const profileImageVariants = cva('relative rounded-full', {
  variants: {
    size: {
      small: 'w-[32px] h-[32px]',
      medium: 'w-[45px] h-[45px]',
      large: 'w-[160px] h-[160px]',
    },
    clickable: {
      true: 'cursor-pointer hover:brightness-80',
      false: 'cursor-default',
    },
  },
  defaultVariants: {
    size: 'medium',
    clickable: false,
  },
});

interface ProfileImageProps extends VariantProps<typeof profileImageVariants> {
  src?: StaticImageData | string | null;
  className?: string;
  clickable?: boolean;
}

export default function ProfileImage({ src, size, clickable, className }: ProfileImageProps) {
  return (
    <div className={cn(profileImageVariants({ size, clickable }), className)}>
      <Image
        className='rounded-full object-cover'
        src={src?.toString().trim() ? src : profileDefault}
        alt='프로필 이미지'
        fill
        sizes='(max-width: 768px) 32px, (max-width: 1024px) 45px, 160px'
      />
    </div>
  );
}
