import Dashboard from '../../components/Dashboard';

export default function DynamicDashboardPage() {
  return <Dashboard />;
}
//Improved Performance: These pages are pre-rendered at build time, resulting in faster page loads. Reduced Server Load: Since pages are pre-generated, there's less work for the server to do at request time.  SSG AND ISG
export async function generateStaticParams() {
  return [
    { id: 'overview' },
    { id: 'itinerary' },
    { id: 'accommodation' },
    { id: 'transportation' },
    { id: 'carbon' },
  ];
}
