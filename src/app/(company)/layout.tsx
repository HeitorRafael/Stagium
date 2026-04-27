import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CompanySidebar from '@/components/company/Sidebar';

export default async function CompanyLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const company = await prisma.company.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });

  if (!company) redirect('/login');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}>
      <CompanySidebar company={company} />
      <main style={{ flex: 1, marginLeft: '260px', padding: '2rem' }}>{children}</main>
    </div>
  );
}
