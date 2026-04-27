'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import {
  studentStep1Schema, studentStep2Schema, studentStep3Schema, studentStep4Schema,
  type StudentStep1, type StudentStep2, type StudentStep3, type StudentStep4,
} from '@/lib/validations/student';
import { calculateAccountExpiry, formatDate } from '@/lib/utils/dates';

type Institution = { id: string; name: string; domain: string; courses: { id: string; name: string; durationMonths: number }[] };

const STEPS = ['Conta', 'Dados Pessoais', 'Acadêmico', 'Perfil Profissional'];
const PERIODS = [
  { value: 'MORNING', label: 'Manhã' },
  { value: 'AFTERNOON', label: 'Tarde' },
  { value: 'NIGHT', label: 'Noite' },
  { value: 'ONLINE', label: 'EAD' },
];

const fieldStyle = (hasError: boolean) => ({
  width: '100%',
  background: 'var(--bg-card)',
  border: `1px solid ${hasError ? 'var(--accent-coral)' : 'var(--border-default)'}`,
  borderRadius: '8px',
  padding: '0.75rem 1rem',
  color: 'var(--text-primary)',
  fontSize: '0.95rem',
  outline: 'none',
  fontFamily: 'var(--font-body)',
});

const labelStyle = { display: 'block' as const, fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' };
const errorStyle = { color: 'var(--accent-coral)', fontSize: '0.78rem', marginTop: '0.35rem' };

export default function StudentRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [detectedInstitution, setDetectedInstitution] = useState<Institution | null>(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [formData, setFormData] = useState<Partial<StudentStep1 & StudentStep2 & StudentStep3 & StudentStep4>>({});

  const form1 = useForm<StudentStep1>({ resolver: zodResolver(studentStep1Schema) });
  const form2 = useForm<StudentStep2>({ resolver: zodResolver(studentStep2Schema) });
  const form3 = useForm<StudentStep3>({ resolver: zodResolver(studentStep3Schema) });
  const form4 = useForm<StudentStep4>({ resolver: zodResolver(studentStep4Schema) });

  useEffect(() => {
    fetch('/api/institutions').then((r) => r.json()).then(setInstitutions);
  }, []);

  const email = form1.watch('email');
  useEffect(() => {
    if (!email) return;
    const domain = email.split('@')[1];
    const found = institutions.find((i) => i.domain === domain);
    setDetectedInstitution(found || null);
  }, [email, institutions]);

  const institutionId = form3.watch('institutionId');
  const courseId = form3.watch('courseId');
  const enrollmentYear = form3.watch('enrollmentYear');
  const enrollmentMonth = form3.watch('enrollmentMonth');

  const selectedInstitution = institutions.find((i) => i.id === institutionId);
  const selectedCourse = selectedInstitution?.courses.find((c) => c.id === courseId);
  const graduationDate = selectedCourse && enrollmentYear && enrollmentMonth
    ? calculateAccountExpiry(enrollmentYear, enrollmentMonth, selectedCourse.durationMonths)
    : null;

  const handleStep1 = form1.handleSubmit((data) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(2);
  });

  const handleStep2 = form2.handleSubmit((data) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(3);
  });

  const handleStep3 = form3.handleSubmit((data) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(4);
  });

  const handleStep4 = form4.handleSubmit(async (data) => {
    setLoading(true);
    setServerError('');
    try {
      const payload = { ...formData, ...data };
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setServerError(result.error || 'Erro ao criar conta');
      } else {
        router.push('/register/student/success');
      }
    } catch {
      setServerError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-body)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            STAGIUM<span style={{ color: 'var(--accent-lime)' }}>.</span>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Criar conta de estudante
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Já tem conta? <Link href="/login" style={{ color: 'var(--accent-lime)' }}>Entrar</Link>
          </p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', flex: 1 }}>
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: i + 1 < step ? 'var(--accent-lime)' : i + 1 === step ? 'rgba(200,241,53,0.2)' : 'var(--bg-card)', border: `2px solid ${i + 1 <= step ? 'var(--accent-lime)' : 'var(--border-default)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: i + 1 < step ? 'var(--bg-primary)' : i + 1 === step ? 'var(--accent-lime)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                  {i + 1 < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: '0.65rem', color: i + 1 === step ? 'var(--accent-lime)' : 'var(--text-muted)', fontWeight: i + 1 === step ? 600 : 400, textAlign: 'center', lineHeight: 1.2 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ height: '2px', background: 'var(--border-default)', borderRadius: '1px' }}>
            <div style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%`, height: '100%', background: 'var(--accent-lime)', borderRadius: '1px', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>

          {/* STEP 1 — Conta */}
          {step === 1 && (
            <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>E-mail institucional</label>
                <input {...form1.register('email')} type="email" placeholder="seu@email.fatec.sp.gov.br" style={fieldStyle(!!form1.formState.errors.email)} />
                {form1.formState.errors.email && <p style={errorStyle}>{form1.formState.errors.email.message}</p>}
                {detectedInstitution && (
                  <p style={{ color: 'var(--accent-lime)', fontSize: '0.78rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle size={12} /> E-mail da {detectedInstitution.name} detectado
                  </p>
                )}
                {email && email.includes('@') && !detectedInstitution && (
                  <p style={{ color: 'var(--accent-gold)', fontSize: '0.78rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <AlertCircle size={12} /> Domínio institucional não reconhecido
                  </p>
                )}
              </div>
              <div>
                <label style={labelStyle}>Senha</label>
                <input {...form1.register('password')} type="password" placeholder="Mínimo 8 caracteres" style={fieldStyle(!!form1.formState.errors.password)} />
                {form1.formState.errors.password && <p style={errorStyle}>{form1.formState.errors.password.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Confirmar senha</label>
                <input {...form1.register('confirmPassword')} type="password" placeholder="Repita a senha" style={fieldStyle(!!form1.formState.errors.confirmPassword)} />
                {form1.formState.errors.confirmPassword && <p style={errorStyle}>{form1.formState.errors.confirmPassword.message}</p>}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <input {...form1.register('acceptTerms')} type="checkbox" id="terms" style={{ marginTop: '3px', accentColor: 'var(--accent-lime)' }} />
                <label htmlFor="terms" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Concordo com os <a href="#" style={{ color: 'var(--accent-lime)' }}>Termos de Uso</a> e a <a href="#" style={{ color: 'var(--accent-lime)' }}>Política de Privacidade</a>
                </label>
              </div>
              {form1.formState.errors.acceptTerms && <p style={errorStyle}>{form1.formState.errors.acceptTerms.message}</p>}
              <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>
                Próximo <ChevronRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 2 — Dados Pessoais */}
          {step === 2 && (
            <form onSubmit={handleStep2} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Nome completo</label>
                <input {...form2.register('fullName')} placeholder="Seu nome completo" style={fieldStyle(!!form2.formState.errors.fullName)} />
                {form2.formState.errors.fullName && <p style={errorStyle}>{form2.formState.errors.fullName.message}</p>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Cidade</label>
                  <input {...form2.register('city')} placeholder="Praia Grande" style={fieldStyle(!!form2.formState.errors.city)} />
                  {form2.formState.errors.city && <p style={errorStyle}>{form2.formState.errors.city.message}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Estado</label>
                  <input {...form2.register('state')} placeholder="SP" maxLength={2} style={fieldStyle(!!form2.formState.errors.state)} />
                  {form2.formState.errors.state && <p style={errorStyle}>{form2.formState.errors.state.message}</p>}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Telefone (opcional)</label>
                <input {...form2.register('phone')} placeholder="(13) 99999-9999" style={fieldStyle(false)} />
              </div>
              <div>
                <label style={labelStyle}>Bio curta (opcional)</label>
                <textarea {...form2.register('bio')} placeholder="Conte um pouco sobre você — máx. 280 caracteres" maxLength={280} rows={3} style={{ ...fieldStyle(false), resize: 'none' as const }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', fontWeight: 600, padding: '0.85rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  <ChevronLeft size={18} /> Anterior
                </button>
                <button type="submit" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  Próximo <ChevronRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 — Acadêmico */}
          {step === 3 && (
            <form onSubmit={handleStep3} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Instituição</label>
                <select {...form3.register('institutionId')} style={fieldStyle(!!form3.formState.errors.institutionId)}>
                  <option value="">Selecione...</option>
                  {institutions.map((i) => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
                </select>
                {form3.formState.errors.institutionId && <p style={errorStyle}>{form3.formState.errors.institutionId.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Curso</label>
                <select {...form3.register('courseId')} disabled={!selectedInstitution} style={fieldStyle(!!form3.formState.errors.courseId)}>
                  <option value="">Selecione...</option>
                  {selectedInstitution?.courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {form3.formState.errors.courseId && <p style={errorStyle}>{form3.formState.errors.courseId.message}</p>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Semestre atual</label>
                  <select {...form3.register('currentSemester', { valueAsNumber: true })} style={fieldStyle(false)}>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}° semestre</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Período</label>
                  <select {...form3.register('enrollmentPeriod')} style={fieldStyle(!!form3.formState.errors.enrollmentPeriod)}>
                    <option value="">Selecione...</option>
                    {PERIODS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Ano de ingresso</label>
                  <select {...form3.register('enrollmentYear', { valueAsNumber: true })} style={fieldStyle(false)}>
                    <option value="">Selecione...</option>
                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Mês de ingresso</label>
                  <select {...form3.register('enrollmentMonth', { valueAsNumber: true })} style={fieldStyle(false)}>
                    <option value="">Selecione...</option>
                    {months.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                  </select>
                </div>
              </div>
              {graduationDate && (
                <div style={{ background: 'rgba(200,241,53,0.06)', border: '1px solid var(--border-accent)', borderRadius: '8px', padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-lime)', fontWeight: 600 }}>Previsão de formatura: </span>
                  {formatDate(graduationDate)} · Conta gratuita até esta data
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(2)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', fontWeight: 600, padding: '0.85rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  <ChevronLeft size={18} /> Anterior
                </button>
                <button type="submit" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  Próximo <ChevronRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4 — Perfil Profissional */}
          {step === 4 && (
            <form onSubmit={handleStep4} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                Links opcionais — você pode adicionar depois no seu perfil.
              </p>
              <div>
                <label style={labelStyle}>LinkedIn</label>
                <input {...form4.register('linkedinUrl')} placeholder="https://linkedin.com/in/..." style={fieldStyle(!!form4.formState.errors.linkedinUrl)} />
                {form4.formState.errors.linkedinUrl && <p style={errorStyle}>{form4.formState.errors.linkedinUrl.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>GitHub</label>
                <input {...form4.register('githubUrl')} placeholder="https://github.com/..." style={fieldStyle(!!form4.formState.errors.githubUrl)} />
                {form4.formState.errors.githubUrl && <p style={errorStyle}>{form4.formState.errors.githubUrl.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Portfólio</label>
                <input {...form4.register('portfolioUrl')} placeholder="https://meusite.com" style={fieldStyle(!!form4.formState.errors.portfolioUrl)} />
                {form4.formState.errors.portfolioUrl && <p style={errorStyle}>{form4.formState.errors.portfolioUrl.message}</p>}
              </div>
              {serverError && (
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', borderRadius: '8px', padding: '0.85rem', color: 'var(--accent-coral)', fontSize: '0.875rem' }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />{serverError}
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(3)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', fontWeight: 600, padding: '0.85rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  <ChevronLeft size={18} /> Anterior
                </button>
                <button type="submit" disabled={loading} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: loading ? 'rgba(200,241,53,0.5)' : 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)' }}>
                  {loading ? 'Criando conta...' : 'Criar minha conta'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
