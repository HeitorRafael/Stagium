import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Search, Filter, ArrowRight, GraduationCap, MapPin } from 'lucide-react';
import { rankCandidates, getCourseProgressPercent } from '@/lib/utils/ranking';

export default async function CandidatesPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const company = await prisma.company.findUnique({ where: { userId: session.user.id } });
  if (!company) redirect('/login');

  const students = await prisma.student.findMany({
    where: {
      isVisible: true,
      profileStatus: 'ACTIVE',
      accountStatus: { not: 'EXPIRED' },
    },
    include: {
      institution: true,
      course: true,
      experiences: true,
      skills: { include: { skill: true }, take: 4 },
    },
    take: 50,
  });

  const ranked = rankCandidates(students);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
          Buscar Candidatos
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Ordenados por senioridade acadêmica — estudantes mais avançados aparecem primeiro
        </p>
      </div>

      {/* Filtros */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '200px', background: 'var(--bg-secondary)', border: '1px solid var(--border-default)', borderRadius: '8px', padding: '0.65rem 1rem' }}>
          <Search size={16} color="var(--text-muted)" />
          <input placeholder="Buscar por nome, curso ou habilidade..." style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', flex: 1 }} />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '8px', padding: '0.65rem 1rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: '0.875rem', cursor: 'pointer' }}>
          <Filter size={16} /> Filtros
        </button>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>
          {ranked.length} candidatos encontrados
        </span>
      </div>

      {/* Grid de candidatos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {ranked.map((student) => {
          const progress = getCourseProgressPercent(student, student.course.durationMonths);
          return (
            <div key={student.id} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: student.plan === 'ALUMNI_PRO' ? 'linear-gradient(135deg, var(--accent-gold), var(--accent-lime))' : 'linear-gradient(135deg, var(--accent-lime), var(--accent-sky))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--bg-primary)', fontSize: '0.9rem', flexShrink: 0 }}>
                  {student.fullName.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      {student.fullName.split(' ')[0]} {student.fullName.split(' ').slice(-1)[0]}
                    </span>
                    {student.plan === 'ALUMNI_PRO' && (
                      <span style={{ background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)', borderRadius: '4px', padding: '0.1rem 0.45rem', fontSize: '0.6rem', color: 'var(--accent-gold)', fontWeight: 700 }}>⭐ PRO</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <GraduationCap size={12} />
                    {student.course.name} · {student.currentSemester}° sem.
                  </div>
                  {student.city && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      <MapPin size={11} />
                      {student.city}, {student.state}
                    </div>
                  )}
                </div>
                <span style={{ background: 'rgba(200,241,53,0.1)', border: '1px solid var(--border-accent)', borderRadius: '6px', padding: '0.2rem 0.6rem', fontSize: '0.68rem', color: 'var(--accent-lime)', fontWeight: 600, flexShrink: 0 }}>
                  {student.experiences.length} exp.
                </span>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>Progresso do curso</span>
                  <span style={{ color: 'var(--accent-lime)' }}>{progress}%</span>
                </div>
                <div style={{ height: '3px', background: 'var(--border-default)', borderRadius: '2px' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-lime)', borderRadius: '2px' }} />
                </div>
              </div>

              {/* Skills */}
              {student.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                  {student.skills.slice(0, 4).map(({ skill }) => (
                    <span key={skill.id} style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '4px', padding: '0.15rem 0.5rem', fontSize: '0.65rem', color: 'var(--accent-sky)' }}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              <Link href={`/company/candidates/${student.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.65rem', border: '1px solid var(--border-default)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', transition: 'all 0.2s' }}>
                Ver perfil completo <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
