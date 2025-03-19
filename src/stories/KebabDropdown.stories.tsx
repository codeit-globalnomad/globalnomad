import { Meta, StoryObj } from '@storybook/react';
import KebabDropdown from '@/components/KebabDropdown';
import Image from 'next/image';
import dropdown from '@/assets/icons/dropdown.svg';
import profileDefault from '@/assets/icons/profile-default.svg';
import { Pretendard } from '@/font';

const meta: Meta<typeof KebabDropdown> = {
  title: 'KebabDropdown',
  component: KebabDropdown,
  decorators: [
    (Story) => (
      <div className={Pretendard.className}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KebabDropdown>;

const options1 = [{ label: '수정하기' }, { label: '삭제하기' }];
const options2 = [{ label: '마이 페이지', onClick: () => console.log('마이 페이지 클릭됨') }, { label: '로그아웃' }];

export const EditDeleteDropdown: Story = {
  args: {
    trigger: <Image src={dropdown} alt='케밥 아이콘' className='h-6 w-6' />,
    options: options1,
    onSelect: (option) => console.log(`선택된 옵션: ${option.label}`),
  },
};

export const ProfileDropdown: Story = {
  args: {
    trigger: <Image src={profileDefault} alt='프로필 이미지' className='h-8 w-8 rounded-full' />,
    options: options2,
    onSelect: (option) => console.log(`선택된 옵션: ${option.label}`),
  },
};
