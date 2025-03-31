import Button from '@/components/Button';
import MyActivities from './_components/MyActivities';

export default function Page() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>내 체험 관리</h2>
        <Button className='px-[16px] py-[10px] text-lg font-bold'>체험 등록하기</Button>
      </div>
      <div className='mt-[24px] mb-[40%]'>
        <MyActivities />
      </div>
    </>
  );
}
