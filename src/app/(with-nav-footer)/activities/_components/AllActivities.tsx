'use client';

import { useState } from 'react';
import { useActivities } from '@/lib/hooks/useActivities';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import FilterDropdown from '@/components/FilterDropdown';
import Category from './Category';
import AllActivityItem from './AllActivityItem';
import Pagination from '@/components/Pagination';
import arrowFilterDropdown from '@/assets/icons/arrow-filter-dropdown.svg';

const SORT_OPTIONS = [
  { label: '가격 낮은 순', value: 'price_asc' },
  { label: '가격 높은 순', value: 'price_desc' },
];

export default function AllActivities() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedSort, setSelectedSort] = useState<'most_reviewed' | 'price_asc' | 'price_desc' | 'latest'>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  const isPC = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const itemsPerPage = isPC ? 8 : isTablet ? 9 : 4;

  const { data } = useActivities({
    method: 'offset',
    sort: selectedSort,
    page: currentPage,
    size: itemsPerPage,
    category: selectedCategory,
  });

  const handleSortChange = (option: { label: string } | null) => {
    if (option) {
      if (option.label === '가격 낮은 순') setSelectedSort('price_asc');
      else if (option.label === '가격 높은 순') setSelectedSort('price_desc');
      else setSelectedSort('latest');
    } else {
      setSelectedSort('latest');
    }
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | undefined) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className='mx-auto w-full max-w-[1200px] max-[1250px]:px-6 min-[1251px]:px-0'>
      <div className='flex justify-between gap-[24px]'>
        <div className='w-full min-w-[200px] overflow-visible md:w-full md:max-w-[760px] lg:w-full lg:max-w-[882px]'>
          <Category selectedCategory={selectedCategory} onSelect={handleCategoryChange} />
        </div>
        <FilterDropdown
          buttonClassName='w-[90px] md:w-[120px] h-[42px] md:h-[53px] rounded-xl border border-green-100 text-md md:text-lg px-3 py-2 font-medium whitespace-nowrap text-green-100 md:justify-between'
          dropdownClassName='w-[90px] rounded-xl border md:w-[120px] border-gray-300 bg-white drop-shadow-sm'
          optionClassName='text-md md:text-lg w-[90px] h-[41px] md:w-[120px] leading-[41px] md:h-[50px] md:leading-[50px]'
          label='가격'
          icon={arrowFilterDropdown}
          options={SORT_OPTIONS}
          iconVisibleOnMobile={true}
          includeAllOption={true}
          onSelect={handleSortChange}
          selected={SORT_OPTIONS.find((option) => option.value === selectedSort) || { label: '가격', value: 'latest' }}
          value={SORT_OPTIONS.find((option) => option.value === selectedSort)?.label}
        />
      </div>
      <section className='text-black-100 text-2lg mt-[35px] font-bold md:text-3xl'>🛼 모든 체험</section>
      <div
        className={`mt-[32px] grid max-h-[1024px] min-h-[715px] gap-x-[8px] gap-y-[20px] md:max-h-[1429px] md:gap-x-[16px] md:gap-y-[32px] lg:h-[922px] lg:gap-x-[24px] lg:gap-y-[48px] ${isPC ? 'grid-cols-4' : isTablet ? 'grid-cols-3' : 'grid-cols-2'}`}
      >
        {data?.activities?.map((activity) => <AllActivityItem key={activity.id} activity={activity} />)}
      </div>
      <div className='mt-[100px] flex justify-center'>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((data?.totalCount || 0) / itemsPerPage)}
          onChange={setCurrentPage}
          size={isPC || isTablet ? 'medium' : 'small'}
        />
      </div>
    </div>
  );
}
