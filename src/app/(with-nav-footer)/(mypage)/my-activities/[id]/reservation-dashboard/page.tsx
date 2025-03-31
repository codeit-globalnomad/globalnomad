import axiosServerHelper from '@/lib/network/axiosServerHelper';
import { MyActivitiesResponse, ReservationDashboardResponse } from '@/lib/types/myActivities';
import MyActivityFilter from '../reservation-dashboard/_components/MyActivityFilter';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ year?: string; month?: string }>;
};

export default async function ReservationDashboard({ params, searchParams }: Props) {
  const today = new Date();
  const NowYear = String(today.getFullYear());
  const NowMonth = String((today.getMonth() + 1).toString().padStart(2, '0'));

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const activityId = resolvedParams?.id ? Number(resolvedParams.id) : null;
  if (!activityId || isNaN(activityId)) {
    throw new Error('🚨 activityId가 유효하지 않습니다. API 요청을 중단합니다.');
  }

  const year = resolvedSearchParams.year || NowYear;
  const month = resolvedSearchParams.month || NowMonth;

  const { data: myActivityData } = await axiosServerHelper<MyActivitiesResponse>(`/my-activities`);
  const { data: myActivityMonthData } = await axiosServerHelper<ReservationDashboardResponse>(
    `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
  );

  return <MyActivityFilter activity={myActivityData} monthData={myActivityMonthData} />;
}
