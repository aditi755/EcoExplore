import { useState } from 'react';

export default function AccommodationForm({ onSubmit, onSearch }) {
  const [accommodationType, setAccommodationType] = useState('');
  const [location, setLocation] = useState('');
  const [nights, setNights] = useState(1);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ type: accommodationType, nights: parseInt(nights), location });
    resetForm();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await onSearch(accommodationType, location, nights);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching accommodations:', error);
    }
  };

  const resetForm = () => {
    setAccommodationType('');
    setLocation('');
    setNights(1);
    setSearchResults([]);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            value={accommodationType}
            onChange={(e) => setAccommodationType(e.target.value)}
            className="p-2 border rounded text-black"
            required
          >
            <option value="">Select Accommodation Type</option>
            <option value="Eco-lodge">Eco-lodge</option>
            <option value="Green Hotel">Green Hotel</option>
            <option value="Sustainable Guesthouse">Sustainable Guesthouse</option>
            <option value="Hostel">Hostel</option>
            <option value="Hotel">Hotel</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border rounded text-black"
            placeholder="Location"
            required
          />
          <input
            type="number"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            min="1"
            className="p-2 border rounded text-black"
            placeholder="Number of nights"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Search Accommodations
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
          <ul className="space-y-2">
            {searchResults.map((result, index) => (
              <li key={index} className="flex justify-between items-center text-black">
                <span>{result.name} - {result.address}</span>
                <button
                  onClick={() => {
                    onSubmit({ ...result, nights: parseInt(nights), type: accommodationType });
                    resetForm();
                  }}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                  Add Stay
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex justify-end">
          <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Add Custom Stay
          </button>
        </div>
      </form>
    </div>
  );
}
