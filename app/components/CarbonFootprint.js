import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Dummy data
const dummyData = [
  { name: 'Accommodation', value: 250 },
  { name: 'Transportation', value: 400 },
  { name: 'Trips', value: 150 },
];

export default function CarbonFootprint() {
  const [carbonData, setCarbonData] = useState(dummyData);
  const [totalFootprint, setTotalFootprint] = useState(0);

  useEffect(() => {
    // Calculate total footprint from dummy data
    const total = dummyData.reduce((sum, item) => sum + item.value, 0);
    setTotalFootprint(total);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Carbon Footprint Analysis</h2>
      <p className="text-lg mb-4">Total Carbon Footprint: {totalFootprint.toFixed(2)} kg CO2</p>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={carbonData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {carbonData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Breakdown:</h3>
        <ul className="list-disc pl-5">
          {carbonData.map((item, index) => (
            <li key={index} className="text-black">
              {item.name}: {item.value.toFixed(2)} kg CO2
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Tips to Reduce Your Carbon Footprint:</h3>
        <ul className="list-disc pl-5">
          <li>Choose eco-friendly accommodations</li>
          <li>Opt for public transportation or electric vehicles</li>
          <li>Plan trips that minimize air travel</li>
          <li>Support local, sustainable tourism initiatives</li>
        </ul>
      </div>
    </div>
  );
}
