import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ScheduleProvider } from './context/ScheduleContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { WaveBackground } from './components/common/WaveBackground';
import { AdminLayout } from './components/layout/AdminLayout';
import { PublicSchedulePage } from './pages/PublicSchedulePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminSchedulePage } from './pages/AdminSchedulePage';
import { AdminMembersPage } from './pages/AdminMembersPage';
import { AdminExportPage } from './pages/AdminExportPage';

/** "/admin" mostra o login, ou redireciona quem já está autenticado. */
function AdminIndex() {
  const { isAdmin } = useAuth();
  return isAdmin ? <Navigate to="/admin/escala" replace /> : <AdminLoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <ScheduleProvider>
        <ToastProvider>
          <WaveBackground />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PublicSchedulePage />} />
              <Route path="/admin" element={<AdminIndex />} />
              <Route element={<AdminLayout />}>
                <Route path="/admin/escala" element={<AdminSchedulePage />} />
                <Route path="/admin/musicos" element={<AdminMembersPage />} />
                <Route path="/admin/exportar" element={<AdminExportPage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </ScheduleProvider>
    </AuthProvider>
  );
}

export default App;
