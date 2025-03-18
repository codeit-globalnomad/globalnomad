import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { Pretendard } from '@/font';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={Pretendard.className}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: '모달 제목',
    children: <p>모달 내용입니다.</p>,
    fullScreen: false,
  },
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(false);
      const [isFullScreen, setIsFullScreen] = useState(false);

      return (
        <>
          {isOpen ? (
            <Story
              args={{
                onClose: () => setIsOpen(false),
                fullScreen: isFullScreen,
              }}
            />
          ) : (
            <div className='flex gap-4'>
              <Button type='button' variant='default' onClick={() => setIsOpen(true)} className='px-[20px] py-[10px]'>
                모달열기
              </Button>
              <Button
                type='button'
                variant='default'
                onClick={() => {
                  setIsOpen(true);
                  setIsFullScreen(true);
                }}
                className='px-[20px] py-[10px]'
              >
                전체화면모달열기
              </Button>
            </div>
          )}
        </>
      );
    },
  ],
};
