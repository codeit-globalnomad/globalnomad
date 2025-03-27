'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ActivityLocation from './ActivityLocation';

type LocationSectionProps = {
  address: string;
};

export default function LocationSection({ address }: LocationSectionProps) {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const getCoordinatesFromAddress = async (address: string) => {
    if (!process.env.NEXT_PUBLIC_KAKAO_REST_KEY) return;

    const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_KEY}`,
      },
    });

    const data = await response.json();
    const { x, y } = data.documents[0] || {};
    if (x && y) {
      setLatitude(parseFloat(y));
      setLongitude(parseFloat(x));
    } else {
      toast.error('주소를 찾을 수 없습니다.');
    }
  };

  useEffect(() => {
    if (address) {
      getCoordinatesFromAddress(address);
    }
  }, [address]);

  return (
    <div id='location'>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <div className='flex flex-col gap-3'>
        <h3 className='text-xl font-bold md:text-[22px]'>위치 안내</h3>
        <ActivityLocation address={address} latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
}
