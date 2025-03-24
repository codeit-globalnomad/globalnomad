export default function ActivityBanner() {
  // const [category, setCategory] = useState<string | null>(null);
  // const [emoji, setEmoji] = useState<string | null>(null);

  return (
    <>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <h3 className='text-xl font-bold'>
        {/* {emoji} {category ? `${category} 추천 체험` : '로딩 중...'} */}
        카테고리 추천 체험
      </h3>
      <div className='h-[140px] w-full rounded-[12px] bg-gray-50'>배너</div>
    </>
  );
}
