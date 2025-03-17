'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonVariants = cva('cursor-pointer transition-all duration-200 flex items-center justify-center', {
  variants: {
    variant: {
      default: 'rounded-md bg-green-100 font-bold text-lg text-white hover:bg-black-200',
      outline:
        'rounded-md border border-black-200 font-bold text-lg text-black-200 hover:bg-black-200 hover:text-white',
    },
    disabled: {
      true: 'bg-gray-600 text-white cursor-default hover:bg-gray-600 hover:text-white',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    disabled: false,
  },
});

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  type = 'button',
  children,
  onClick,
  disabled = false,
  className,
  variant,
}: ButtonProps) {
  const finalClassName = cn(buttonVariants({ variant, disabled }), className || '');

  return (
    <button type={type} onClick={!disabled ? onClick : undefined} disabled={disabled} className={finalClassName}>
      {children}
    </button>
  );
}
