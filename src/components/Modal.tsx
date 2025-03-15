'use client';
import React, { useEffect } from 'react';

interface ModalProps {
  title?: string;
  setModal: () => void;
  children?: React.ReactNode;
  fullScreen?: boolean;
}

const Modal = ({ title, setModal, children, fullScreen = false }: ModalProps) => {
  const preventOffModal = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      id='모달 외부'
      onClick={setModal}
      className='pointer-events-auto fixed inset-0 flex h-full w-full items-center justify-center bg-gray-500/50'
    >
      <div
        id='모달'
        onClick={preventOffModal}
        className={`rounded-md bg-white p-5 ${
          fullScreen
            ? 'h-full w-full md:h-[750px] md:w-[480px] lg:max-h-[750px] lg:w-[480px]'
            : 'max-h-[60%] w-[327px] max-w-[90vw] md:w-[540px] lg:w-[540px]'
        }`}
      >
        <div className='text-2xl text-black'>{title}</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
