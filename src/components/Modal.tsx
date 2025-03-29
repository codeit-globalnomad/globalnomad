'use client';

import { useClickOutside } from '@/lib/utils/useClickOutside';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
  fullScreen?: boolean;
  className?: string;
}

const Modal = ({ title, onClose, children, fullScreen = false, className = '' }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      id='모달 외부'
      className='pointer-events-auto fixed inset-0 z-100 flex h-full w-full items-center justify-center bg-gray-500/50'
    >
      <div
        id='모달'
        ref={modalRef}
        className={`rounded-md bg-white p-6 shadow-lg ${fullScreen ? 'h-full w-full' : ''} ${className}`}
      >
        {title && <div className='text-2xl text-black'>{title}</div>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
