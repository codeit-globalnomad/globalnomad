import { notFound } from 'next/navigation';
import axiosServerHelper from '@/lib/network/axiosServerHelper';
import { safeResponse } from '@/lib/network/safeResponse';
import { Activity, activityDetailSchema } from '@/lib/types/activities';
import ActivityPage from './ActivityPage';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  try {
    const response = await axiosServerHelper<Activity>(`/activities/${id}`);
    const activityDetail = safeResponse(response.data, activityDetailSchema);

    if (!activityDetail) {
      return notFound();
    }
    return <ActivityPage activityDetail={activityDetail} />;
  } catch {
    return notFound();
  }
}
