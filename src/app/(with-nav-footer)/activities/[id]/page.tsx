import { notFound } from 'next/navigation';
import { safeResponse } from '@/lib/network/safeResponse';
import axiosServerHelper from '@/lib/network/axiosServerHelper';
import { Activity, activityDetailSchema } from '@/lib/types/activities';
import ActivityDetailPage from './ActivityDetail';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (isNaN(Number(id))) notFound();

  try {
    const response = await axiosServerHelper<Activity>(`/activities/${id}`);
    const activityDetail = safeResponse(response.data, activityDetailSchema);

    if (!activityDetail) {
      notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    return {
      title: `${activityDetail.title} | GlobalNomad`,
      description: activityDetail.description,
      openGraph: {
        type: 'website',
        title: `${activityDetail.title} | GlobalNomad`,
        description: activityDetail.description,
        url: `${baseUrl}/activity/${id}`,
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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (isNaN(Number(id))) notFound();

  return <ActivityDetailPage id={Number(id)} />;
}
