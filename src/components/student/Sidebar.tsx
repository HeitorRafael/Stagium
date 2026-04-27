'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, Briefcase, Star, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import type { Student, StudentPlan } from '@prisma/client';
import { getTimeRemainingText } from '@/lib/utils/dates';

interface Props {
  student: Student & { user: { email: string } };
}

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/profile', label: 'Meu Perfil', icon: User },
  { href: '/proposals', label: 'Propostas', icon: Briefcase },
  { href: '/subscription', label: 'Assinatura', icon: Star },
  { href: '/settings', label: 'Configurações', icon: Settings },
];

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
}

function getPlanLabel(plan: StudentPlan) {
  if (plan === 'ALUMNI_PRO') return 'PRO';
  if (plan === 'ALUMNI_BASIC') return 'BASIC';
  return 'FREE';
}

export default function StudentSidebar({ student }: Props) {
  const pathname = usePathname();
  const timeRemaining = getTimeRemainingText(student.accountExpiresAt);
  const progressPercent = Math.min(100, Math.max(0, Math.round(
    ((new Date().getTime() - new Date(student.enrollmentYear, student.enrollmentMonth - 1).getTime()) /
      (student.accountExpiresAt.getTime() - new Date(student.enrollmentYear, student.enrollmentMonth - 1).getTime())) * 100
  )));

  return (
    <aside style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '260px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', padding: '1.5rem', overflowY: 'auto', zIndex: 40 }}>
      {/* Logo */}
      <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', marginBottom: '2rem', display: 'block' }}>
        STAGIUM<span style={{ color: 'var(--accent-lime)' }}>.</span>
      </Link>

      {/* Perfil */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-default)' }}>
        <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-lime), var(--accent-sky))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--bg-primary)', fontSize: '0.9rem', flexShrink: 0 }}>
          {getInitials(student.fullName)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{student.fullName}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(200,241,53,0.1)', border: '1px solid var(--border-accent)', borderRadius: '999px', padding: '0.15rem 0.5rem', fontSize: '0.6rem', color: 'var(--accent-lime)', fontWeight: 600, marginTop: '0.25rem' }}>
            {getPlanLabel(student.plan)}
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--accent-lime)' : 'var(--text-secondary)', background: isActive ? 'rgba(200,241,53,0.08)' : 'transparent', transition: 'all 0.2s' }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* AccountTimer */}
      <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: '10px' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>VALIDADE DA CONTA</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.65rem' }}>{timeRemaining}</div>
        <div style={{ height: '3px', background: 'var(--border-default)', borderRadius: '2px' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: progressPercent > 60 ? 'var(--accent-lime)' : progressPercent > 20 ? 'var(--accent-gold)' : 'var(--accent-coral)', borderRadius: '2px', transition: 'width 0.5s ease' }} />
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.4rem', textAlign: 'right' }}>{progressPercent}% do curso concluído</div>
      </div>

      {/* Logout */}
      <button onClick={() => signOut({ callbackUrl: '/' })} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', marginTop: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', width: '100%', transition: 'color 0.2s' }}>
        <LogOut size={16} />
        Sair
      </button>
    </aside>
  );
}
