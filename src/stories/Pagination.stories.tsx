import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '@/components/Pagination';

import type { PaginationProps } from '@/components/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

// 상태를 관리하는 Template 생성 (useState, useEffect 추가)
const Template = (args: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage); // ✅ 내부 상태 추가

  // 외부 `args.currentPage` 값이 변경되면 `currentPage`도 업데이트
  useEffect(() => {
    setCurrentPage(args.currentPage);
  }, [args.currentPage]);

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onChange={(page) => {
        setCurrentPage(page); // 내부 상태 업데이트
        args.onChange?.(page); // 부모로 이벤트 전달
        console.log('페이지 이동: ', page);
      }}
    />
  );
};

// 기본 타입 (페이지네이션 기본 예시)
export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    currentPage: 3,
    totalPages: 10,
    size: 'medium',
  },
};

// 작은 사이즈 (sm)
export const SmallSize: Story = {
  render: (args) => <Template {...args} />,
  args: {
    currentPage: 3,
    totalPages: 10,
    size: 'small',
  },
};

// 여러 페이지 (페이지가 많은 경우 테스트)
export const ManyPages: Story = {
  render: (args) => <Template {...args} />,
  args: {
    currentPage: 7,
    totalPages: 20,
    size: 'medium',
  },
};

// 첫 페이지 (Prev 비활성화 확인용)
export const FirstPage: Story = {
  render: (args) => <Template {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    size: 'medium',
  },
};

// 마지막 페이지 (Next 비활성화 확인용)
export const LastPage: Story = {
  render: (args) => <Template {...args} />,
  args: {
    currentPage: 10,
    totalPages: 10,
    size: 'medium',
  },
};
