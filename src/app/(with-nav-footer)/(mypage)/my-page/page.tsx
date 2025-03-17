'use client';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import React, { useState } from 'react';

export default function Page() {
  const [modalStatus, setModalStatus] = useState(false);

  const onHandleModalStatus = () => {
    setModalStatus(!modalStatus);
  };

  return (
    <>
      <div>
        <Button text='모달 띄우기' variant='default' onClick={onHandleModalStatus} />
      </div>
      {modalStatus && (
        <Modal title='모달' onClose={onHandleModalStatus} fullScreen>
          <button onClick={onHandleModalStatus}>닫기</button>
        </Modal>
      )}
    </>
  );
}
