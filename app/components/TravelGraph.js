'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', carbonSaved: 20 },
  { month: 'Feb', carbonSaved: 40 },
  { month: 'Mar', carbonSaved: 30 },
  { month: 'Apr', carbonSaved: 70 },
  { month: 'May', carbonSaved: 50 },
  { month: 'Jun', carbonSaved: 90 },
];

export default function TravelGraph() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Your Carbon Savings</h2>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="carbonSaved" stroke="#22c55e" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}