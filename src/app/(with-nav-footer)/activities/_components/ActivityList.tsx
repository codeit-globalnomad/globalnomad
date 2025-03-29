'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActivities } from '@/lib/hooks/useActivities';
import useMediaQuery from '@/lib/utils/useMediaQuery';
import Image from 'next/image';
import BestActivities from './BestActivities';
import SearchBar from './SearchBar';
import AllActivities from './AllActivities';
import AllActivityItem from './AllActivityItem';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';
import leftArrow from '@/assets/icons/left-arrow.svg';
import empty from '@/assets/icons/empty.svg';

export default function ActivityList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const isPC = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const itemsPerPage = isPC ? 8 : isTablet ? 9 : 4;

  const { data, isLoading, isError } = useActivities({
    method: 'offset',
    keyword: searchTerm || undefined,
    page: currentPage,
    size: itemsPerPage,
  });

  const getEndingParticle = (keyword: string) => {
    const lastChar = keyword[keyword.length - 1];
    const lastCharCode = lastChar.charCodeAt(0);

    return (lastCharCode - 0xac00) % 28 === 0 ? '로' : '으로';
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
    router.push(`/activities?method=offset&keyword=${encodeURIComponent(searchTerm)}&page=1`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/activities?method=offset&keyword=${encodeURIComponent(searchTerm)}&page=${page}`);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    router.push('/activities');
  };

  useEffect(() => {
    const keyword = searchParams.get('keyword');
    const page = searchParams.get('page');

    if (keyword !== null) setSearchTerm(keyword);
    if (page !== null) setCurrentPage(Number(page));
  }, [searchParams]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <div className='absolute top-[250px] z-10 mb-[100px] w-full md:top-[560px]'>
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      </div>

      {searchTerm === '' ? (
        <div>
          <div className='mt-[100px] md:mt-[158px]'>
            <BestActivities />
          </div>
          <div className='mt-[60px] mb-[20%]'>
            <AllActivities />
          </div>
        </div>
      ) : (
        <div className='mx-auto mt-[100px] mb-[20%] w-full max-w-[1200px] px-6 max-[1250px]:px-6 min-[1251px]:px-0 md:mt-[158px]'>
          <div className='mb-[12px] flex items-center'>
            <button onClick={handleResetSearch} className='cursor-pointer'>
              <Image src={leftArrow} alt='이전 페이지' className='h-auto w-[24px] md:w-[44px]' />
            </button>
            <section className='text-black-100 text-2lg font-bold md:text-3xl'>
              {searchTerm}
              <span className='font-normal'>{searchTerm && getEndingParticle(searchTerm)} 검색한 결과입니다.</span>
            </section>
          </div>
          <p className='text-black-100 text-lg'>총 {data?.totalCount}개의 결과</p>

          {data?.activities.length === 0 ? (
            <div className='mx-auto mt-[100px] flex w-full max-w-[1200px] flex-col items-center justify-center'>
              <div className='relative h-[140px] w-[140px] md:h-[200px] md:w-[200px]'>
                <Image src={empty} fill alt='검색 결과 0개' className='absolute' />
              </div>
              <p className='text-2lg mt-[24px] font-medium text-gray-800'>검색 결과가 없습니다.</p>
            </div>
          ) : (
            <>
              <div
                className={`mt-[32px] grid max-h-[1024px] min-h-[715px] gap-x-[8px] gap-y-[20px] md:max-h-[1429px] md:gap-x-[16px] md:gap-y-[32px] lg:h-[922px] lg:gap-x-[24px] lg:gap-y-[48px] ${isPC ? 'grid-cols-4' : isTablet ? 'grid-cols-3' : 'grid-cols-2'}`}
              >
                {data?.activities.map((activity) => <AllActivityItem key={activity.id} activity={activity} />)}
              </div>
              <div className='mt-[100px] flex justify-center'>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil((data?.totalCount || 0) / itemsPerPage)}
                  onChange={handlePageChange}
                  size={isPC || isTablet ? 'md' : 'sm'}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
