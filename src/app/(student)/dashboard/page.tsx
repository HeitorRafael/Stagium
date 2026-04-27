import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Briefcase, Eye, CheckCircle, AlertCircle, User, Code, ExternalLink, Clock } from 'lucide-react';
import { getTimeRemainingText } from '@/lib/utils/dates';

function ProfileCompleteness({ student }: { student: any }) {
  const checks = [
    { label: 'Foto de perfil', done: !!student.avatarUrl },
    { label: 'Bio', done: !!student.bio },
    { label: 'Telefone', done: !!student.phone },
    { label: 'LinkedIn', done: !!student.linkedinUrl },
    { label: 'GitHub', done: !!student.githubUrl },
    { label: 'Experiências', done: student.experiences.length > 0 },
    { label: 'Habilidades', done: student.skills.length > 0 },
    { label: 'Portfólio', done: !!student.portfolioUrl },
  ];
  const done = checks.filter((c) => c.done).length;
  const percent = Math.round((done / checks.length) * 100);

  return (
    <div className="glass-card" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Completude do Perfil</h3>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--accent-lime)' }}>{percent}%</span>
      </div>
      <div style={{ height: '6px', background: 'var(--border-default)', borderRadius: '3px', marginBottom: '1.25rem' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: 'var(--accent-lime)', borderRadius: '3px', transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem' }}>
        {checks.map(({ label, done }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: done ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
            {done
              ? <CheckCircle size={13} color="var(--accent-lime)" />
              : <AlertCircle size={13} color="var(--text-muted)" />}
            {label}
          </div>
        ))}
      </div>
      {percent < 100 && (
        <Link href="/profile/edit" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, fontSize: '0.85rem', padding: '0.6rem 1.25rem', borderRadius: '8px' }}>
          Completar perfil
        </Link>
      )}
    </div>
  );
}

export default async function StudentDashboard() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      institution: true,
      course: true,
      experiences: true,
      skills: { include: { skill: true } },
      proposals: {
        include: { company: true, vacancy: true },
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
    },
  });

  if (!student) redirect('/login');

  const newProposals = student.proposals.filter((p) => p.status === 'PENDING').length;
  const timeRemaining = getTimeRemainingText(student.accountExpiresAt);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
          Olá, {student.fullName.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {student.course.name} · {student.currentSemester}° semestre · {student.institution.name}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {/* Completude do perfil */}
        <ProfileCompleteness student={student} />

        {/* Propostas */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Briefcase size={18} color="var(--accent-lime)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Propostas</h3>
            </div>
            {newProposals > 0 && (
              <span style={{ background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                {newProposals} nova{newProposals > 1 ? 's' : ''}
              </span>
            )}
          </div>
          {student.proposals.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Nenhuma proposta ainda. Complete seu perfil para aumentar sua visibilidade.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {student.proposals.slice(0, 2).map((p) => (
                <div key={p.id} style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '0.85rem', border: '1px solid var(--border-default)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem' }}>{p.company.companyName}</div>
                  {p.vacancy && <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{p.vacancy.title}</div>}
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link href="/proposals" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--accent-lime)' }}>
            Ver todas <ExternalLink size={12} />
          </Link>
        </div>

        {/* Habilidades */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Code size={18} color="var(--accent-sky)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Habilidades</h3>
          </div>
          {student.skills.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Nenhuma habilidade cadastrada.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {student.skills.slice(0, 8).map(({ skill, level }) => (
                <span key={skill.id} style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '6px', padding: '0.25rem 0.65rem', fontSize: '0.72rem', color: 'var(--accent-sky)' }}>
                  {skill.name}
                </span>
              ))}
            </div>
          )}
          <Link href="/profile/edit" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--accent-sky)' }}>
            Editar habilidades <ExternalLink size={12} />
          </Link>
        </div>

        {/* Validade */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <Clock size={18} color="var(--accent-gold)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Validade</h3>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.35rem' }}>{timeRemaining}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Expira em {new Date(student.accountExpiresAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </div>
          {student.plan === 'FREE' && (
            <Link href="/subscription" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--accent-gold)' }}>
              Ver planos Alumni <ExternalLink size={12} />
            </Link>
          )}
        </div>

        {/* Perfil público */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
            <User size={18} color="var(--text-secondary)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem' }}>Seu Perfil Público</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            {student.isVisible ? 'Visível para empresas.' : 'Perfil oculto. Ative para receber propostas.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href={`/profile/${student.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', padding: '0.5rem 0.85rem', borderRadius: '6px' }}>
              <Eye size={13} /> Ver perfil
            </Link>
            <Link href="/profile/edit" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--accent-lime)', border: '1px solid var(--border-accent)', padding: '0.5rem 0.85rem', borderRadius: '6px' }}>
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
