'use client';

import { InputHTMLAttributes, LabelHTMLAttributes, PropsWithChildren, Ref, useId } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

export type Field = {
  label?: string;
  error?: string;
};

export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export function Item({ children }: PropsWithChildren) {
  return <div className='grid gap-1'>{children}</div>;
}

export function Label({
  required,
  children,
  className,
  ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }>) {
  return (
    <label className={cn('text-black-100 inline-flex items-center gap-1 text-lg font-medium', className)} {...props}>
      {children}
      {required && <span className='flex items-center pt-1.5 text-lg font-thin text-red-500'>*</span>}
    </label>
  );
}

export function Error({ children }: PropsWithChildren) {
  return <div className='mt-2 text-sm text-red-500'>{children}</div>;
}

export const fieldClassName = cva(
  'rounded-lg w-full px-4 h-11 lg:h-[64px] text-black-950 placeholder-blue-400 text-lg lg:text-xl focus-visible:outline-none read-only:text-blue-400',
  {
    variants: {
      variant: {
        default: 'bg-background-100',
        outlined: 'border border-blue-300 bg-transparent',
      },
    },
  },
);

export const ERROR_CLASSNAME = 'border border-error';

export type InputProps = Field &
  InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof fieldClassName> & {
    ref?: Ref<HTMLInputElement>;
  };

export default function Input({ label, error, className, ref, ...props }: InputProps) {
  const id = useId();

  return (
    <Item>
      {label && (
        <Label required={props.required} htmlFor={id}>
          {label}
        </Label>
      )}
      <input
        id={id}
        className={cn(
          'mt-2 w-full rounded-md border p-3 focus:ring-2 focus:outline-none',
          error ? 'border-red-500 focus:ring-red-500' : 'border-green-100 focus:ring-green-100',
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <Error>{error}</Error>}
    </Item>
  );
}
