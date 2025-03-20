import Image from 'next/image';
import Link from 'next/link';
import facebook from '@/assets/sns/facebook.svg';
import twitter from '@/assets/sns/twitter.svg';
import youtube from '@/assets/sns/youtube.svg';
import instagram from '@/assets/sns/instagram.svg';

export default function Footer() {
  return (
    <div className='bg-black-200 mt-[40%] h-[160px] w-full'>
      <div className='grid w-full max-w-[1200px] grid-cols-3 grid-rows-1 px-5 py-[32px] max-[520px]:grid-cols-2 md:w-full md:grid-cols-3 md:px-5 lg:mx-auto lg:grid-cols-3'>
        <p className='cursor-default justify-self-start text-gray-800'>©codeit - 2023</p>
        <div className='flex gap-[30px] justify-self-center max-[520px]:justify-self-end md:justify-self-center lg:justify-self-center'>
          <Link href={'/privacypolicy'} className='whitespace-nowrap text-gray-800'>
            Privacy Policy
          </Link>
          <Link href={'/faq'} className='text-gray-800'>
            FAQ
          </Link>
        </div>
        <div className='flex items-center justify-center gap-[12px] justify-self-end max-[520px]:col-span-2 max-[520px]:my-[10px]'>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
            <Image src={facebook} width={20} height={20} alt='페이스북' className='hover:opacity-80' />
          </a>
          <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
            <Image src={twitter} width={20} height={20} alt='트위터' className='hover:opacity-80' />
          </a>
          <a href='https://www.youtube.com' target='_blank' rel='noopener noreferrer'>
            <Image src={youtube} width={20} height={20} alt='유튜브' className='hover:opacity-80' />
          </a>
          <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
            <Image src={instagram} width={20} height={20} alt='인스타그램' className='hover:opacity-80' />
          </a>
        </div>
      </div>
    </div>
  );
}
