import FilterDropdown from '@/components/FilterDropdown';
import arrowFilterDropdown2 from '@/assets/icons/arrow-filter-dropdown2.svg';

type FilterDropdownOption = {
  label: string;
  value?: string | number;
  onClick?: () => void;
};

type ReservationDetailsProps = {
  formattedDate: string;
  options: FilterDropdownOption[];
  selectedSchedule: FilterDropdownOption | null;
  handleSelect: (option: FilterDropdownOption | null) => void;
};

export default function ReservationsTimeSelect({
  formattedDate,
  options,
  selectedSchedule,
  handleSelect,
}: ReservationDetailsProps) {
  return (
    <div className='text-black-100'>
      <div className='mb-4 text-[20px] font-semibold'>예약 날짜</div>
      <div className='mb-1 text-[20px] leading-[32px] font-normal'>{formattedDate}</div>
      <FilterDropdown
        options={options}
        onSelect={handleSelect}
        label='시간대 선택'
        icon={arrowFilterDropdown2}
        selected={selectedSchedule || { label: '시작시간 ~ 종료시간', value: '' }}
        value={selectedSchedule?.label}
        buttonClassName='w-full rounded-[4px] h-[56px] border border-gray-800 py-2 px-4 bg-white'
        optionClassName='border-gray-800 p-3'
        dropdownClassName='w-full border rounded-[4px] border-gray-800 overflow-y-auto overflow-x-auto bg-white'
      />
    </div>
  );
}
