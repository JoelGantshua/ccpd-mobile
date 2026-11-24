import {
  Users, MapPin, MessageSquare,
  Handshake, ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const indicators = [
  { label: 'Membres', icon: Users, to: '/membres' },
  { label: 'Avis', icon: MessageSquare, to: '/avis' },
  { label: 'Participations', icon: Handshake, to: '/participations' },
  { label: 'Provinces', icon: MapPin, to: '/provinces' },
]

const contents = [
  { title: 'Le Comité', to: '/comite' },
  { title: 'Politique', to: '/politique' },
  { title: 'Économie', to: '/economie' },
  { title: 'Documents', to: '/documents' },
  { title: 'Doctrines', to: '/doctrines' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-slate-500 mt-2">
          Bienvenue dans votre espace d'administration CCPD.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {indicators.map(item => (
          <Link key={item.to} to={item.to}
            className="bg-white border border-slate-200
              rounded-xl p-5 hover:shadow-md transition-shadow">
            <item.icon className="text-ccpd-navy mb-5" size={26} />
            <p className="text-3xl font-bold">—</p>
            <p className="text-sm text-slate-500 mt-2">
              {item.label}
            </p>
          </Link>
        ))}
      </div>

      <section className="bg-white border border-slate-200
        rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2">
          Gestion des contenus
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Rubriques de l'application mobile CCPD.
        </p>

        {contents.map(item => (
          <Link key={item.to} to={item.to}
            className="flex items-center justify-between
              py-4 border-b border-slate-100
              hover:text-slate-500">
            <span className="font-medium">{item.title}</span>
            <ArrowRight size={18} />
          </Link>
        ))}
      </section>
    </div>
  )
}