import Dashboard from '../../components/Dashboard';

export default function DynamicDashboardPage() {
  return <Dashboard />;
}

export async function generateStaticParams() {
  return [
    { id: 'overview' },
    { id: 'itinerary' },
    { id: 'accommodation' },
    { id: 'transportation' },
    { id: 'carbon' },
  ];
}
