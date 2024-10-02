import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AccommodationAnalysis() {
  // This data should come from your backend or state management
  const accommodationData = [
    { name: 'Eco-lodges', value: 30 },
    { name: 'Green Hotels', value: 45 },
    { name: 'Sustainable Guesthouses', value: 15 },
    { name: 'Other', value: 10 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Accommodation Analysis</h2>
      <p className="mb-4 text-black">
        You have made great choices in sustainable accommodations! 75% of your stays were in eco-friendly options.
      </p>
      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height
        ="100%">
          <PieChart>
            <Pie
              data={accommodationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {accommodationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-600">
        Eco-lodges and green hotels make up the majority of your stays, significantly reducing your environmental impact.
        Consider trying more sustainable guesthouses on your next trip to support local communities.
      </p>
    </div>
  );
}
