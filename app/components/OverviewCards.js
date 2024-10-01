export default function OverviewCards() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        <Card title="Total Carbon Saved" value="500 kg" icon="🌳" />
        <Card title="Sustainable Stays" value="5" icon="🏡" />
        <Card title="Eco-Friendly Trips" value="3" icon="🚲" />
      </div>
    );
  }
  
  function Card({ title, value, icon }) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="text-3xl md:text-4xl mb-2 md:mb-4">{icon}</div>
        <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-black">{title}</h3>
        <p className="text-2xl md:text-3xl font-bold text-green-600">{value}</p>
      </div>
    );
  }