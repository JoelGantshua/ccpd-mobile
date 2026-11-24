import EditorialImagePicker from './EditorialImagePicker'
import { uploadEditorialImage, getPublicImageUrl } from '../services/editorial-images'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import {
  Plus, Pencil, Archive, Send,
  RotateCcw, RefreshCw, X, Search,
  ChevronLeft, ChevronRight, LoaderCircle,
} from 'lucide-react'

import {
  getProvinces,
  getCommittee,
  getCommitteeMember,
  saveCommitteeMember,
  changeCommitteeStatus,
  getArticles,
  getArticle,
  saveArticle,
  changeArticleStatus,
} from '../services/editorial'

import type {
  CommitteeMember,
  Article,
  ArticleCategory,
  EditorialStatus,
  EditorialAction,
  Province,
  Pagination,
} from '../types/editorial'

type Mode = 'COMMITTEE' | ArticleCategory
type Item = CommitteeMember | Article

const statusLabels: Record<EditorialStatus, string> = {
  DRAFT: 'Brouillon',
  PUBLISHED: 'Publié',
  ARCHIVED: 'Archivé',
}

const statusColors: Record<EditorialStatus, string> = {
  DRAFT: 'bg-amber-100 text-amber-800',
  PUBLISHED: 'bg-emerald-100 text-emerald-800',
  ARCHIVED: 'bg-slate-200 text-slate-700',
}

const fieldClass =
  'w-full border border-slate-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-ccpd-gold'

const secondaryButton =
  'border border-slate-300 rounded-lg px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50'

const primaryButton =
  'bg-ccpd-navy text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50'

function emptyForm() {
  return {
    fullName: '',
    position: '',
    biography: '',
    provinceId: '',
    displayOrder: 0,
    title: '',
    summary: '',
    content: '',
  }
}

function itemTitle(item: Item) {
  return 'fullName' in item
    ? item.fullName
    : item.title
}

function itemDescription(item: Item) {
  return 'position' in item
    ? item.position
    : item.summary
}

function errorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Une erreur est survenue.'
}

