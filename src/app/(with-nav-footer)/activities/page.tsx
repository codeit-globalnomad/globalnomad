import Banner from './_components/Banner';
import BestActivities from './_components/BestActivities';
import SearchBar from './_components/SearchBar';

export default function Page() {
  return (
    <>
      <Banner />
      <div className='absolute top-[250px] z-10 mb-[100px] w-full md:top-[560px]'>
        <SearchBar />
      </div>
      <div className='mt-[100px] md:mt-[158px]'>
        <BestActivities />
      </div>
    </>
  );
}
