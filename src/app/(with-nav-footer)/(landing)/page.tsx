import MainBanner from './_components/MainBanner';
import MainSection from './_components/MainSection';

export default function Page() {
  return (
    <div className='mb-[50%] md:mb-[25%]'>
      <MainBanner />
      <MainSection />
    </div>
  );
}
