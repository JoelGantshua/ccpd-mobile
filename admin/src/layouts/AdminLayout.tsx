import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  ShieldCheck, LayoutDashboard, Users, MapPin,
  MessageSquare, Handshake, Network, Landmark,
  TrendingUp, Files, BookOpen, FileSpreadsheet,
  Settings, LogOut, Menu, X,
} from 'lucide-react'
import type { AdminUser } from '../types/auth'

const groups = [
  {
    title: 'ADMINISTRATION',
    items: [
      { to: '/', label: 'Vue générale', icon: LayoutDashboard },
      { to: '/membres', label: 'Membres', icon: Users },
      { to: '/provinces', label: 'Provinces', icon: MapPin },
      { to: '/avis', label: 'Avis', icon: MessageSquare },
      { to: '/participations', label: 'Participations', icon: Handshake },
    ],
  },
  {
    title: 'GESTION DES CONTENUS',
    items: [
      { to: '/comite', label: 'Le Comité', icon: Network },
      { to: '/politique', label: 'Politique', icon: Landmark },
      { to: '/economie', label: 'Économie', icon: TrendingUp },
      { to: '/documents', label: 'Documents', icon: Files },
      { to: '/doctrines', label: 'Doctrines', icon: BookOpen },
    ],
  },
  {
    title: 'OUTILS',
    items: [
      { to: '/rapports', label: 'Rapports Excel', icon: FileSpreadsheet },
      { to: '/parametres', label: 'Paramètres', icon: Settings },
    ],
  },
]

interface Props {
  user: AdminUser
  onLogout: () => Promise<void>
}

export default function AdminLayout({ user, onLogout }: Props) {
  const [open, setOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)

  async function leave() {
    if (leaving) return
    setLeaving(true)
    await onLogout()
  }

  return (
    <div className="min-h-screen bg-ccpd-background">
      {open && (
        <button
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 w-64
        bg-ccpd-navy text-white z-40 flex flex-col
        transition-transform lg:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="p-5 border-b border-white/10
          flex items-center gap-3">
          <ShieldCheck className="text-ccpd-gold shrink-0" size={34} />

          <div className="flex-1">
            <p className="font-bold text-sm">CCPD BLOC EST RDC</p>
            <p className="text-ccpd-gold text-xs">Administration</p>
          </div>

          <button className="lg:hidden"
            aria-label="Fermer"
            onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {groups.map(group => (
            <div key={group.title} className="mb-6">
              <p className="text-[10px] tracking-wider
                text-ccpd-gold font-semibold px-3 mb-3">
                {group.title}
              </p>

              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5
                    rounded-lg mb-1 text-sm transition-colors
                    ${isActive
                      ? 'bg-white/15 text-ccpd-gold'
                      : 'text-slate-200 hover:bg-white/10'}`
                  }
                >
                  <item.icon size={19} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            disabled={leaving}
            onClick={() => void leave()}
            className="flex items-center gap-3 p-3
              text-sm w-full rounded-lg hover:bg-white/10"
          >
            <LogOut size={19} />
            {leaving ? 'Déconnexion...' : 'Déconnexion'}
          </button>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="h-20 bg-white border-b
          border-slate-200 flex items-center justify-between
          px-5 lg:px-8">

          <div className="flex items-center gap-3">
            <button className="lg:hidden"
              aria-label="Ouvrir le menu"
              onClick={() => setOpen(true)}>
              <Menu />
            </button>

            <span className="font-semibold text-sm">
              Administration centrale
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold">{user.fullName}</p>
              <p className="text-xs text-slate-500">Administrateur</p>
            </div>

            <div className="w-10 h-10 rounded-full
              bg-ccpd-navy text-ccpd-gold flex
              items-center justify-center font-bold">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}