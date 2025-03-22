import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { cn } from '@/lib/cn';

type FloatingLabelInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, className, ...props }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div className='relative w-full'>
        <input
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            `peer flex h-14 w-full justify-center rounded-md border pl-13 text-lg placeholder-transparent focus:ring-2 focus:outline-none`,
            value ? 'border-gray-400 focus:ring-green-100' : 'border-gray-300 focus:ring-gray-200',
            className,
          )}
          placeholder={label}
          {...props}
        />
        <label
          className={cn(
            `pointer-events-none absolute top-3 left-3 translate-x-10 pr-2 pl-2 text-lg text-gray-400 transition-all duration-200`,
            value || props.placeholder ? '-translate-y-6 bg-white text-[16px] text-gray-600' : 'text-lg',
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);

FloatingLabelInput.displayName = 'FloatingLabelInput';

export default FloatingLabelInput;
