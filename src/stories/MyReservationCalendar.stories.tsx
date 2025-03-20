import type { Meta, StoryFn } from '@storybook/react';
import MyCalendar, { Props } from '@/app/(with-nav-footer)/(mypage)/my-reservations/_compontents/MyCalendar';

// mock data
const MyMonthReservationMockData = [
  {
    date: '2025-03-17',
    reservations: {
      completed: 6,
      confirmed: 0,
      pending: 0,
    },
  },
  {
    date: '2025-03-19',
    reservations: {
      completed: 3,
      confirmed: 0,
      pending: 0,
    },
  },
  {
    date: '2025-03-20',
    reservations: {
      completed: 1,
      confirmed: 5,
      pending: 2,
    },
  },
  {
    date: '2025-03-21',
    reservations: {
      completed: 0,
      confirmed: 4,
      pending: 0,
    },
  },
];

const meta: Meta<typeof MyCalendar> = {
  title: 'MyCalendar',
  component: MyCalendar,
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<Props> = (args) => <MyCalendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  monthTotalData: MyMonthReservationMockData,
};
