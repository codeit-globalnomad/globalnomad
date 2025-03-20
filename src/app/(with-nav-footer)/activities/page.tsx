import Banner from './_components/Banner';
import SearchBar from './_components/SearchBar';

export default function Page() {
  return (
    <>
      <Banner />
      <div className='absolute top-[250px] z-10 mx-auto mb-[100px] w-full md:top-[560px]'>
        <SearchBar />
      </div>
      <div className='mt-[158px]'></div>
    </>
  );
}
