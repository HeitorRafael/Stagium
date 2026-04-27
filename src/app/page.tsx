'use client';

import Link from 'next/link';
import { GraduationCap, Building2, Handshake, ArrowRight, Star, CheckCircle } from 'lucide-react';

const STATS = [
  { value: '0', label: 'estudantes' },
  { value: '0', label: 'empresas' },
  { value: '0', label: 'vagas ativas' },
];

const HOW_IT_WORKS = [
  {
    icon: GraduationCap,
    title: 'Crie seu perfil acadêmico',
    description: 'Monte um currículo vivo com suas experiências, habilidades e portfólio. Completamente gratuito durante a faculdade.',
  },
  {
    icon: Building2,
    title: 'Empresas encontram você',
    description: 'Recrutadores buscam candidatos por curso, semestre e habilidades. Você só precisa manter o perfil atualizado.',
  },
  {
    icon: Handshake,
    title: 'Receba propostas reais',
    description: 'As empresas enviam propostas diretamente para você, com todos os detalhes da vaga e da remuneração.',
  },
];

const STUDENT_BENEFITS = [
  'Gratuito durante todo o curso',
  'Perfil com portfólio integrado',
  'Timer da validade da conta visível',
  'Receba propostas de empresas verificadas',
  'Links para GitHub, LinkedIn e Behance',
  'Upload de currículo em PDF',
];

const COMPANY_BENEFITS = [
  'Candidatos verificados por e-mail institucional',
  'Filtros por curso, semestre e habilidades',
  'Ordenação por senioridade acadêmica',
  'Transparência total nos benefícios',
  'Campo obrigatório de possibilidade de efetivação',
  'Até 3 vagas gratuitas',
];

const STUDENT_PLANS = [
  {
    name: 'FREE',
    price: 'R$ 0',
    period: 'durante a faculdade',
    description: 'Para estudantes ativos',
    features: ['Perfil completo', 'Receber propostas', 'Visibilidade padrão'],
    highlighted: false,
    accentColor: 'var(--accent-lime)',
  },
  {
    name: 'ALUMNI BASIC',
    price: 'R$ 19,90',
    period: '/mês',
    description: 'Após a formatura',
    features: ['Manter perfil ativo', 'Receber propostas', 'Visibilidade padrão'],
    highlighted: false,
    accentColor: 'var(--accent-lime)',
  },
  {
    name: 'ALUMNI PRO',
    price: 'R$ 39,90',
    period: '/mês',
    description: 'Para se destacar',
    features: ['Destaque na listagem', 'Badge "Disponível"', 'Analytics de visualizações'],
    highlighted: true,
    accentColor: 'var(--accent-lime)',
  },
];

