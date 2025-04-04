'use client';

import ActivityForm from '../../../_components/ActivityForm';
import { useUpdateActivity } from '@/lib/hooks/useMyActivities';
import { useActivityDetail } from '@/lib/hooks/useActivities';
import { toast } from 'react-toastify';

export default function EditActivityPage({ activityId }: { activityId: number }) {
  const { data: activity } = useActivityDetail(activityId);
  const { mutate: updateActivity, isPending } = useUpdateActivity(activityId);

  if (!activity) return null;
  type CategoryType = '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';

  return (
    <ActivityForm
      mode='edit'
      defaultValues={activity}
      isSubmitting={isPending}
      onSubmit={(formData) => {
        const schedulesToAdd = formData.schedules.filter(
          (newSchedule) =>
            !activity.schedules.some(
              (existingSchedule) =>
                existingSchedule.date === newSchedule.date &&
                existingSchedule.startTime === newSchedule.startTime &&
                existingSchedule.endTime === newSchedule.endTime,
            ),
        );

        const transformedData = {
          activityId,
          data: {
            title: formData.title,
            category: formData.category as CategoryType,
            description: formData.description,
            price: formData.price,
            address: formData.address,
            bannerImageUrl: formData.bannerImageUrl,
            subImageUrlsToAdd: formData.subImageUrls || [],
            subImageIdsToRemove: [],
            schedulesToAdd,
            scheduleIdsToRemove: [],
          },
        };

        updateActivity(transformedData.data, {
          onSuccess: () => {
            toast.success('수정이 완료되었습니다!');
            window.location.href = '/my-activities';
          },
          onError: () => {
            toast.error('수정에 실패했습니다.');
          },
        });
      }}
    />
  );
}
