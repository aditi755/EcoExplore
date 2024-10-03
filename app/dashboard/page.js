import { redirect } from 'next/navigation';

//What this does in practice:
//1. When a user navigates to /dashboard, this component is rendered.
//Instead of displaying any content, it immediately redirects the user to /dashboard/overview.
export default function DashboardPage() {
  redirect('/dashboard/overview');
}
