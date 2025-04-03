import { useEffect, useMemo } from 'react';
import { useMyData } from '@/lib/hooks/useUsers';
import { useMyActivities } from '@/lib/hooks/useMyActivities';
import { useProfileImage } from '@/lib/contexts/ProfileImageContext';

export function useProfileInit() {
  const { data: user } = useMyData();
  const { data: activity } = useMyActivities();
  const { setProfileImageUrl } = useProfileImage();

  useEffect(() => {
    if (user?.profileImageUrl) {
      setProfileImageUrl(user.profileImageUrl);
    }
  }, [user, setProfileImageUrl]);

  const activityId = useMemo(() => activity?.activities?.[0]?.id, [activity?.activities]);

  return activityId;
}
