'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import marker from '@/assets/icons/marker.svg';

type LocationProps = {
  address: string;
  latitude: number;
  longitude: number;
};

export default function ActivityLocation({ address, latitude, longitude }: LocationProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const kakao = window.kakao;

      kakao.maps.load(() => {
        const container = mapContainerRef.current;
        if (!container) return;

        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 1,
        };
        const map = new kakao.maps.Map(container, options);

        const destinationCoords = new kakao.maps.LatLng(latitude, longitude);

        new kakao.maps.Marker({
          map: map,
          position: destinationCoords,
          title: '체험 장소',
        });

        map.setCenter(destinationCoords);

        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('주소를 복사하였습니다.');
    } catch {
      toast.error('주소를 복사하지 못했습니다.');
    }
  };

  const openMap = () => {
    const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent(address)}`;
    window.open(kakaoMapUrl, '_blank');
  };

  return (
    <>
      <div className='h-[300px] rounded-[12px] md:h-[310px] lg:h-[450px]' ref={mapContainerRef}></div>
      <div className='flex items-baseline justify-between'>
        <div className='md:text-2lg flex items-center gap-1'>
          <Image src={marker} alt='지도 마커 아이콘' />
          <span className='font-regular block w-full gap-1 truncate text-lg whitespace-nowrap opacity-75'>
            {address}
          </span>
          &nbsp;
          <button className='mr-2 flex-none cursor-pointer text-lg text-green-100 underline' onClick={handleCopy}>
            복사
          </button>
        </div>
        <button
          className='flex-none cursor-pointer rounded-md bg-green-100 px-4 py-2 text-[15px] text-white'
          onClick={openMap}
        >
          카카오맵에서 보기
        </button>
      </div>
    </>
  );
}
