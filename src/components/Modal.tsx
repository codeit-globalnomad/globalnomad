'use client';
import React, { useEffect } from 'react';

interface ModalProps {
  title?: string;
  setModal: () => void;
  children?: React.ReactNode;
}

const Modal = ({ title, setModal, children }: ModalProps) => {
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
      className='fixed inset-0 flex h-full w-full items-center justify-center bg-gray-500/50'
    >
      <div id='모달' onClick={preventOffModal} className='w-1/2 rounded-md bg-white p-5'>
        <div className='text-2xl text-black'>{title}</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
