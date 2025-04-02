'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/Button';
import Image, { StaticImageData } from 'next/image';
import section1Lg from '@/assets/images/section1-lg.jpg';
import section2Lg from '@/assets/images/section2-lg.jpg';
import section3Lg from '@/assets/images/section3-lg.jpg';
import section1Md from '@/assets/images/section1-md.jpg';
import section2Md from '@/assets/images/section2-md.jpg';
import section3Md from '@/assets/images/section3-md.jpg';

const MotionImage = motion.create(Image);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ese: 'easeOut' } },
};

const Card = ({
  image,
  index,
  width,
  height,
}: {
  image: StaticImageData;
  index: number;
  width: number;
  height: number;
}) => (
  <motion.div
    initial='hidden'
    whileInView='visible'
    whileHover={{ scale: 1.05 }}
    viewport={{ once: true, amount: 0.2 }}
    variants={cardVariants}
    className={`${index > 0 ? 'mt-[150px]' : ''}`}
  >
    <div className={`relative overflow-hidden rounded-3xl shadow-xl`} style={{ width, height }}>
      <div className='animate-glow absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent' />
      <MotionImage
        src={image}
        alt={`랜딩 페이지 섹션 카드 ${index + 1}`}
        width={width}
        height={height}
        className='object-cover'
      />
    </div>
  </motion.div>
);

export default function MainSection() {
  const router = useRouter();

  return (
    <div className='mx-auto mt-[150px] w-full max-w-[340px] md:mt-[210px] md:max-w-[700px]'>
      <div className='hidden md:block'>
        {[section1Lg, section2Lg, section3Lg].map((image, index) => (
          <Card key={index} image={image} index={index} width={700} height={320} />
        ))}
      </div>

      <div className='md:hidden'>
        {[section1Md, section2Md, section3Md].map((image, index) => (
          <Card key={index} image={image} index={index} width={340} height={420} />
        ))}
      </div>
      <Button
        onClick={() => router.push('/activities')}
        className='md:text-2lg mx-auto mt-[120px] px-[90px] py-[8px] text-lg font-semibold transition-none md:top-[300px] md:mt-[160px] md:px-[132px] md:py-[13px]'
        aria-label='체험 목록 페이지로 이동'
      >
        지금 예약하기
      </Button>
    </div>
  );
}
