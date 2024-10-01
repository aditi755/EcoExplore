'use client';

import { useState } from 'react';

export default function ItineraryForm() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    preferences: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to API, update state, etc.)
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Create Your Eco-Itinerary</h2>
      <div className="mb-4">
        <label htmlFor="destination" className="block mb-2 text-black">Destination</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black" 
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block mb-2 text-black">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block mb-2 text-black">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="preferences" className="block mb-2 text-black">Preferences</label>
        <textarea
          id="preferences"
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          rows="4"
        ></textarea>
      </div>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full md:w-auto">
        Generate Itinerary
      </button>
    </form>
  );
}