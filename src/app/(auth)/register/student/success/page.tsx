import Link from 'next/link';
import { CheckCircle, Mail } from 'lucide-react';

export default function StudentSuccessPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'var(--font-body)' }}>
      <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '3rem', textAlign: 'center' }}>
        <div style={{ width: '4rem', height: '4rem', background: 'rgba(200,241,53,0.1)', border: '1px solid var(--border-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={28} color="var(--accent-lime)" />
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
          Conta criada!
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Sua conta foi criada com sucesso. Agora você precisa verificar seu e-mail institucional para ativar o acesso.
        </p>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start', marginBottom: '2rem', textAlign: 'left' }}>
          <Mail size={18} color="var(--accent-lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.3rem', fontSize: '0.95rem' }}>Verifique seu e-mail</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Enviamos um link de confirmação para o seu e-mail institucional. Clique no link para ativar sua conta.
            </p>
          </div>
        </div>
        <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-lime)', color: 'var(--bg-primary)', fontWeight: 700, padding: '0.85rem 2rem', borderRadius: '8px', width: '100%' }}>
          Ir para o login
        </Link>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '1rem' }}>
          Não recebeu o e-mail? Verifique a caixa de spam ou <a href="#" style={{ color: 'var(--accent-lime)' }}>reenvie o link</a>
        </p>
      </div>
    </div>
  );
}
