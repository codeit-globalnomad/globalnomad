import type { Meta, StoryObj } from '@storybook/react';
import { Pretendard } from '@/font';
import Header from '@/components/Header';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => {
      localStorage.removeItem('accessToken');
      return <Story />;
    },
  ],
};

export const LoggedIn: Story = {
  args: {},
  decorators: [
    (Story) => {
      localStorage.setItem('accessToken', 'testToken');
      const result = <Story />;
      return result;
    },
  ],
};
