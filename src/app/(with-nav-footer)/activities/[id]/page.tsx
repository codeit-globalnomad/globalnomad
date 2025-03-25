import { notFound } from 'next/navigation';
import { safeResponse } from '@/lib/network/safeResponse';
import axiosServerHelper from '@/lib/network/axiosServerHelper';
import { Activity, activityDetailSchema } from '@/lib/types/activities';
import ActivityDetailPage from './ActivityDetail';

export async function generateMetadata({ params }: { params: Promise<{ id: number }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const response = await axiosServerHelper<Activity>(`/activities/${id}`);
    const activityDetail = safeResponse(response.data, activityDetailSchema);

    if (!activityDetail) {
      notFound();
    }

    return {
      title: `${activityDetail.title} | GlobalNomad`,
      description: activityDetail.description,
      openGraph: {
        title: activityDetail.title,
        description: activityDetail.description,
        url: `http://localhost:3000/activity/${id}`,
        images: [
          {
            url: activityDetail.bannerImageUrl,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch {
    notFound();
  }
}

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <ActivityDetailPage id={id} />;
}
