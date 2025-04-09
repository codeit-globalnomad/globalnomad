'use client';

import { toast } from 'react-toastify';
import ActivityForm from '../../_components/ActivityForm';
import { useCreateActivity } from '@/lib/hooks/useActivities';
import { CreateActivityParams } from '@/lib/types/activities';

export default function CreateActivityPage() {
  const { mutate: createActivity, isPending } = useCreateActivity();

  const handleSubmit = (data: CreateActivityParams) => {
    createActivity(data, {
      onSuccess: () => {
        toast.success('체험이 등록되었습니다!');
        setTimeout(() => {
          window.location.href = '/my-activities';
        }, 2000);
      },
      onError: () => {
        toast.error('체험 등록에 실패했습니다.');
      },
    });
  };

  return <ActivityForm mode='create' isSubmitting={isPending} onSubmit={handleSubmit} />;
}
