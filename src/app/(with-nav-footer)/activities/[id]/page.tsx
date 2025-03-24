import { notFound } from 'next/navigation';
import axiosServerHelper from '@/lib/network/axiosServerHelper';
import { safeResponse } from '@/lib/network/safeResponse';
import { Activity, activityDetailSchema } from '@/lib/types/activities';
import ActivityDetailPage from './ActivityDetail';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  try {
    const response = await axiosServerHelper<Activity>(`/activities/${id}`);
    const activityDetail = safeResponse(response.data, activityDetailSchema);

    if (!activityDetail) {
      return notFound();
    }
    return <ActivityDetailPage activityDetail={activityDetail} />;
  } catch {
    return notFound();
  }
}

// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const id = params.id;

//   return {
//     title: `체험 ${id} 상세`,
//     description: '체험에 대한 자세한 정보!',
//     openGraph: {
//       title: `체험 ${id} 상세`,
//       description: '체험에 대한 자세한 정보!',
//       url: `http://localhost:3000/activities/${id}`,
//       images: [
//         {
//           url: 'http://localhost:3000/thumbnail.jpg',
//           width: 800,
//           height: 600,
//         },
//       ],
//     },
//   };
// }
