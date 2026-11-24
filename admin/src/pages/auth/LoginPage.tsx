import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ShieldCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  LoaderCircle,
} from 'lucide-react'
import { login } from '../../services/auth'
import type { AdminUser } from '../../types/auth'

interface Props {
  onLogin: (user: AdminUser) => void
}

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) return

    setError('')
    setLoading(true)

    try {
      const user = await login(
        email.trim().toLowerCase(),
        password,
      )

      setPassword('')
      onLogin(user)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Connexion impossible.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <section className="hidden lg:flex bg-ccpd-navy
        text-white flex-col justify-center p-16 xl:p-24">
        <ShieldCheck className="w-20 h-20 text-ccpd-gold mb-8" />

        <p className="text-ccpd-gold tracking-widest
          uppercase text-sm mb-4">
          Plateforme institutionnelle
        </p>

        <h1 className="text-5xl font-bold leading-tight">
          CCPD<br />BLOC EST RDC
        </h1>

        <div className="w-20 h-1 bg-ccpd-gold my-8" />

        <p className="text-slate-300 text-lg leading-relaxed">
          Espace centralisé de gestion des membres,
          des publications et des contributions citoyennes.
        </p>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border
          border-slate-200 rounded-2xl p-8 shadow-sm">

          <div className="w-14 h-14 bg-ccpd-navy
            rounded-xl flex items-center justify-center mb-6">
            <LockKeyhole className="text-ccpd-gold" />
          </div>

          <h2 className="text-2xl font-bold">
            Connexion administrateur
          </h2>

          <p className="text-slate-500 text-sm mt-2 mb-8">
            Accédez à votre espace de gestion sécurisé.
          </p>

          <form onSubmit={submit} className="space-y-5">
            {error && (
              <div role="alert" className="bg-red-50 border
                border-red-200 text-red-700 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email"
                className="block text-sm font-medium mb-2">
                Adresse e-mail
              </label>

              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                maxLength={254}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-slate-300
                  rounded-lg px-4 py-3 outline-none
                  focus:ring-2 focus:ring-ccpd-gold"
                placeholder="administrateur@exemple.com"
              />
            </div>

            <div>
              <label htmlFor="password"
                className="block text-sm font-medium mb-2">
                Mot de passe
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={visible ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  maxLength={128}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-slate-300
                    rounded-lg px-4 py-3 pr-12 outline-none
                    focus:ring-2 focus:ring-ccpd-gold"
                />

                <button
                  type="button"
                  aria-label={visible
                    ? 'Masquer le mot de passe'
                    : 'Afficher le mot de passe'}
                  onClick={() => setVisible(!visible)}
                  className="absolute right-4 top-3.5 text-slate-500"
                >
                  {visible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ccpd-navy text-white
                font-semibold rounded-lg py-3 flex items-center
                justify-center gap-2 hover:opacity-90
                disabled:opacity-50"
            >
              {loading && <LoaderCircle className="animate-spin" size={18} />}
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-8">
            CCPD Bloc Est RDC - Accès réservé
          </p>
        </div>
      </section>
    </main>
  )
}