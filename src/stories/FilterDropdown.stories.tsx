import { Meta, StoryObj } from '@storybook/react';
import FilterDropdown from '@/components/FilterDropdown';
import { Pretendard } from '@/font';
import arrowFilterDropdown from '@/assets/icons/arrow-filter-dropdown.svg';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';

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

const categoryOptions = [
  { label: '문화 · 예술', onClick: () => {} },
  { label: '식음료', onClick: () => {} },
  { label: '스포츠', onClick: () => {} },
  { label: '투어', onClick: () => {} },
  { label: '관광', onClick: () => {} },
  { label: '웰빙', onClick: () => {} },
];

const myActivityOptions = [
  { label: '체험명1', onClick: () => {} },
  { label: '체험명2', onClick: () => {} },
  { label: '체험명3', onClick: () => {} },
];

export const StatusFilter: Story = {
  args: {
    label: '필터',
    options: statusOptions,
    onSelect: (option) => console.log(`선택된 상태 필터: ${option ? option.label : '전체'}`),
    icon: arrowFilterDropdown,
    buttonClassName:
      'rounded-xl md:w-[160px] w-[90px] h-[53px] border border-green-100 px-4 py-2 font-medium whitespace-nowrap text-green-100 md:justify-between',
    dropdownClassName: 'rounded-xl w-[90px] md:w-[160px] border border-gray-300 bg-white drop-shadow-sm',
    optionClassName: 'text-md md:text-lg h-[41px] md:h-[62px] leading-[41px] md:leading-[62px]',
  },
};

export const SortFilter: Story = {
  args: {
    label: '가격',
    options: sortOptions,
    onSelect: (option) => console.log(`선택된 가격 정렬: ${option ? option.label : '전체'}`),
    icon: arrowFilterDropdown,
    buttonClassName:
      'w-[90px] md:w-[120px] h-[53px] rounded-xl border border-green-100 px-4 py-2 font-medium whitespace-nowrap text-green-100 md:justify-between',
    dropdownClassName: 'w-[90px] rounded-xl border md:w-[120px] border-gray-300 bg-white drop-shadow-sm',
    optionClassName: 'text-md md:text-lg w-[90px] h-[41px] md:w-[120px] leading-[41px] md:h-[58px] md:leading-[58px]',
  },
};

export const CategoryFilter: Story = {
  args: {
    label: '카테고리',
    options: categoryOptions,
    onSelect: (option) => console.log(`선택된 카테고리 정렬: ${option ? option.label : '전체'}`),
    icon: arrowFilterDropdown2,
    buttonClassName:
      'border lg:w-[792px] w-[343px] md:w-[429px] text-black-100 border-gray-800 rounded-lg md:justify-between px-[15px] py-[15px]',
    dropdownClassName: 'rounded-xl lg:w-[792px] w-[343px] md:w-[429px] border border-gray-300 bg-white drop-shadow-sm',
    optionClassName:
      'text-md md:text-lg h-[41px] lg:w-[792px] w-[343px] md:w-[429px] leading-[41px] md:h-[58px] md:leading-[58px]',
    includeAllOption: false,
    iconVisibleOnMobile: false,
  },
};

export const MyActivityFilter: Story = {
  args: {
    label: '체험명',
    options: myActivityOptions,
    onSelect: (option) => console.log(`선택된 내 체험 정렬: ${option ? option.label : '전체'}`),
    icon: arrowFilterDropdown2,
    buttonClassName:
      'h-[56px] lg:w-[792px] md:w-[429px] border text-black-100 w-[342px] border-gray-800 rounded-lg md:justify-between px-[15px] py-[12px] md:w-[429px] md:h-[56px] md:px-[15px] md:py-[15px]',
    dropdownClassName:
      'rounded-xl lg:w-[140px] md:w-[429px] lg:w-[792px]  w-[342px] border border-gray-300 bg-white drop-shadow-sm max-h-[200px] overflow-x-hidden overflow-y-auto',
    optionClassName:
      'text-md md:text-lg w-[342px] md:w-[429px] lg:w-[792px]  lg:w-[140px] h-[40px] leading-[40px] md:h-[50px] md:leading-[50px]',
    includeAllOption: false,
    iconVisibleOnMobile: false,
    autoSelectFirstOption: true,
  },
};
