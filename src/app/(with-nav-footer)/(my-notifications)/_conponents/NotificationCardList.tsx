import NotificationDetails from './NotificationDetails';
import { MyNotifications } from '@/lib/types/myNotification';

type Props = {
  notifications: MyNotifications['notifications'];
};

export default function NotificationCardList({ notifications }: Props) {
  if (notifications.length === 0) {
    return <p className='text-sm text-gray-500'>알림이 없습니다</p>;
  }

  return (
    <div className='custom-scrollbar flex max-h-64 flex-col gap-2 overflow-y-auto rounded-[5px]'>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {notifications.map((n) => (
        <NotificationDetails key={n.id} content={n.content} createdAt={n.createdAt} />
      ))}
    </div>
  );
}
