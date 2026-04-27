'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});
type FormData = z.infer<typeof schema>;

const QUOTES = [
  '"O sucesso é a soma de pequenos esforços repetidos dia após dia."',
  '"A carreira é construída por passos, não por saltos."',
  '"Cada oportunidade começa com uma conexão."',
  '"O melhor momento para começar foi ontem. O segundo melhor é agora."',
];

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('E-mail ou senha incorretos. Verifique também se seu e-mail foi confirmado.');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: 'var(--font-body)' }}>

      {/* Lado esquerdo — branding */}
      <div className="gradient-mesh" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '420px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '3rem', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
            STAGIUM<span style={{ color: 'var(--accent-lime)' }}>.</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '3rem' }}>
            Seu próximo passo começa aqui.
          </p>
          <blockquote style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, borderLeft: '2px solid var(--accent-lime)', paddingLeft: '1.25rem', textAlign: 'left' }}>
            {quote}
          </blockquote>
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Bem-vindo de volta
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Entre com seu e-mail institucional ou corporativo
          </p>

          {error && (
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.5rem', color: 'var(--accent-coral)', fontSize: '0.875rem' }}>
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                E-mail
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="seu@email.institucional"
                style={{ width: '100%', background: 'var(--bg-card)', border: `1px solid ${errors.email ? 'var(--accent-coral)' : 'var(--border-default)'}`, borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }}
              />
              {errors.email && <p style={{ color: 'var(--accent-coral)', fontSize: '0.78rem', marginTop: '0.35rem' }}>{errors.email.message}</p>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  style={{ width: '100%', background: 'var(--bg-card)', border: `1px solid ${errors.password ? 'var(--accent-coral)' : 'var(--border-default)'}`, borderRadius: '8px', padding: '0.75rem 2.75rem 0.75rem 1rem', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none', fontFamily: 'var(--font-body)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ color: 'var(--accent-coral)', fontSize: '0.78rem', marginTop: '0.35rem' }}>{errors.password.message}</p>}
            </div>

            <div style={{ textAlign: 'right' }}>
              <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Esqueci minha senha</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: loading ? 'rgba(200,241,53,0.5)' : 'var(--accent-lime)', color: 'var(--bg-primary)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', padding: '0.85rem', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Entrando...' : <>Entrar <ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ margin: '1.75rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>ou</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/register/student" style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
              Sou estudante — criar conta
            </Link>
            <Link href="/register/company" style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>
              Sou empresa — criar conta
            </Link>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <Link href="/" style={{ color: 'var(--accent-lime)' }}>← Voltar para o início</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
