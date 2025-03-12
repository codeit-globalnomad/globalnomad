// 우리가 새로 만들 랜딩페이지
// 밑에 있는 코드는 api 탬플릿 코드임 ,

// 'use client';

// import { useActivities } from '@/lib/hooks/useActivities';
// import Link from 'next/link';

// export default function LandingPage() {
//   const { data, isLoading, isError } = useActivities({
//     method: 'offset',
//     page: 1,
//     size: 10,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading activities</div>;

//   return (
//     <div>
//       <h1>Activities</h1>
//       <Link href='/login'>navigation</Link>
//       {data?.activities.map((activity) => (
//         <div key={activity.id} className='border-b py-4'>
//           <h2 className='text-lg font-semibold'>{activity.title}</h2>
//           <p>{activity.description}</p>
//           <p className='text-sm text-gray-500'>Category: {activity.category}</p>
//           <p className='text-sm text-gray-500'>Price: ${activity.price}</p>
//           <p className='text-sm text-gray-500'>
//             Rating: {activity.rating} ({activity.reviewCount} reviews)
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

export default function Page() {
  return <p>랜딩 페이지입니다.</p>;
}
