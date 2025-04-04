export default function BestActivitiesBannerSkeleton() {
  return (
    <section className='relative h-[240px] w-full animate-pulse md:h-[550px]'>
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent/100' />
      <div className='absolute inset-0 z-10 mx-auto my-[70px] max-w-[1200px] px-6 text-white md:my-[160px]'>
        <div className='mb-2 h-[64px] w-1/2 animate-pulse rounded bg-gray-400 md:h-[120px] md:w-1/3'></div>
        <div className='my-[8px] h-[24px] w-1/5 animate-pulse rounded bg-gray-400 md:my-[20px] md:h-[32px]'></div>
      </div>
    </section>
  );
}