export default function EditorialPage({ mode }: { mode: Mode }) {
  const isCommittee = mode === 'COMMITTEE'

  const heading = isCommittee
    ? 'Gestion du Comité'
    : mode === 'POLITIQUE'
      ? 'Articles politiques'
      : 'Articles économiques'

  const [items, setItems] = useState<Item[]>([])
  const [provinces, setProvinces] = useState<Province[]>([])
  const [page, setPage] = useState(1)
  const [pagination, setPagination] =
    useState<Pagination | null>(null)

  const [search, setSearch] = useState('')
  const [status, setStatus] =
    useState<EditorialStatus | 'ALL'>('ALL')

  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [revision, setRevision] = useState(0)

  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [hasImage, setHasImage] = useState(false)

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setError('')

      try {
        const result = mode === 'COMMITTEE'
          ? await getCommittee(page)
          : await getArticles(mode, page)

        if (!active) return

        setItems(result.items)
        setPagination(result.pagination)
      } catch (err) {
        if (active) {
          setItems([])
          setPagination(null)
          setError(errorMessage(err))
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => { active = false }
  }, [mode, page, revision])

  useEffect(() => {
    if (!isCommittee) return

    let active = true

    getProvinces()
      .then(result => {
        if (active) setProvinces(result)
      })
      .catch(err => {
        if (active) setError(errorMessage(err))
      })

    return () => { active = false }
  }, [isCommittee, revision])

  function reload() {
    setRevision(value => value + 1)
  }

  function newItem() {
    setImageFile(null)
    setHasImage(false)
    setEditingId(null)
    setForm(emptyForm())
    setError('')
    setMessage('')
    setFormOpen(true)
  }

  async function editItem(item: Item) {
    if (busy || item.status !== 'DRAFT') return

    setBusy(true)
    setError('')
    setMessage('')

    try {
      if ('fullName' in item) {
        const { member } = await getCommitteeMember(item.id)
        setHasImage(Boolean(member.photoKey))
        setImageFile(null)

        setForm({
          ...emptyForm(),
          fullName: member.fullName,
          position: member.position,
          biography: member.biography || '',
          provinceId: member.provinceId || '',
          displayOrder: member.displayOrder,
        })
      } else {
        const { article } = await getArticle(item.id)
        setHasImage(Boolean(article.coverImageKey))
        setImageFile(null)

        setForm({
          ...emptyForm(),
          title: article.title,
          summary: article.summary,
          content: article.content || '',
        })
      }

      setEditingId(item.id)
      setFormOpen(true)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (busy) return

    setBusy(true)
    setError('')
    setMessage('')

    let savedId: string

    try {
      if (mode === 'COMMITTEE') {
        const { member } = await saveCommitteeMember({
          fullName: form.fullName.trim(),
          position: form.position.trim(),
          biography: form.biography.trim() || null,
          provinceId: form.provinceId || null,
          displayOrder: form.displayOrder,
        }, editingId || undefined)

        savedId = member.id
      } else {
        const { article } = await saveArticle({
          title: form.title.trim(),
          summary: form.summary.trim(),
          content: form.content.trim(),
          category: mode,
        }, editingId || undefined)

        savedId = article.id
      }

      setEditingId(savedId)

      if (imageFile) {
        try {
          await uploadEditorialImage(
            isCommittee ? 'committee' : 'articles',
            savedId,
            imageFile,
          )

          setHasImage(true)
          setImageFile(null)
        } catch (err) {
          setError(
            'Brouillon enregistre. Image non importee : ' +
            errorMessage(err),
          )
          return
        }
      }

      setFormOpen(false)
      setEditingId(null)
      setMessage('Brouillon enregistre avec succes.')

      if (!editingId) setPage(1)

      reload()
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function changeStatus(
    item: Item,
    action: EditorialAction,
  ) {
    if (busy) return

    const descriptions = {
      publish: 'Publier ce contenu ? Il deviendra public.',
      archive: 'Archiver ce contenu ? Il ne sera plus public.',
      draft: 'Remettre ce contenu en brouillon ? Il ne sera plus public.',
    }

    if (!window.confirm(descriptions[action])) return

    setBusy(true)
    setError('')
    setMessage('')

    try {
      if (isCommittee) {
        await changeCommitteeStatus(item.id, action)
      } else {
        await changeArticleStatus(item.id, action)
      }

      setMessage('Statut mis à jour avec succès.')
      reload()
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const filtered = items.filter(item => {
    const matchesStatus =
      status === 'ALL' || item.status === status

    const text =
      `${itemTitle(item)} ${itemDescription(item)}`.toLowerCase()

    return matchesStatus &&
      text.includes(search.trim().toLowerCase())
  })

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center
        justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">{heading}</h1>
          <p className="text-slate-500 mt-2">
            Administration des contenus CCPD.
          </p>
        </div>

        <button
          disabled={busy || formOpen}
          onClick={newItem}
          className={`${primaryButton} flex items-center gap-2`}
        >
          <Plus size={18} />
          {isCommittee ? 'Ajouter un membre' : 'Nouvel article'}
        </button>
      </div>

      {error && (
        <div role="alert" className="bg-red-50 border
          border-red-200 text-red-700 rounded-lg p-4">
          {error}
        </div>
      )}

      {message && (
        <div role="status" className="bg-emerald-50 border
          border-emerald-200 text-emerald-700 rounded-lg p-4">
          {message}
        </div>
      )}

      {formOpen && (
        <section className="bg-white border border-slate-200
          rounded-xl p-6">

          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">
              {editingId ? 'Modifier le brouillon' :
                isCommittee ? 'Nouveau membre' : 'Nouvel article'}
            </h2>

            <button
              disabled={busy}
              aria-label="Fermer le formulaire"
              onClick={() => setFormOpen(false)}
            >
              <X />
            </button>
          </div>

          <form onSubmit={submit} className="space-y-5">

            <EditorialImagePicker
              file={imageFile}
              onChange={setImageFile}
              isCommittee={isCommittee}
              hasImage={hasImage}
              disabled={busy}
            />

            {isCommittee ? (
              <>
                <div className="grid md:grid-cols-2 gap-5">
                  <label className="space-y-2">
                    <span className="text-sm font-medium">
                      Nom complet *
                    </span>
                    <input
                      className={fieldClass}
                      required
                      minLength={2}
                      maxLength={150}
                      value={form.fullName}
                      onChange={e => setForm({
                        ...form, fullName: e.target.value,
                      })}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium">
                      Fonction *
                    </span>
                    <input
                      className={fieldClass}
                      required
                      minLength={2}
                      maxLength={200}
                      value={form.position}
                      onChange={e => setForm({
                        ...form, position: e.target.value,
                      })}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium">
                      Province
                    </span>
                    <select
                      className={fieldClass}
                      value={form.provinceId}
                      onChange={e => setForm({
                        ...form, provinceId: e.target.value,
                      })}
                    >
                      <option value="">Comité central</option>
                      {provinces.map(province => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-medium">
                      Ordre d'affichage
                    </span>
                    <input
                      className={fieldClass}
                      type="number"
                      required
                      min={0}
                      max={10000}
                      step={1}
                      value={form.displayOrder}
                      onChange={e => setForm({
                        ...form,
                        displayOrder: Number(e.target.value),
                      })}
                    />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-sm font-medium">
                    Biographie
                  </span>
                  <textarea
                    className={fieldClass}
                    rows={6}
                    maxLength={10000}
                    value={form.biography}
                    onChange={e => setForm({
                      ...form, biography: e.target.value,
                    })}
                  />
                </label>
              </>
            ) : (
              <>
                <label className="block space-y-2">
                  <span className="text-sm font-medium">
                    Titre *
                  </span>
                  <input
                    className={fieldClass}
                    required
                    minLength={3}
                    maxLength={250}
                    value={form.title}
                    onChange={e => setForm({
                      ...form, title: e.target.value,
                    })}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium">
                    Résumé *
                  </span>
                  <textarea
                    className={fieldClass}
                    required
                    rows={3}
                    minLength={10}
                    maxLength={1000}
                    value={form.summary}
                    onChange={e => setForm({
                      ...form, summary: e.target.value,
                    })}
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium">
                    Contenu de l'article *
                  </span>
                  <textarea
                    className={fieldClass}
                    required
                    rows={14}
                    minLength={20}
                    maxLength={50000}
                    value={form.content}
                    onChange={e => setForm({
                      ...form, content: e.target.value,
                    })}
                  />
                  <span className="text-xs text-slate-500">
                    {form.content.length} / 50000 caractères
                  </span>
                </label>
              </>
            )}

            <div className="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                disabled={busy}
                className={secondaryButton}
                onClick={() => setFormOpen(false)}
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={busy}
                className={primaryButton}
              >
                {busy
                  ? 'Enregistrement...'
                  : 'Enregistrer le brouillon'}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="bg-white border border-slate-200
        rounded-xl overflow-hidden">

        <div className="p-5 flex flex-wrap items-center gap-3
          border-b border-slate-200">

          <div className="relative flex-1 min-w-48">
            <Search size={18}
              className="absolute left-3 top-3 text-slate-400" />

            <input
              className={`${fieldClass} pl-10`}
              placeholder="Rechercher sur cette page..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            aria-label="Filtrer par statut"
            className="border border-slate-300 rounded-lg p-2.5"
            value={status}
            onChange={e => setStatus(
              e.target.value as EditorialStatus | 'ALL',
            )}
          >
            <option value="ALL">Tous les statuts</option>
            <option value="DRAFT">Brouillons</option>
            <option value="PUBLISHED">Publiés</option>
            <option value="ARCHIVED">Archivés</option>
          </select>

          <button
            aria-label="Actualiser"
            disabled={loading || busy}
            className={secondaryButton}
            onClick={reload}
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <LoaderCircle className="animate-spin mx-auto mb-3" />
            Chargement...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-semibold">
              {pagination === null
                ? 'Liste indisponible'
                : 'Aucun contenu à afficher'}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              {pagination === null
                ? 'Vérifiez la connexion et actualisez.'
                : 'Créez un contenu ou modifiez les filtres.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="p-4">
                    {isCommittee ? 'Membre' : 'Article'}
                  </th>
                  <th className="p-4">Statut</th>
                  <th className="p-4">Modification</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(item => (
                  <tr key={item.id}
                    className="border-t border-slate-100">

                    <td className="p-4 max-w-sm">

                      {item.status === 'PUBLISHED' &&
                        ('fullName' in item
                          ? item.photoKey
                          : item.coverImageKey) && (
                        <img
                          src={getPublicImageUrl(
                            'fullName' in item
                              ? 'committee'
                              : 'articles',
                            item.id,
                          )}
                          alt={itemTitle(item)}
                          loading="lazy"
                          className={`mb-2 object-cover ${
                            'fullName' in item
                              ? 'w-14 h-14 rounded-full'
                              : 'w-28 h-16 rounded-lg'
                          }`}
                        />
                      )}

                      {('fullName' in item
                        ? item.photoKey
                        : item.coverImageKey) && (
                        <p className="text-xs text-emerald-700 mb-1">
                          Image enregistree
                        </p>
                      )}
                      <p className="font-semibold">
                        {itemTitle(item)}
                      </p>
                      <p className="text-slate-500 text-xs
                        line-clamp-2 mt-1">
                        {itemDescription(item)}
                      </p>

                      {'fullName' in item && (
                        <p className="text-xs text-slate-400 mt-1">
                          {item.province?.name || 'Comité central'}
                          {' · Ordre : '}{item.displayOrder}
                        </p>
                      )}
                    </td>

                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1
                        text-xs font-medium ${statusColors[item.status]}`}>
                        {statusLabels[item.status]}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      {new Date(item.updatedAt)
                        .toLocaleDateString('fr-FR')}
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">

                        {item.status === 'DRAFT' && (
                          <>
                            <button
                              title="Modifier"
                              aria-label="Modifier"
                              disabled={busy || formOpen}
                              className={secondaryButton}
                              onClick={() => void editItem(item)}
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              disabled={busy || formOpen}
                              className={`${primaryButton}
                                flex items-center gap-2`}
                              onClick={() => void changeStatus(
                                item, 'publish',
                              )}
                            >
                              <Send size={15} /> Publier
                            </button>
                          </>
                        )}

                        {item.status !== 'DRAFT' && (
                          <button
                            title="Remettre en brouillon"
                            aria-label="Remettre en brouillon"
                            disabled={busy || formOpen}
                            className={secondaryButton}
                            onClick={() => void changeStatus(
                              item, 'draft',
                            )}
                          >
                            <RotateCcw size={16} />
                          </button>
                        )}

                        {item.status !== 'ARCHIVED' && (
                          <button
                            title="Archiver"
                            aria-label="Archiver"
                            disabled={busy || formOpen}
                            className={secondaryButton}
                            onClick={() => void changeStatus(
                              item, 'archive',
                            )}
                          >
                            <Archive size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && (
          <div className="p-4 border-t border-slate-200
            flex flex-wrap items-center justify-between gap-3">

            <p className="text-sm text-slate-500">
              {pagination.total} contenu(s) au total
            </p>

            <div className="flex items-center gap-3">
              <button
                aria-label="Page précédente"
                className={secondaryButton}
                disabled={page <= 1 || loading || busy || formOpen}
                onClick={() => setPage(value => value - 1)}
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm">
                {page} / {Math.max(1, pagination.totalPages)}
              </span>

              <button
                aria-label="Page suivante"
                className={secondaryButton}
                disabled={
                  page >= pagination.totalPages ||
                  loading || busy || formOpen
                }
                onClick={() => setPage(value => value + 1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </section>

      <p className="text-xs text-slate-500">
        Les contenus publiés sont accessibles via les API publiques.
        Les images sont optimisees automatiquement a l'importation.
      </p>
    </div>
  )
}