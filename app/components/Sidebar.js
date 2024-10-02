'use client';

import Link from 'next/link';

export default function Sidebar({ activeTab, isSidebarOpen, setIsSidebarOpen }) {
  const tabs = [
    { name: 'Overview', icon: '📊', id: 'overview' },
    { name: 'Itinerary', icon: '🗺️', id: 'itinerary' },
    { name: 'Accommodation', icon: '🏨', id: 'accommodation' },
    { name: 'Transportation', icon: '🚆', id: 'transportation' },
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
          <Link
            key={tab.id}
            href={`/dashboard/${tab.id}`}
            onClick={() => setIsSidebarOpen(false)}
            className={`block w-full text-left py-2 px-4 rounded mb-2 ${
              activeTab === tab.id ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            {tab.icon} {tab.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}