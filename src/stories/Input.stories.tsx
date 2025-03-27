import type { Meta, StoryObj } from '@storybook/react';
import Input from '@/components/Input';
import { Pretendard } from '@/font';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
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

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    variant: 'default',
  },
};

export const ErrorState: Story = {
  args: {
    label: '이메일',
    error: '이메일 형식이 잘못되었습니다.',
    placeholder: '이메일을 입력하세요',
    variant: 'default',
  },
};

export const Disabled: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    disabled: true,
    variant: 'default',
  },
};

export const Required: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    required: true,
    variant: 'default',
    className: 'bg-gray-200',
  },
};

export const Outlined: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력하세요',
    variant: 'outlined',
  },
};
