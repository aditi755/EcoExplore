'use client';

export default function Sidebar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  const tabs = [
    { name: 'Overview', icon: '📊', id: 'overview' },
    { name: 'Itinerary', icon: '🗺️', id: 'itinerary' },
    { name: 'Accommodations', icon: '🏨', id: 'accommodations' },
    { name: 'Transport', icon: '🚆', id: 'transport' },
    { name: 'Carbon Footprint', icon: '🌱', id: 'carbon' },
  ];

  return (
    <aside className={`
      ${isSidebarOpen ? 'block' : 'hidden'} 
      md:block 
      w-full md:w-64 
      bg-green-600 
      text-white 
      p-6 
      fixed 
      md:relative 
      h-full 
      z-10
    `}>
      <div className="text-2xl font-bold mb-8">EcoExplore</div>
      <nav>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setIsSidebarOpen(false);
            }}
            className={`w-full text-left py-2 px-4 rounded mb-2 ${
              activeTab === tab.id ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}