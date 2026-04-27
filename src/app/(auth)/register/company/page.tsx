'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import {
  companyStep1Schema, companyStep2Schema, companyStep3Schema,
  type CompanyStep1, type CompanyStep2, type CompanyStep3,
} from '@/lib/validations/company';

const STEPS = ['Conta', 'Empresa', 'Responsável'];
const SECTORS = ['Tecnologia', 'Saúde', 'Finanças', 'Educação', 'Indústria', 'Varejo', 'Logística', 'Serviços', 'Outro'];
const SIZES = [
  { value: 'MICRO', label: 'Micro (1-9 funcionários)' },
  { value: 'SMALL', label: 'Pequena (10-49 funcionários)' },
  { value: 'MEDIUM', label: 'Média (50-249 funcionários)' },
  { value: 'LARGE', label: 'Grande (250+ funcionários)' },
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

export default function CompanyRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [formData, setFormData] = useState<Partial<CompanyStep1 & CompanyStep2 & CompanyStep3>>({});

  const form1 = useForm<CompanyStep1>({ resolver: zodResolver(companyStep1Schema) });
  const form2 = useForm<CompanyStep2>({ resolver: zodResolver(companyStep2Schema) });
  const form3 = useForm<CompanyStep3>({ resolver: zodResolver(companyStep3Schema) });

  const handleStep1 = form1.handleSubmit((data) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(2);
  });

  const handleStep2 = form2.handleSubmit((data) => {
    setFormData((p) => ({ ...p, ...data }));
    setStep(3);
  });

  const handleStep3 = form3.handleSubmit(async (data) => {
    setLoading(true);
    setServerError('');
    try {
      const payload = { ...formData, ...data };
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setServerError(result.error || 'Erro ao criar conta');
      } else {
        router.push('/register/company/success');
      }
    } catch {
      setServerError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-body)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.02em' }}>
            STAGIUM<span style={{ color: 'var(--accent-lime)' }}>.</span>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            Cadastrar empresa
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
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: i + 1 < step ? 'var(--accent-sky)' : i + 1 === step ? 'rgba(56,189,248,0.15)' : 'var(--bg-card)', border: `2px solid ${i + 1 <= step ? 'var(--accent-sky)' : 'var(--border-default)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: i + 1 < step ? 'var(--bg-primary)' : i + 1 === step ? 'var(--accent-sky)' : 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700 }}>
                  {i + 1 < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: '0.65rem', color: i + 1 === step ? 'var(--accent-sky)' : 'var(--text-muted)', fontWeight: i + 1 === step ? 600 : 400 }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ height: '2px', background: 'var(--border-default)', borderRadius: '1px' }}>
            <div style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%`, height: '100%', background: 'var(--accent-sky)', borderRadius: '1px', transition: 'width 0.4s ease' }} />
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>E-mail corporativo</label>
                <input {...form1.register('email')} type="email" placeholder="contato@empresa.com.br" style={fieldStyle(!!form1.formState.errors.email)} />
                {form1.formState.errors.email && <p style={errorStyle}>{form1.formState.errors.email.message}</p>}
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
              <div>
                <label style={labelStyle}>CNPJ</label>
                <input {...form1.register('cnpj')} placeholder="00.000.000/0000-00" style={fieldStyle(!!form1.formState.errors.cnpj)} />
                {form1.formState.errors.cnpj && <p style={errorStyle}>{form1.formState.errors.cnpj.message}</p>}
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <input {...form1.register('acceptTerms')} type="checkbox" id="terms" style={{ marginTop: '3px', accentColor: 'var(--accent-sky)' }} />
                <label htmlFor="terms" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Concordo com os <a href="#" style={{ color: 'var(--accent-sky)' }}>Termos de Uso</a>
                </label>
              </div>
              {form1.formState.errors.acceptTerms && <p style={errorStyle}>{form1.formState.errors.acceptTerms.message}</p>}
              <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-sky)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                Próximo <ChevronRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleStep2} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Nome da empresa</label>
                <input {...form2.register('companyName')} placeholder="Razão social ou nome fantasia" style={fieldStyle(!!form2.formState.errors.companyName)} />
                {form2.formState.errors.companyName && <p style={errorStyle}>{form2.formState.errors.companyName.message}</p>}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Setor</label>
                  <select {...form2.register('sector')} style={fieldStyle(!!form2.formState.errors.sector)}>
                    <option value="">Selecione...</option>
                    {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {form2.formState.errors.sector && <p style={errorStyle}>{form2.formState.errors.sector.message}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Porte</label>
                  <select {...form2.register('size')} style={fieldStyle(!!form2.formState.errors.size)}>
                    <option value="">Selecione...</option>
                    {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  {form2.formState.errors.size && <p style={errorStyle}>{form2.formState.errors.size.message}</p>}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Cidade (sede)</label>
                  <input {...form2.register('city')} style={fieldStyle(!!form2.formState.errors.city)} />
                  {form2.formState.errors.city && <p style={errorStyle}>{form2.formState.errors.city.message}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Estado</label>
                  <input {...form2.register('state')} maxLength={2} placeholder="SP" style={fieldStyle(!!form2.formState.errors.state)} />
                  {form2.formState.errors.state && <p style={errorStyle}>{form2.formState.errors.state.message}</p>}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Website (opcional)</label>
                <input {...form2.register('website')} placeholder="https://empresa.com.br" style={fieldStyle(false)} />
              </div>
              <div>
                <label style={labelStyle}>Descrição (opcional)</label>
                <textarea {...form2.register('description')} rows={3} maxLength={500} placeholder="Descreva a empresa em até 500 caracteres..." style={{ ...fieldStyle(false), resize: 'none' as const }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input {...form2.register('isRemoteFriendly')} type="checkbox" id="remote" style={{ accentColor: 'var(--accent-sky)' }} />
                <label htmlFor="remote" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>A empresa aceita estágio remoto</label>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', fontWeight: 600, padding: '0.85rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  <ChevronLeft size={18} /> Anterior
                </button>
                <button type="submit" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--accent-sky)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  Próximo <ChevronRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <form onSubmit={handleStep3} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Nome do responsável</label>
                <input {...form3.register('contactName')} placeholder="Nome completo" style={fieldStyle(!!form3.formState.errors.contactName)} />
                {form3.formState.errors.contactName && <p style={errorStyle}>{form3.formState.errors.contactName.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Cargo do responsável</label>
                <input {...form3.register('contactRole')} placeholder="Ex: Gerente de RH, CEO" style={fieldStyle(!!form3.formState.errors.contactRole)} />
                {form3.formState.errors.contactRole && <p style={errorStyle}>{form3.formState.errors.contactRole.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Telefone de contato (opcional)</label>
                <input {...form3.register('contactPhone')} placeholder="(11) 99999-9999" style={fieldStyle(false)} />
              </div>
              {serverError && (
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', borderRadius: '8px', padding: '0.85rem', color: 'var(--accent-coral)', fontSize: '0.875rem' }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />{serverError}
                </div>
              )}
              <div style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '8px', padding: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Seu cadastro será verificado em até 24h. Você receberá um e-mail quando estiver aprovado.
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(2)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', fontWeight: 600, padding: '0.85rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  <ChevronLeft size={18} /> Anterior
                </button>
                <button type="submit" disabled={loading} style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: loading ? 'rgba(56,189,248,0.4)' : 'var(--accent-sky)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)' }}>
                  {loading ? 'Criando conta...' : 'Criar conta da empresa'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
