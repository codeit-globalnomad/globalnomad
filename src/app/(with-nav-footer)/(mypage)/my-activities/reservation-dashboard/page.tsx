import Empty from '@/components/Empty';

export default function NotActivitiesPage() {
  return (
    <>
      <h1 className='flex items-center text-2xl leading-[42px] font-bold'>예약 현황</h1>
      <Empty>아직 등록한 체험이 없어요.</Empty>
    </>
  );
}
