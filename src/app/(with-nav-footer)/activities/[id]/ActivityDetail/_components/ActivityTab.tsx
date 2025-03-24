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
    <div className='align-center flex h-[40px] justify-around border-b-1 border-b-gray-400 md:h-[50px]'>
      {tabs.map((tab) => (
        <button
          key={tab.targetId}
          onClick={() => handleTabClick(tab.targetId)}
          className={`md:text-2lg w-1/3 cursor-pointer text-lg ${
            currentTab === tab.targetId ? 'border-b-2 border-gray-900 font-bold' : 'text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
