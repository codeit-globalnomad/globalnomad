import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import { Navigation, Keyboard, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import leftArrow from '@/assets/icons/left-arrow.svg';
import starRating from '@/assets/icons/star-rating.svg';
import { useActivities } from '@/lib/hooks/useActivities';
import { GetActivitiesParams } from '@/lib/types/activities';

interface ActivityBannerProps {
  category: string;
  currentActivityId: number;
}

interface Banner {
  id: number;
  imageUrl: string;
  alt: string;
  title: string;
  rating: number;
  price: number;
  reviewCount: number;
}

export default function ActivityBanner({ category, currentActivityId }: ActivityBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBanners, setSelectedBanners] = useState<Banner[]>([]);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const params: GetActivitiesParams = {
    method: 'offset',
    category: category,
  };

  const { data } = useActivities(params);

  useEffect(() => {
    if (data?.activities) {
      const banners = data.activities.map((activity) => ({
        id: activity.id,
        imageUrl: activity.bannerImageUrl,
        alt: activity.title || '추천 체험 이미지',
        title: activity.title,
        rating: activity.rating,
        price: activity.price,
        reviewCount: activity.reviewCount,
      }));

      const filteredBanners = banners.filter((banner) => banner.id !== currentActivityId);
      const randomBanners = filteredBanners.sort(() => Math.random() - 0.5).slice(0, 3);
      setSelectedBanners(randomBanners);
    }
  }, [data, currentActivityId]);

  const handleSlideChange = (swiper: SwiperInstance) => {
    setCurrentIndex(swiper.realIndex);
  };

  if (selectedBanners.length === 0) {
    return <div>추천 체험 배너가 없습니다.</div>;
  }

  return (
    <>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <div className='relative flex items-center justify-between'>
        <h3 className='text-xl font-bold'>{category} 추천 체험</h3>
        <div className='z-10 flex cursor-pointer'>
          <div className={`custom-prev ${currentIndex === 0 ? 'pointer-events-none opacity-50' : ''}`}>
            <Image src={leftArrow} width={32} height={32} alt='이전 화살표 아이콘' />
          </div>
          <div
            className={`custom-next ${currentIndex === selectedBanners.length - 1 ? 'pointer-events-none opacity-50' : ''}`}
          >
            <Image src={leftArrow} width={32} height={32} alt='다음 화살표 아이콘' className='scale-x-[-1] transform' />
          </div>
        </div>
      </div>
      <div className='relative mt-3 h-[180px] w-full overflow-hidden rounded-[12px] bg-gray-50 lg:h-[140px]'>
        <Swiper
          modules={[Navigation, Keyboard, Mousewheel]}
          spaceBetween={10}
          slidesPerView={1}
          loop={false}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          keyboard={{
            enabled: true,
          }}
          mousewheel={{
            enabled: true,
          }}
          onSlideChange={handleSlideChange}
          className='h-full'
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {selectedBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Link href={`/activities/${banner.id}`} className='relative w-full'>
                <div className='relative h-full w-full'>
                  <Image
                    src={banner.imageUrl}
                    alt={banner.alt}
                    fill
                    sizes='(max-width: 768px) 100vw, 768px'
                    className='object-cover object-center'
                    priority={false}
                  />
                </div>
                <div className='absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-60'></div>
                <div className='absolute right-0 bottom-0 left-0 flex h-full w-full justify-between bg-gradient-to-t from-black to-transparent px-10'>
                  <div className='flex h-full w-full flex-col items-baseline justify-center gap-2 text-white lg:mt-[10px] lg:flex-row lg:items-center lg:justify-between lg:gap-0'>
                    <div className='w-full lg:mt-[-20px] lg:w-[80%]'>
                      <div className='flex items-center gap-1'>
                        <Image src={starRating} width={14} height={14} alt='별점 아이콘' />
                        <span className='text-md'>
                          {banner.rating}({banner.reviewCount})
                        </span>
                      </div>
                      <h4 className='w-full overflow-hidden text-2xl font-bold text-ellipsis whitespace-nowrap text-white md:text-2xl lg:text-2xl'>
                        {banner.title}
                      </h4>
                    </div>
                    <div className='text-md text-white'>
                      <span className='text-2lg font-bold lg:text-xl'>
                        ₩ {new Intl.NumberFormat().format(banner.price)}
                      </span>
                      &nbsp;
                      <span className='opacity-50'>/ 인</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
