'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ActivityForm from '../../_components/ActivityForm';
import { useCreateActivity } from '@/lib/hooks/useActivities';
import { CreateActivityParams } from '@/lib/types/activities';

export default function CreateActivityPage() {
  const router = useRouter();
  const { mutate: createActivity, isPending } = useCreateActivity();

  const handleSubmit = (data: CreateActivityParams) => {
    createActivity(data, {
      onSuccess: () => {
        toast.success('체험이 등록되었습니다!');
        window.location.href = '/my-activities';
      },
      onError: () => {
        toast.error('체험 등록에 실패했습니다.');
      },
    });
  };

  return <ActivityForm mode='create' isSubmitting={isPending} onSubmit={handleSubmit} />;
}
