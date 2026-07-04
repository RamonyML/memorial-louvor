import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { MaterialIcon } from '../components/icons/MaterialIcon';
import styles from './AdminLoginPage.module.css';

export function AdminLoginPage() {
  const { loading, login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [entrando, setEntrando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro('');
    setEntrando(true);
    const resultado = await login(email, senha);
    setEntrando(false);
    if (!resultado.ok) setErro(resultado.erro ?? 'Não foi possível entrar.');
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.iconWrap}>
          <MaterialIcon name="admin_panel_settings" size={28} />
        </div>
        <h1>Área Administrativa</h1>
        <p className={styles.sub}>Ministério de Louvor · Igreja Batista Memorial</p>

        {loading ? (
          <p className={styles.status}>Verificando sessão...</p>
        ) : (
          <>
            <div className={styles.field}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                autoFocus
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha"
              />
              {erro && <span className={styles.erro}>{erro}</span>}
            </div>

            <Button type="submit" icon="login" disabled={entrando} style={{ width: '100%', justifyContent: 'center' }}>
              {entrando ? 'Entrando...' : 'Entrar'}
            </Button>
          </>
        )}

        <Link to="/" className={styles.voltar}>
          <MaterialIcon name="arrow_back" size={16} />
          Voltar para a escala pública
        </Link>
      </form>
    </div>
  );
}
