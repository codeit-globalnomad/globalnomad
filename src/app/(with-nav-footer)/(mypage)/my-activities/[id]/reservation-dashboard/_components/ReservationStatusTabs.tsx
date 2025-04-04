type ReservationStatus = 'pending' | 'confirmed' | 'declined';

type Props = {
  activeTab: ReservationStatus | null;
  setActiveTab: (status: ReservationStatus) => void;
  count: {
    pending: number;
    confirmed: number;
    declined: number;
  };
};

export default function ReservationStatusTabs({ activeTab, setActiveTab, count }: Props) {
  return (
    <section className='flex items-center gap-5 border-b border-b-gray-300 bg-white text-[20px] leading-[32px] font-normal text-gray-900'>
      <button
        className={`cursor-pointer ${activeTab === 'pending' ? 'pm-[6px] border-b-[4px] border-green-100 text-[20px] leading-[32px] font-semibold text-green-100' : ''}`}
        onClick={() => setActiveTab('pending')}
      >
        신청 {count.pending}
      </button>
      <button
        className={`cursor-pointer ${activeTab === 'confirmed' ? 'pm-[6px] border-b-[4px] border-green-100 text-[20px] leading-[32px] font-semibold text-green-100' : ''}`}
        onClick={() => setActiveTab('confirmed')}
      >
        승인 {count.confirmed}
      </button>
      <button
        className={`cursor-pointer ${activeTab === 'declined' ? 'pm-[6px] border-b-[4px] border-green-100 text-[20px] leading-[32px] font-semibold text-green-100' : ''}`}
        onClick={() => setActiveTab('declined')}
      >
        거절 {count.declined}
      </button>
    </section>
  );
}