const COMPANY_PLANS = [
  {
    name: 'FREE',
    price: 'R$ 0',
    period: '',
    description: '3 vagas ativas',
    features: ['Busca básica de candidatos', 'Ver perfis completos', 'Enviar propostas'],
    highlighted: false,
    accentColor: 'var(--accent-sky)',
  },
  {
    name: 'BASIC',
    price: 'R$ 149',
    period: '/mês',
    description: '10 vagas ativas',
    features: ['Filtros avançados', 'Ver contatos diretos', 'Relatórios básicos'],
    highlighted: false,
    accentColor: 'var(--accent-sky)',
  },
  {
    name: 'PRO',
    price: 'R$ 349',
    period: '/mês',
    description: 'Vagas ilimitadas',
    features: ['Destaque de vagas', 'Analytics completo', 'Exportar candidatos'],
    highlighted: true,
    accentColor: 'var(--accent-sky)',
  },
];

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '1rem 2rem', background: 'rgba(10,15,30,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
          STAGIUM<span style={{ color: 'var(--accent-lime)' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link href="/login" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, padding: '0.5rem 1rem' }}>
            Entrar
          </Link>
          <Link href="/register/student" style={{ background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontSize: '0.875rem', fontWeight: 700, padding: '0.6rem 1.25rem', borderRadius: '8px' }}>
            Criar conta grátis
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="gradient-mesh" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(200,241,53,0.1)', border: '1px solid var(--border-accent)', borderRadius: '999px', padding: '0.35rem 1rem', marginBottom: '2rem', fontSize: '0.8rem', color: 'var(--accent-lime)', fontWeight: 500 }}>
            <Star size={14} />
            Conexão direta entre estudantes e empresas
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
            Seu perfil universitário.
            <br />
            <span className="gradient-text">Sua próxima oportunidade.</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            O Stagium conecta estudantes universitários a empresas que buscam estagiários —
            sem a frieza do LinkedIn e sem a superficialidade de um app de matchmaking.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <Link href="/register/student" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, fontSize: '1rem', padding: '0.9rem 2rem', borderRadius: '10px' }}>
              Criar meu Perfil <ArrowRight size={18} />
            </Link>
            <Link href="/register/company" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border-accent)', color: 'var(--accent-lime)', fontWeight: 600, fontSize: '1rem', padding: '0.9rem 2rem', borderRadius: '10px' }}>
              Sou Empresa <Building2 size={18} />
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--accent-lime)' }}>{value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: '6rem 2rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Como funciona</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>Simples para o estudante. Poderoso para as empresas.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {HOW_IT_WORKS.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ width: '3rem', height: '3rem', background: 'rgba(200,241,53,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '1px solid var(--border-accent)' }}>
                  <Icon size={22} color="var(--accent-lime)" />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent-lime)', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>0{i + 1}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA ESTUDANTES */}
      <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(200,241,53,0.08)', border: '1px solid var(--border-accent)', borderRadius: '999px', padding: '0.3rem 0.85rem', marginBottom: '1.5rem', fontSize: '0.75rem', color: 'var(--accent-lime)', fontWeight: 600, letterSpacing: '0.1em' }}>PARA ESTUDANTES</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.15 }}>
              Seu currículo vivo.<br />Completamente gratuito.
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Enquanto você estuda, o Stagium é grátis. Monte seu perfil profissional com portfólio integrado e deixe as empresas encontrarem você.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {STUDENT_BENEFITS.map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <CheckCircle size={16} color="var(--accent-lime)" style={{ flexShrink: 0 }} />{b}
                </li>
              ))}
            </ul>
            <Link href="/register/student" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem 1.75rem', borderRadius: '8px' }}>
              Criar perfil grátis <ArrowRight size={16} />
            </Link>
          </div>
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-lime), var(--accent-sky))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--bg-primary)' }}>JD</div>
                <div>
                  <div style={{ fontWeight: 600 }}>João Delfino</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ADS · 4° Semestre · FATEC</div>
                </div>
                <div style={{ marginLeft: 'auto', background: 'rgba(200,241,53,0.1)', border: '1px solid var(--border-accent)', borderRadius: '999px', padding: '0.2rem 0.65rem', fontSize: '0.7rem', color: 'var(--accent-lime)', fontWeight: 600 }}>FREE</div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Completude do perfil</span><span style={{ color: 'var(--accent-lime)' }}>78%</span>
                </div>
                <div style={{ height: '4px', background: 'var(--border-default)', borderRadius: '2px' }}>
                  <div style={{ width: '78%', height: '100%', background: 'var(--accent-lime)', borderRadius: '2px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['React', 'TypeScript', 'Node.js', 'Figma'].map((s) => (
                  <span key={s} style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '6px', padding: '0.2rem 0.6rem', fontSize: '0.72rem', color: 'var(--accent-sky)' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(200,241,53,0.06)', border: '1px solid var(--border-accent)', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-lime)', fontWeight: 600, marginBottom: '0.35rem' }}>Validade da conta</div>
              <div style={{ fontSize: '0.9rem' }}>1 ano e 4 meses restantes</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Formatura prevista: Julho/2027</div>
            </div>
          </div>
        </div>
      </section>

      {/* PARA EMPRESAS */}
      <section style={{ padding: '6rem 2rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Maria Silva', course: 'ADS 5° sem.', skills: ['React', 'Python'], progress: 80 },
                { name: 'Pedro Costa', course: 'SI 6° sem.', skills: ['Java', 'PostgreSQL'], progress: 92 },
                { name: 'Ana Lima', course: 'ADS 4° sem.', skills: ['Vue', 'Node.js'], progress: 65 },
              ].map(({ name, course, skills, progress }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid var(--border-default)' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--accent-sky)', flexShrink: 0, fontSize: '0.85rem' }}>
                    {name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{course} · {progress}% concluído</div>
                    <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                      {skills.map((s) => (
                        <span key={s} style={{ background: 'rgba(200,241,53,0.08)', border: '1px solid rgba(200,241,53,0.15)', borderRadius: '4px', padding: '0.1rem 0.45rem', fontSize: '0.65rem', color: 'var(--accent-lime)' }}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0 }}>Ver →</span>
                </div>
              ))}
              <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>+ candidatos disponíveis</div>
            </div>
          </div>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '999px', padding: '0.3rem 0.85rem', marginBottom: '1.5rem', fontSize: '0.75rem', color: 'var(--accent-sky)', fontWeight: 600, letterSpacing: '0.1em' }}>PARA EMPRESAS</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.15 }}>
              Candidatos verificados.<br />Busca inteligente.
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Encontre estagiários com e-mail institucional verificado, ordenados por senioridade acadêmica.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {COMPANY_BENEFITS.map((b) => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  <CheckCircle size={16} color="var(--accent-sky)" style={{ flexShrink: 0 }} />{b}
                </li>
              ))}
            </ul>
            <Link href="/register/company" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(56,189,248,0.3)', color: 'var(--accent-sky)', fontWeight: 700, padding: '0.85rem 1.75rem', borderRadius: '8px' }}>
              Cadastrar empresa <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>Planos transparentes</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>Sem surpresas. Você vê tudo antes de assinar.</p>
          </div>
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1.5rem', letterSpacing: '0.08em' }}>PARA ESTUDANTES</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {STUDENT_PLANS.map((plan) => (
                <div key={plan.name} className="glass-card" style={{ padding: '1.75rem', border: plan.highlighted ? '1px solid var(--border-accent)' : undefined, position: 'relative' }}>
                  {plan.highlighted && <div style={{ position: 'absolute', top: '-0.65rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontSize: '0.6rem', fontWeight: 700, padding: '0.2rem 0.75rem', borderRadius: '999px', whiteSpace: 'nowrap', letterSpacing: '0.1em' }}>MAIS POPULAR</div>}
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: plan.highlighted ? 'var(--accent-lime)' : 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem' }}>{plan.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{plan.period}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '1.25rem' }}>{plan.description}</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                        <CheckCircle size={14} color={plan.highlighted ? 'var(--accent-lime)' : 'var(--text-muted)'} style={{ flexShrink: 0, marginTop: '2px' }} />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '1.5rem', letterSpacing: '0.08em' }}>PARA EMPRESAS</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {COMPANY_PLANS.map((plan) => (
                <div key={plan.name} className="glass-card" style={{ padding: '1.75rem', border: plan.highlighted ? '1px solid rgba(56,189,248,0.3)' : undefined, position: 'relative' }}>
                  {plan.highlighted && <div style={{ position: 'absolute', top: '-0.65rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-sky)', color: 'var(--bg-primary)', fontSize: '0.6rem', fontWeight: 700, padding: '0.2rem 0.75rem', borderRadius: '999px', whiteSpace: 'nowrap', letterSpacing: '0.1em' }}>RECOMENDADO</div>}
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: plan.highlighted ? 'var(--accent-sky)' : 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.08em' }}>{plan.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem' }}>{plan.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{plan.period}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '1.25rem' }}>{plan.description}</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                        <CheckCircle size={14} color={plan.highlighted ? 'var(--accent-sky)' : 'var(--text-muted)'} style={{ flexShrink: 0, marginTop: '2px' }} />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="gradient-mesh" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', marginBottom: '1.25rem', lineHeight: 1.1 }}>
            Seu próximo passo<br /><span className="gradient-text">começa aqui.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Junte-se a estudantes e empresas que já descobriram uma forma melhor de se conectar.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register/student" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, fontSize: '1rem', padding: '1rem 2.25rem', borderRadius: '10px' }}>
              Criar perfil de estudante <ArrowRight size={18} />
            </Link>
            <Link href="/register/company" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border-default)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem', padding: '1rem 2.25rem', borderRadius: '10px' }}>
              Cadastrar empresa
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-default)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>
          STAGIUM<span style={{ color: 'var(--accent-lime)' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {['Sobre', 'Contato', 'Termos de Uso', 'Política de Privacidade'].map((l) => (
            <a key={l} href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{l}</a>
          ))}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© 2026 Stagium. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
