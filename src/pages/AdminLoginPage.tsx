import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { MaterialIcon } from '../components/icons/MaterialIcon';
import { IconGoogle } from '../components/icons/IconGoogle';
import styles from './AdminLoginPage.module.css';

export function AdminLoginPage() {
  const { user, acessoNegado, loading, loginComGoogle, logout } = useAuth();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <MaterialIcon name="admin_panel_settings" size={28} />
        </div>
        <h1>Área Administrativa</h1>
        <p className={styles.sub}>Ministério de Louvor · Igreja Batista Memorial</p>

        {loading ? (
          <p className={styles.status}>Verificando sessão...</p>
        ) : acessoNegado ? (
          <>
            <p className={styles.negado}>
              A conta <strong>{user?.email}</strong> não tem acesso à área administrativa.
            </p>
            <Button variant="ghost" icon="logout" onClick={logout} style={{ width: '100%', justifyContent: 'center' }}>
              Tentar com outra conta
            </Button>
          </>
        ) : (
          <button className={styles.googleBtn} onClick={loginComGoogle}>
            <IconGoogle size={18} />
            Entrar com Google
          </button>
        )}

        <Link to="/" className={styles.voltar}>
          <MaterialIcon name="arrow_back" size={16} />
          Voltar para a escala pública
        </Link>
      </div>
    </div>
  );
}
