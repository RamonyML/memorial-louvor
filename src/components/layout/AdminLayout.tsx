import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { MaterialIcon } from '../icons/MaterialIcon';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminLayout.module.css';

const TABS = [
  { to: '/admin/escala', label: 'Escala', icon: 'calendar_month' },
  { to: '/admin/musicos', label: 'Músicos', icon: 'groups' },
  { to: '/admin/exportar', label: 'Exportar', icon: 'ios_share' },
  { to: '/admin/tema', label: 'Tema', icon: 'palette' },
];

export function AdminLayout() {
  const { isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/admin" replace />;

  function sair() {
    logout();
    navigate('/');
  }

  return (
    <div className={styles.page}>
      <Header
        right={
          <>
            <nav className={styles.tabs}>
              {TABS.map((t) => (
                <NavLink
                  key={t.to}
                  to={t.to}
                  className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
                >
                  <MaterialIcon name={t.icon} size={17} />
                  {t.label}
                </NavLink>
              ))}
            </nav>
            <a href="/" target="_blank" rel="noreferrer" className={styles.ghostLink}>
              <MaterialIcon name="open_in_new" size={16} />
              Página pública
            </a>
            <button className={styles.sair} onClick={sair}>
              <MaterialIcon name="logout" size={17} />
            </button>
          </>
        }
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
