import { useState } from 'react';

export default function AccommodationForm({ onSubmit }) {
  const [accommodation, setAccommodation] = useState('');
  const [nights, setNights] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ type: accommodation, nights: parseInt(nights) });
    setAccommodation('');
    setNights(1);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={accommodation}
          onChange={(e) => setAccommodation(e.target.value)}
          className="p-2 border rounded text-black"
          required
        >
          <option value="">Select Accommodation Type</option>
          <option value="Eco-lodge">Eco-lodge</option>
          <option value="Green Hotel">Green Hotel</option>
          <option value="Sustainable Guesthouse">Sustainable Guesthouse</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          value={nights}
          onChange={(e) => setNights(e.target.value)}
          min="1"
          className="p-2 border rounded text-black"
          placeholder="Number of nights"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Add Stay
        </button>
      </div>
    </form>
  );
}
