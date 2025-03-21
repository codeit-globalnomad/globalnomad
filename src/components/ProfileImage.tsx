'use client';
import Image, { StaticImageData } from 'next/image';
import { SyntheticEvent } from 'react';
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
  src?: StaticImageData | string;
  onClick?: () => void;
}

export default function ProfileImage({ src, size, onClick }: ProfileImageProps) {
  const onErrorImage = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = profileDefault;
  };

  return (
    <div className={cn(profileImageVariants({ size, clickable: !!onClick }))} onClick={onClick}>
      <Image
        className='rounded-full object-cover'
        src={src || profileDefault}
        alt='프로필 이미지'
        onError={onErrorImage}
        fill
        priority
      />
    </div>
  );
}
