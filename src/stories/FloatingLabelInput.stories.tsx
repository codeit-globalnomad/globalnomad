import type { Meta, StoryObj } from '@storybook/react';
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { Pretendard } from '@/font';

const meta: Meta<typeof FloatingLabelInput> = {
  title: 'FloatingLabelInput',
  component: FloatingLabelInput,
  tags: ['autodocs'],
  args: {
    label: '라벨',
    placeholder: '입력하세요',
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
type Story = StoryObj<typeof FloatingLabelInput>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: '내가 원하는 체험',
  },
};
