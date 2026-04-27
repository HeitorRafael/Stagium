'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Search, Send, Building2, CreditCard, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import type { Company } from '@prisma/client';

interface Props {
  company: Company;
}

const NAV = [
  { href: '/company/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/company/vacancies', label: 'Minhas Vagas', icon: Briefcase },
  { href: '/company/candidates', label: 'Buscar Candidatos', icon: Search },
  { href: '/company/proposals', label: 'Propostas Enviadas', icon: Send },
  { href: '/company/profile', label: 'Perfil da Empresa', icon: Building2 },
  { href: '/company/plan', label: 'Meu Plano', icon: CreditCard },
  { href: '/company/settings', label: 'Configurações', icon: Settings },
];

function getPlanLabel(plan: string) {
  if (plan === 'ENTERPRISE') return 'ENTERPRISE';
  if (plan === 'PRO') return 'PRO';
  if (plan === 'BASIC') return 'BASIC';
  return 'FREE';
}

export default function CompanySidebar({ company }: Props) {
  const pathname = usePathname();
  const initials = company.companyName.slice(0, 2).toUpperCase();

  return (
    <aside style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '260px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-default)', display: 'flex', flexDirection: 'column', padding: '1.5rem', overflowY: 'auto', zIndex: 40 }}>
      <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', marginBottom: '2rem', display: 'block' }}>
        STAGIUM<span style={{ color: 'var(--accent-lime)' }}>.</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.75rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border-default)' }}>
        <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '10px', background: 'linear-gradient(135deg, var(--accent-sky), var(--accent-lime))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--bg-primary)', fontSize: '0.9rem', flexShrink: 0 }}>
          {initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.companyName}</div>
          <div style={{ display: 'inline-flex', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '999px', padding: '0.15rem 0.5rem', fontSize: '0.6rem', color: 'var(--accent-sky)', fontWeight: 600, marginTop: '0.25rem' }}>
            {getPlanLabel(company.plan)}
          </div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {NAV.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--accent-sky)' : 'var(--text-secondary)', background: isActive ? 'rgba(56,189,248,0.08)' : 'transparent', transition: 'all 0.2s' }}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {label}
            </Link>
          );
        })}
      </nav>

      {!company.isVerified && (
        <div style={{ background: 'rgba(245,197,24,0.08)', border: '1px solid rgba(245,197,24,0.2)', borderRadius: '8px', padding: '0.85rem', fontSize: '0.78rem', color: 'var(--accent-gold)', marginTop: '1rem', lineHeight: 1.5 }}>
          Empresa aguardando verificação. Você poderá publicar vagas após aprovação.
        </div>
      )}

      <button onClick={() => signOut({ callbackUrl: '/' })} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.65rem 0.85rem', marginTop: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', width: '100%' }}>
        <LogOut size={16} />
        Sair
      </button>
    </aside>
  );
}
