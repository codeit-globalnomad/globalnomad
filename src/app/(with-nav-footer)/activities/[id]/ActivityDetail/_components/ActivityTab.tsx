interface ActivityTabProps {
  tabs: { label: string; targetId: string }[];
  currentTab: string;
  onTabClick: (targetId: string) => void;
}

export default function ActivityTab({ tabs, currentTab, onTabClick }: ActivityTabProps) {
  const handleTabClick = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onTabClick(targetId);
  };

  return (
    <div className='align-center flex h-[46px] justify-around border-b-1 border-b-gray-400 md:h-[50px] md:pt-0'>
      {tabs.map((tab) => (
        <button
          key={tab.targetId}
          onClick={() => handleTabClick(tab.targetId)}
          className={`md:text-2lg w-1/3 cursor-pointer pt-[2px] text-[17px] ${
            currentTab === tab.targetId ? 'border-b-2 border-gray-900 font-bold' : 'text-gray-700'
          }`}
          aria-label='탭 메뉴'
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
