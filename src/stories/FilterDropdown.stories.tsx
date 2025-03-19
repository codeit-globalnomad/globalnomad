import { Meta, StoryObj } from '@storybook/react';
import FilterDropdown from '@/components/FilterDropdown';
import { Pretendard } from '@/font';

const meta: Meta<typeof FilterDropdown> = {
  title: 'FilterDropdown',
  component: FilterDropdown,
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
type Story = StoryObj<typeof FilterDropdown>;

const sortOptions = [{ label: '가격 낮은 순' }, { label: '가격 높은 순' }];

const statusOptions = [
  { label: '예약 신청' },
  { label: '예약 취소' },
  { label: '예약 승인' },
  { label: '예약 거절' },
  { label: '체험 완료' },
];

export const StatusFilter: Story = {
  args: {
    label: '필터',
    options: statusOptions,
    onSelect: (option) => console.log(`선택된 상태 필터: ${option ? option.label : '전체'}`),
    className: 'h-[53px] w-[90px] md:w-[160px]',
  },
};

export const SortFilter: Story = {
  args: {
    label: '가격',
    options: sortOptions,
    onSelect: (option) => console.log(`선택된 가격 정렬: ${option ? option.label : '전체'}`),
    className: 'h-[53px] w-[100px] md:w-[145px]',
  },
};
