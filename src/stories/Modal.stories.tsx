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
  },
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <>
          {isOpen && (
            <Story
              args={{
                setModal: () => setIsOpen(false),
              }}
            />
          )}
          {!isOpen && (
            <Button size='save' onClick={() => setIsOpen(true)} className='!bg-green-100'>
              모달 제목
            </Button>
          )}
        </>
      );
    },
  ],
};
