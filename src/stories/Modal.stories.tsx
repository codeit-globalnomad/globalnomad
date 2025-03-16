import Button from '@/components/Buttons';
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
              <Button size='save' onClick={() => setIsOpen(true)} className='!bg-green-100'>
                모달 열기
              </Button>

              <Button
                size='save'
                onClick={() => {
                  setIsOpen(true);
                  setIsFullScreen(true);
                }}
              >
                전체 화면용 모달 열기
              </Button>
            </div>
          )}
        </>
      );
    },
  ],
};
