import Image from 'next/image';
import banner from '@/assets/images/banner.jpg';

export default function Banner() {
  return (
    <section aria-label='글로벌 요리 체험 배너' className='relative h-[240px] w-full md:h-[550px]'>
      <Image src={banner} alt='셰프와 함께하는 요리 체험 배너' fill className='object-cover' />
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent/100' />
      <div className='absolute inset-0 z-10 mx-auto my-[70px] max-w-[1200px] px-6 text-white md:my-[160px]'>
        <h2 className='text-2xl font-bold md:text-[54px] md:leading-[60px]'>
          셰프와 함께하는
          <br /> 글로벌 요리 체험
        </h2>
        <p className='text-md my-[8px] font-semibold md:my-[20px] md:text-xl'>이달의 인기 체험 BEST 🔥</p>
      </div>
    </section>
  );
}
