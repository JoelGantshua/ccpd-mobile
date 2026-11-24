import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Construction } from 'lucide-react'
import LoginPage from './pages/auth/LoginPage'
import { InstitutionOverview, InstitutionList } from './components/InstitutionPage'
import AdminLayout from './layouts/AdminLayout'
import EditorialPage from './components/EditorialPage'
import PublicationsPage from './components/PublicationsPage'
import ReportsPage from './components/ReportsPage'
import { logout } from './services/auth'
import type { AdminUser } from './types/auth'

const pages = [
  ['parametres', 'Paramètres'],
]

function PendingPage({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      <div className="bg-white rounded-xl border
        border-slate-200 p-12 text-center">
        <Construction className="mx-auto text-ccpd-gold mb-4"
          size={42} />

        <h2 className="font-semibold text-lg">
          Module en cours de développement
        </h2>

        <p className="text-slate-500 mt-2">
          Cette fonctionnalité sera disponible prochainement.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState<AdminUser | null>(null)

  async function handleLogout() {
    try {
      await logout()
    } catch {
      window.alert(
        'Session locale fermee. Revocation serveur non confirmee.',
      )
    } finally {
      setUser(null)
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/connexion"
          element={user
            ? <Navigate to="/" replace />
            : <LoginPage onLogin={setUser} />}
        />

        <Route
          element={user?.role === 'ADMIN'
            ? <AdminLayout user={user} onLogout={handleLogout} />
            : <Navigate to="/connexion" replace />}
        >
          <Route index element={<InstitutionOverview />} />
          <Route path="provinces" element={<InstitutionOverview provincesOnly />} />
          <Route path="membres" element={<InstitutionList key="members" mode="members" />} />
          <Route path="avis" element={<InstitutionList key="opinions" mode="opinions" />} />
          <Route path="participations" element={<InstitutionList key="participations" mode="participations" />} />

          <Route path="comite"
            element={<EditorialPage key="committee" mode="COMMITTEE" />} />

          <Route path="politique"
            element={<EditorialPage key="politique" mode="POLITIQUE" />} />

          <Route path="economie"
            element={<EditorialPage key="economie" mode="ECONOMIE" />} />

          <Route path="documents" element={<PublicationsPage key="documents" type="DOCUMENT" />} />
          <Route path="doctrines" element={<PublicationsPage key="doctrines" type="DOCTRINE" />} />
          <Route path="rapports" element={<ReportsPage />} />
          {pages.map(([path, title]) => (
            <Route key={path} path={path}
              element={<PendingPage title={title} />} />
          ))}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}