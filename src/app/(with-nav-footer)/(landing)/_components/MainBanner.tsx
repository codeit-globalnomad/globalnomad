'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Image from 'next/image';
import banner from '@/assets/images/banner.jpg';
import logoXlWhite from '@/assets/logo/logo-xl-white.svg';
import logoMdWhite from '@/assets/logo/logo-md-white.svg';

const MotionImage = motion.create(Image);

export default function MainBanner() {
  const router = useRouter();

  return (
    <div className='relative h-[240px] w-full overflow-hidden md:h-[550px]'>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className='absolute inset-0'
      >
        <MotionImage src={banner} alt='랜딩 페이지 배너' fill className='object-cover' />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className='absolute inset-0 bg-gradient-to-r from-green-400 via-green-300/30 to-transparent'
      />
      <div className='absolute left-1/2 z-10 h-[240px] w-full max-w-[1200px] -translate-x-1/2 px-6 max-[1250px]:px-6 min-[1251px]:px-0 md:h-[550px]'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className='absolute top-[160px] right-10 hidden lg:block'
        >
          <MotionImage
            src={logoXlWhite}
            alt='배너 로고'
            width={360}
            height={203}
            style={{ width: 'auto', height: 'auto', filter: 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.4))' }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className='absolute top-[60px] md:top-[150px] lg:hidden'
        >
          <MotionImage
            src={logoMdWhite}
            alt='배너 로고'
            className='h-[19px] w-[109px] md:h-[25px] md:w-[147px]'
            style={{ filter: 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.4))' }}
          />
        </motion.div>
        <motion.h1
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className='text-2lg absolute top-[90px] overflow-hidden leading-snug font-semibold whitespace-nowrap text-white md:top-1/3 md:text-3xl md:font-bold'
        >
          다채로운 체험을 간편하게 예약하고
          <br />
          잊지 못할 추억을 만들어 보세요!
        </motion.h1>
        <Button
          onClick={() => router.push('/activities')}
          className='md:text-2lg text-black-200 absolute top-[150px] bg-white px-[90px] py-[8px] text-lg font-semibold transition-none hover:text-white md:top-[300px] md:px-[132px] md:py-[13px]'
          aria-label='체험 목록 페이지로 이동'
        >
          지금 예약하기
        </Button>
      </div>
    </div>
  );
}
