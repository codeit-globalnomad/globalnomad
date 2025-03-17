import type { Meta, StoryObj } from '@storybook/react';
import { Pretendard } from '@/font';
import Button from '@/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'outline'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '로그인 하기',
    variant: 'default',
    disabled: false,
    className: 'px-[138px] py-[11px]',
  },
};

export const Outline: Story = {
  args: {
    children: '로그인 하기',
    variant: 'outline',
    disabled: false,
    className: 'px-[138px] py-[11px]',
  },
};

export const Disabled: Story = {
  args: {
    children: '수정 완료',
    variant: 'default',
    disabled: true,
    className: 'px-[24px] py-[11px]',
  },
};

export const Custom: Story = {
  args: {
    children: '검색하기',
    className: 'rounded-sm px-[20px] py-[15px] md:px-[90px] md:py-[15px]',
    variant: 'default',
    disabled: false,
  },
};
