import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';
import { useState } from 'react';

const InputVariants = cva(
  'border border-gray-800 bg-white w-full text-black-100 placeholder-gray-500 rounded-lg py-4 px-5 font-normal text-base leading-[26px]',
  {
    variants: {
      variant: {
        default: '',
        event: '',
      },
      disabled: {
        true: 'bg-gray-200 text-gray-600',
      },
    },

    defaultVariants: {
      variant: 'default',
      disabled: false,
    },
  },
);

interface InputProps extends VariantProps<typeof InputVariants> {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
  disabled?: boolean;
}

export default function Input({
  variant,
  disabled = false,
  id,
  label,
  type = 'text',
  placeholder = '',
  onChange,
  className,
  value,
}: InputProps) {
  const finalClassName = cn(InputVariants({ variant, disabled }), className);
  const isEvent = variant === 'event';
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value !== '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) onChange(e);
  };

  return (
    <div className='relative flex flex-col gap-[8px]'>
      <label
        htmlFor={id}
        className={cn(
          'font-norma text-black-100 inline-block cursor-pointer bg-clip-text text-base leading-[26px]',
          isEvent &&
            'absolute top-1/2 z-10 -translate-y-1/2 transform px-5 text-gray-500 transition-all duration-200 ease-in-out',
          (isFocused || value) && isEvent && 'top-1/2 -translate-y-10 transform text-[14px]',
          className,
        )}
      >
        <span className={disabled && isEvent ? 'bg-gray-200' : 'bg-white'}>{label}</span>
      </label>
      <input
        id={id}
        type={type}
        onChange={handleChange}
        placeholder={isEvent ? '' : placeholder}
        disabled={disabled}
        className={finalClassName}
        value={value}
        onFocus={isEvent ? handleFocus : undefined}
        onBlur={isEvent ? handleBlur : undefined}
      />
    </div>
  );
}
