import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TransportationAnalysis() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [transportOptions, setTransportOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/transportation?from=${from}&to=${to}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transportation options');
      }
      const data = await response.json();
      setTransportOptions(data);
    } catch (error) {
      console.error('Error fetching transportation options:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Transportation Finder and Analysis</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From"
            className="p-2 border rounded text-black"
            required
          />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To"
            className="p-2 border rounded text-black"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search Transportation'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {transportOptions.length > 0 && (
        <>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transportOptions}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="co2Emissions" fill="#8884d8" name="CO2 Emissions (kg)" />
                <Bar yAxisId="right" dataKey="cost" fill="#82ca9d" name="Cost ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Transport Type</th>
                  <th className="px-6 py-3">CO2 Emissions (kg)</th>
                  <th className="px-6 py-3">Cost ($)</th>
                  <th className="px-6 py-3">Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {transportOptions.map((option, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{option.name}</td>
                    <td className="px-6 py-4">{option.co2Emissions}</td>
                    <td className="px-6 py-4">{option.cost}</td>
                    <td className="px-6 py-4">{option.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
