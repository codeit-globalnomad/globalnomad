'use client';
import Button from '@/components/Buttons';
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
        <Button size='save' variant='default' onClick={onHandleModalStatus}>
          모달 띄우기
        </Button>
      </div>
      {modalStatus && (
        <Modal title='모달' onClose={onHandleModalStatus} fullScreen>
          <button onClick={onHandleModalStatus}>닫기</button>
        </Modal>
      )}
    </>
  );
}
