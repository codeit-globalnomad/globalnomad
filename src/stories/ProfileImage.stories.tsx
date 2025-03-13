import type { Meta, StoryObj } from '@storybook/react';
import ProfileImage from '@/components/ProfileImage';
import profileDefault from '@/assets/icons/profile-default.svg';

const meta: Meta<typeof ProfileImage> = {
  title: 'ProfileImage',
  component: ProfileImage,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileImage>;

export const Default: Story = {
  args: {
    src: profileDefault,
    size: 'medium',
    onClick: undefined,
  },
};

export const Clickable: Story = {
  args: {
    src: profileDefault,
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    src: profileDefault,
    size: 'small',
    onClick: undefined,
  },
};

export const Large: Story = {
  args: {
    src: profileDefault,
    size: 'large',
    onClick: undefined,
  },
};
