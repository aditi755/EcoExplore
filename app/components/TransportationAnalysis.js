import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TransportationAnalysis() {
  // This data should come from your backend or state management
  const transportationData = [
    { name: 'Train', CO2: 50, distance: 1000 },
    { name: 'Bus', CO2: 30, distance: 500 },
    { name: 'Electric Car', CO2: 20, distance: 300 },
    { name: 'Bicycle', CO2: 0, distance: 100 },
    { name: 'Walking', CO2: 0, distance: 50 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Transportation Analysis</h2>
      <p className="mb-4 text-black">
        Great job on sustainable travel! You have saved approximately 500kg of CO2 by choosing eco-friendly transportation options.
      </p>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={transportationData}
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
            <Bar yAxisId="left" dataKey="CO2" fill="#8884d8" name="CO2 Emissions (kg)" />
            <Bar yAxisId="right" dataKey="distance" fill="#82ca9d" name="Distance Traveled (km)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-600">
        Your choice of trains and buses for longer distances has significantly reduced your carbon footprint.
        Keep up the great work by continuing to choose low-emission options like bicycles and walking for short trips.
      </p>
    </div>
  );
}
