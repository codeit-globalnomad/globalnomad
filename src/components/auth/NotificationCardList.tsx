import { useEffect, useRef, useState } from 'react';
import NotificationDetails from './NotificationDetails';
import { MyNotifications } from '@/lib/types/myNotification';
import { getMyNotifications } from '@/lib/apis/myNotifications';

type Props = {
  notifications: MyNotifications['notifications'];
  firstCursorId: number | undefined;
  isSmallScreen: boolean;
};

export default function NotificationCardList({ notifications, firstCursorId, isSmallScreen }: Props) {
  const cursorIdRef = useRef<number | undefined>(firstCursorId);
  const [currentNotifications, setCurrentNotifications] = useState(notifications);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchNotifications = async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    try {
      const data = await getMyNotifications({ cursorId: cursorIdRef.current, size: 3 });

      if (!data?.notifications?.length) {
        setHasMore(false);
        return;
      }

      setCurrentNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        return [...prev, ...data.notifications.filter((n) => !existingIds.has(n.id))];
      });

      cursorIdRef.current = data.notifications.at(-1)?.id;
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    cursorIdRef.current = firstCursorId;
    setCurrentNotifications(notifications);
    setHasMore(true);
  }, [notifications, firstCursorId]);

  useEffect(() => {
    if (!observerRef.current || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNotifications();
      },
      { rootMargin: '100px', threshold: 0.1 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, isFetching]);

  return (
    <div
      className={`${isSmallScreen ? 'max-h-[calc(100vh-120px)]' : 'max-h-[250px]'} custom-scrollbar overflow-y-auto rounded-[5px]`}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {currentNotifications.length > 0 ? (
        <div className='relative flex flex-col gap-2 transition-all duration-300'>
          {currentNotifications.map((n) => (
            <NotificationDetails
              key={n.id}
              id={n.id}
              content={n.content}
              createdAt={n.createdAt}
              onDelete={(id) => setCurrentNotifications((prev) => prev.filter((n) => n.id !== id))}
            />
          ))}
          {isFetching && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4'>
              <div className='spinner-border h-7 w-7 animate-spin rounded-full border-4 border-solid border-green-100 border-t-transparent'></div>
            </div>
          )}
          <div ref={hasMore ? observerRef : null} />
        </div>
      ) : (
        <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm text-gray-800'>
          알림이 없습니다
        </p>
      )}
    </div>
  );
}
