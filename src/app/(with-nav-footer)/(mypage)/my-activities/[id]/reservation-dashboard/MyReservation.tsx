'use client';

import { MyActivitiesResponse, ReservationDashboardResponse } from '@/lib/types/myActivities';
import MyActivityFilter from '../_compontents/MyActivityFilter';

type Props = {
  activity: MyActivitiesResponse;
  monthData: ReservationDashboardResponse;
};

export default function MyReservation({ activity, monthData }: Props) {
  return (
    <div>
      <MyActivityFilter activity={activity} monthData={monthData} />
    </div>
  );
}
