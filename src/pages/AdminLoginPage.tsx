import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { MaterialIcon } from '../components/icons/MaterialIcon';
import styles from './AdminLoginPage.module.css';

export function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (login(senha)) {
      navigate('/admin/escala');
    } else {
      setErro(true);
    }
  }

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.iconWrap}>
          <MaterialIcon name="admin_panel_settings" size={28} />
        </div>
        <h1>Área Administrativa</h1>
        <p className={styles.sub}>Ministério de Louvor · Igreja Batista Memorial</p>

        <div className={styles.field}>
          <label htmlFor="senha">Senha de acesso</label>
          <input
            id="senha"
            type="password"
            autoFocus
            value={senha}
            onChange={(e) => { setSenha(e.target.value); setErro(false); }}
            placeholder="Digite a senha"
          />
          {erro && <span className={styles.erro}>Senha incorreta. Tente novamente.</span>}
        </div>

        <Button type="submit" icon="login" style={{ width: '100%', justifyContent: 'center' }}>
          Entrar
        </Button>

        <Link to="/" className={styles.voltar}>
          <MaterialIcon name="arrow_back" size={16} />
          Voltar para a escala pública
        </Link>
      </form>
    </div>
  );
}
