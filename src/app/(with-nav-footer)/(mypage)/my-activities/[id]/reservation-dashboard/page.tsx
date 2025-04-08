import axiosServerHelper from '@/lib/network/axiosServerHelper';
import { MyActivitiesResponse, ReservationDashboardResponse } from '@/lib/types/myActivities';
import MyReservation from './MyReservation';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

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
    redirect('/my-activities/reservation-dashboard');
  }

  const year = resolvedSearchParams.year || NowYear;
  const month = resolvedSearchParams.month || NowMonth;

  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken')?.value;

  if (!accessToken) {
    redirect('/login');
  }

  try {
    const { data: myActivityData } = await axiosServerHelper<MyActivitiesResponse>(`/my-activities`);
    const { data: myActivityMonthData } = await axiosServerHelper<ReservationDashboardResponse>(
      `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
    );

    return <MyReservation activity={myActivityData} monthData={myActivityMonthData} />;
  } catch (error: unknown) {
    if (error instanceof Error) {
      redirect('/login');
    }
  }
}
