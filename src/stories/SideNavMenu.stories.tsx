import type { Meta, StoryObj } from '@storybook/react';
import SideNavMenu from '@/components/SideNavMenu';
import { Pretendard } from '@/font';

// Storybook 메타데이터 설정
const meta: Meta<typeof SideNavMenu> = {
  title: 'SideNavMenu',
  component: SideNavMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={Pretendard.className}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SideNavMenu>;

// 기본 스토리 (반응형 사이즈는 화면크기 줄여서 테스트)
export const Default: Story = {
  render: () => <SideNavMenu />,
};
