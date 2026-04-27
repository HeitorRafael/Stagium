import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Users, Briefcase, Send, Plus, ArrowRight, TrendingUp } from 'lucide-react';
import { rankCandidates } from '@/lib/utils/ranking';

const PLAN_VACANCY_LIMITS: Record<string, number> = {
  FREE: 3,
  BASIC: 10,
  PRO: Infinity,
  ENTERPRISE: Infinity,
};

export default async function CompanyDashboard() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const company = await prisma.company.findUnique({
    where: { userId: session.user.id },
    include: {
      vacancies: { where: { status: 'ACTIVE' } },
      proposals: {
        include: { student: true, vacancy: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });

  if (!company) redirect('/login');

  const totalCandidates = await prisma.student.count({
    where: { isVisible: true, accountStatus: { not: 'EXPIRED' } },
  });

  const recentCandidates = await prisma.student.findMany({
    where: { isVisible: true, accountStatus: { not: 'EXPIRED' } },
    include: { institution: true, course: true, experiences: true, skills: { include: { skill: true } } },
    take: 30,
  });

  const rankedCandidates = rankCandidates(recentCandidates).slice(0, 4);
  const vacancyLimit = PLAN_VACANCY_LIMITS[company.plan] ?? 3;
  const activeVacancies = company.vacancies.length;
  const proposalsSent = company.proposals.length;
  const interested = company.proposals.filter((p) => p.status === 'INTERESTED').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
            Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{company.companyName}</p>
        </div>
        {company.isVerified && (
          <Link href="/company/vacancies/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem' }}>
            <Plus size={16} /> Nova Vaga
          </Link>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Candidatos disponíveis', value: totalCandidates, icon: Users, color: 'var(--accent-lime)' },
          { label: `Vagas ativas (${activeVacancies}/${vacancyLimit === Infinity ? '∞' : vacancyLimit})`, value: activeVacancies, icon: Briefcase, color: 'var(--accent-sky)' },
          { label: 'Propostas enviadas', value: proposalsSent, icon: Send, color: 'var(--accent-gold)' },
          { label: 'Com interesse', value: interested, icon: TrendingUp, color: 'var(--accent-coral)' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', background: `${color}18`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} color={color} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', marginBottom: '0.25rem' }}>{value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Candidatos recentes */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Candidatos em destaque</h3>
            <Link href="/company/candidates" style={{ fontSize: '0.78rem', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {rankedCandidates.map((candidate) => (
              <Link key={candidate.id} href={`/company/candidates/${candidate.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-default)' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(200,241,53,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--accent-lime)', flexShrink: 0, fontSize: '0.85rem' }}>
                  {candidate.fullName.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {candidate.fullName.split(' ')[0]} {candidate.fullName.split(' ').slice(-1)[0]}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {candidate.course.name} · {candidate.currentSemester}° sem. · {candidate.experiences.length} exp.
                  </div>
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </Link>
            ))}
          </div>
        </div>

        {/* Propostas recentes */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Últimas propostas</h3>
            <Link href="/company/proposals" style={{ fontSize: '0.78rem', color: 'var(--accent-sky)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Ver todas <ArrowRight size={12} />
            </Link>
          </div>
          {company.proposals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <Send size={28} style={{ display: 'block', margin: '0 auto 0.75rem', opacity: 0.4 }} />
              Nenhuma proposta enviada ainda.
              <br />
              <Link href="/company/candidates" style={{ color: 'var(--accent-lime)', marginTop: '0.5rem', display: 'inline-block' }}>
                Buscar candidatos →
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {company.proposals.slice(0, 4).map((p) => {
                const statusColors: Record<string, string> = {
                  PENDING: 'var(--text-muted)',
                  VIEWED: 'var(--accent-sky)',
                  INTERESTED: 'var(--accent-lime)',
                  DECLINED: 'var(--accent-coral)',
                  HIRED: 'var(--accent-gold)',
                };
                const statusLabels: Record<string, string> = {
                  PENDING: 'Pendente', VIEWED: 'Vista', INTERESTED: 'Interesse', DECLINED: 'Recusada', HIRED: 'Contratado',
                };
                return (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-default)' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{p.student.fullName.split(' ')[0]}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.vacancy?.title ?? 'Proposta direta'}</div>
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: statusColors[p.status] }}>
                      {statusLabels[p.status]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
