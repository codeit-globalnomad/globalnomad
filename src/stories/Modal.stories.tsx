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
    fullScreen: true,
    className: '',
  },
  decorators: [
    (Story, { args }) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          {isOpen ? (
            <Story
              args={{
                ...args,
                onClose: () => setIsOpen(false),
                className: `${args.className} ${args.fullScreen ? 'h-full w-full' : ''}`,
              }}
            />
          ) : (
            <div className='flex gap-4'>
              <Button type='button' variant='default' onClick={() => setIsOpen(true)} className='px-[20px] py-[10px]'>
                모달 열기
              </Button>
            </div>
          )}
        </>
      );
    },
  ],
};
