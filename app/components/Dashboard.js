'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import OverviewCards from './OverviewCards';
import TravelAI from './TravelAI';
import ItineraryForm from './ItineraryForm';
import TravelGraph from './TravelGraph';
import AccommodationAnalysis from './AccommodationAnalysis';
import TransportationAnalysis from './TransportationAnalysis';

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <button 
          className="md:hidden mb-4 bg-green-500 text-white p-2 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
        </button>
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-black">Hi, Eco Explorer 👋</h1>
        <TravelAI />
        {activeTab === 'overview' && (
          <>
            <OverviewCards />
            <TravelGraph />
          </>
        )}
        {activeTab === 'itinerary' && <ItineraryForm />}
        {activeTab === 'accommodation' && <AccommodationAnalysis />}
        {activeTab === 'transportation' && <TransportationAnalysis />}
      </main>
    </div>
  );
}