import type { Meta, StoryObj } from '@storybook/react';
import { Pretendard } from '@/font';
import Input from '@/components/Input';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'event'] },
    type: { control: 'radio', options: ['email', 'password', 'text'] },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
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
    variant: 'default',
    id: 'nickname',
    label: '닉네임',
    placeholder: '닉네임을 입력해 주세요',
    type: 'text',
    onChange: action('changed'),
  },
};

export const Event: Story = {
  args: {
    variant: 'event',
    id: 'activities',
    label: '내가 원하는 체험은',
    type: 'text',
    className: 'h-[56px] w-[400px] py-[14px] pl-[48px]',

    onChange: action('changed'),
  },
  render: (args) => {
    const ActivitiesSearchInput = () => {
      const [value, setValue] = useState('');

      return (
        <Input
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange(e);
          }}
        />
      );
    };

    return <ActivitiesSearchInput />;
  },
};

export const PasswordType: Story = {
  args: {
    variant: 'default',
    id: 'newPassword',
    label: '새 비밀번호',
    placeholder: '새 비밀번호를 한번 더 입력해주세요',
    type: 'newPassword',
    onChange: action('changed'),
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    label: '이메일',
    value: 'test@email.com',
    type: 'email',
    disabled: true,
    onChange: action('changed'),
  },
};

export const Custom: Story = {
  args: {
    variant: 'event',
    id: 'email',
    label: '이메일',
    type: 'email',
    className: 'h-[56px] w-[400px] py-[14px] pl-[48px]',
    onChange: action('changed'),
  },
  render: (args) => {
    const ActivitiesSearchInput = () => {
      const [value, setValue] = useState('');

      return (
        <Input
          {...args}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            args.onChange(e);
          }}
        />
      );
    };

    return <ActivitiesSearchInput />;
  },
};
