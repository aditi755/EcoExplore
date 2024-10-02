import { useState, useCallback, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import AccommodationForm from './AccommodationForm';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AccommodationAnalysis() {
  const [accommodations, setAccommodations] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    // Load accommodations from localStorage on component mount
    const storedAccommodations = localStorage.getItem('accommodations');
    if (storedAccommodations) {
      setAccommodations(JSON.parse(storedAccommodations));
    }
  }, []);

  const analyzeAccommodations = useCallback(() => {
    if (accommodations.length === 0) {
      setAnalysis(null);
      return;
    }

    const totalNights = accommodations.reduce((sum, acc) => sum + acc.nights, 0);
    const accommodationTypes = ['Eco-lodge', 'Green Hotel', 'Sustainable Guesthouse', 'Other'];
    const data = accommodationTypes.map(type => ({
      name: type,
      value: accommodations
        .filter(acc => acc.type === type)
        .reduce((sum, acc) => sum + acc.nights, 0)
    }));

    const sustainableNights = data
      .filter(item => item.name !== 'Other')
      .reduce((sum, item) => sum + item.value, 0);
    const sustainabilityScore = (sustainableNights / totalNights) * 100;

    setAnalysis({
      data,
      sustainabilityScore: sustainabilityScore.toFixed(2),
      totalNights
    });
  }, [accommodations]);

  useEffect(() => {
    analyzeAccommodations();
    // Save accommodations to localStorage whenever they change
    localStorage.setItem('accommodations', JSON.stringify(accommodations));
  }, [accommodations, analyzeAccommodations]);

  const handleAddAccommodation = (newAccommodation) => {
    setAccommodations(prevAccommodations => [...prevAccommodations, newAccommodation]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Accommodation Analysis</h2>
      <AccommodationForm onSubmit={handleAddAccommodation} />
      {analysis ? (
        <>
          <p className="mb-4 text-black">
            You have stayed a total of {analysis.totalNights} nights, with a sustainability score of {analysis.sustainabilityScore}%.
          </p>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analysis.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analysis.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600">
            {analysis.sustainabilityScore >= 75
              ? "Great job! Your accommodation choices are highly sustainable."
              : analysis.sustainabilityScore >= 50
              ? "Good effort! You're making sustainable choices, but there's room for improvement."
              : "Consider choosing more eco-friendly accommodations to increase your sustainability score."}
          </p>
        </>
      ) : (
        <p className="text-black">Add your accommodations to see the analysis.</p>
      )}
    </div>
  );
}
