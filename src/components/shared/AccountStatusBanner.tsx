import Link from 'next/link';
import { AlertTriangle, X } from 'lucide-react';
import type { AccountStatus } from '@prisma/client';
import { getTimeRemainingText } from '@/lib/utils/dates';

interface Props {
  status: AccountStatus;
  expiresAt: Date;
}

export default function AccountStatusBanner({ status, expiresAt }: Props) {
  const isExpired = status === 'EXPIRED';
  const text = getTimeRemainingText(expiresAt);
  const color = isExpired ? 'var(--accent-coral)' : 'var(--accent-gold)';
  const bg = isExpired ? 'rgba(255,107,107,0.08)' : 'rgba(245,197,24,0.08)';
  const border = isExpired ? 'rgba(255,107,107,0.2)' : 'rgba(245,197,24,0.2)';

  return (
    <div style={{ background: bg, borderBottom: `1px solid ${border}`, padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color }}>
      <AlertTriangle size={16} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: '0.875rem' }}>
        {isExpired
          ? 'Sua conta gratuita expirou. Assine um plano Alumni para continuar visível.'
          : `Sua conta expira em breve — ${text}. Garanta sua visibilidade após a formatura.`}
      </span>
      <Link href="/subscription" style={{ background: color, color: 'var(--bg-primary)', fontWeight: 700, fontSize: '0.8rem', padding: '0.4rem 1rem', borderRadius: '6px', flexShrink: 0 }}>
        Ver planos
      </Link>
    </div>
  );
}
