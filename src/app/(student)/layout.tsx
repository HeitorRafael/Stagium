import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import StudentSidebar from '@/components/student/Sidebar';
import AccountStatusBanner from '@/components/shared/AccountStatusBanner';
import { getAccountStatus } from '@/lib/utils/dates';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { user: true, institution: true, course: true },
  });

  if (!student) redirect('/login');

  const accountStatus = getAccountStatus(student.accountExpiresAt, student.plan);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}>
      <StudentSidebar student={student} />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        {(accountStatus === 'EXPIRING_SOON' || accountStatus === 'EXPIRED') && (
          <AccountStatusBanner status={accountStatus} expiresAt={student.accountExpiresAt} />
        )}
        <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
      </div>
    </div>
  );
}
