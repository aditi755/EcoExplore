'use client';

import { useState } from 'react';

export default function ItineraryForm() {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    duration: '',
    travelStyle: '',
    budget: '',
    interests: '',
    sustainabilityPreference: '',
  });
  const [travelPlan, setTravelPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setTravelPlan(data);
      } else {
        throw new Error(data.error || 'Failed to generate itinerary');
      }
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Create Your Eco-Itinerary</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="w-full p-2 border rounded text-black"
          required
        />
        <div className="flex space-x-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (days)"
          className="w-full p-2 border rounded text-black"
          required
        />
        <select
          name="travelStyle"
          value={formData.travelStyle}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="">Select Travel Style</option>
          <option value="adventure">Adventure</option>
          <option value="relaxation">Relaxation</option>
          <option value="cultural">Cultural</option>
          <option value="eco-friendly">Eco-Friendly</option>
        </select>
        <input
          type="text"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Budget (e.g., $1000)"
          className="w-full p-2 border rounded text-black"
          required
        />
        <textarea
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          placeholder="Interests (e.g., hiking, local cuisine, wildlife)"
          className="w-full p-2 border rounded text-black"
          rows="3"
        ></textarea>
        <select
          name="sustainabilityPreference"
          value={formData.sustainabilityPreference}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        >
          <option value="">Sustainability Preference</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      {travelPlan && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-black">Recommended Destinations:</h3>
          <div className="space-y-4">
            {travelPlan.recommendations && travelPlan.recommendations.map((rec, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded">
                <h4 className="font-bold text-lg text-green-700">{rec.destination}</h4>
                <p className="mb-2 text-black">{rec.description}</p>
                <p className="mb-2 text-black">Sustainability Score: {rec.sustainabilityScore}</p>
                <ul className="list-disc pl-5 text-black">
                  {rec.activities && rec.activities.map((activity, actIndex) => (
                    <li key={actIndex}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {travelPlan.itinerary && (
            <>
              <h3 className="text-xl font-bold my-4 text-black">Your Sustainable Itinerary:</h3>
              <div className="bg-gray-100 p-6 rounded text-black">
                <p className="mb-4">{travelPlan.itinerary.overview}</p>
                {travelPlan.itinerary.days && travelPlan.itinerary.days.map((day) => (
                  <div key={day.day} className="mb-4">
                    <h4 className="font-bold text-lg text-green-700">Day {day.day}:</h4>
                    <ul className="list-disc pl-5">
                      {day.activities && day.activities.map((activity, index) => (
                        <li key={index} className="mb-1">{activity}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}