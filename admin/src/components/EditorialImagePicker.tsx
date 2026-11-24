import { useEffect, useState } from 'react'
import { ImagePlus, X, UserRound } from 'lucide-react'

interface Props {
  file: File | null
  onChange: (file: File | null) => void
  isCommittee: boolean
  hasImage: boolean
  disabled?: boolean
}

export default function EditorialImagePicker({
  file,
  onChange,
  isCommittee,
  hasImage,
  disabled = false,
}: Props) {
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!file) {
      setPreview('')
      return
    }

    const url = URL.createObjectURL(file)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [file])

  function selectFile(selected?: File) {
    if (!selected) return

    setError('')

    if (![
      'image/jpeg',
      'image/png',
      'image/webp',
    ].includes(selected.type)) {
      setError('Formats acceptés : JPEG, PNG et WebP.')
      return
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError('La taille maximale est de 5 Mo.')
      return
    }

    if (selected.size === 0) {
      setError('Le fichier sélectionné est vide.')
      return
    }

    onChange(selected)
  }

  return (
    <section className="border border-slate-200
      rounded-xl p-5 space-y-4">

      <div>
        <h3 className="font-semibold text-ccpd-navy">
          {isCommittee
            ? 'Photographie du membre'
            : 'Image de couverture'}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          JPEG, PNG ou WebP. Maximum 5 Mo.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5">

        <div className={`bg-slate-100 overflow-hidden
          flex items-center justify-center
          ${isCommittee
            ? 'w-32 h-32 rounded-full'
            : 'w-64 aspect-video rounded-lg'}`}>

          {preview ? (
            <img
              src={preview}
              alt="Prévisualisation"
              className="w-full h-full object-contain"
            />
          ) : isCommittee ? (
            <UserRound size={44}
              className="text-slate-400" />
          ) : (
            <ImagePlus size={44}
              className="text-slate-400" />
          )}
        </div>

        <div className="space-y-3 flex-1 min-w-48">

          {hasImage && !file && (
            <p className="text-sm text-emerald-700">
              Une image est déjà enregistrée.
            </p>
          )}

          <label className={`inline-flex items-center gap-2
            border border-slate-300 rounded-lg px-4 py-2
            text-sm ${disabled
              ? 'opacity-50'
              : 'cursor-pointer hover:bg-slate-50'}`}>

            <ImagePlus size={18} />

            {hasImage || file
              ? 'Remplacer l’image'
              : 'Choisir une image'}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              disabled={disabled}
              onChange={event => {
                selectFile(event.target.files?.[0])
                event.target.value = ''
              }}
            />
          </label>

          {file && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500
                break-all">
                {file.name}
                {' · '}
                {(file.size / 1024).toFixed(0)} Ko
              </span>

              <button
                type="button"
                disabled={disabled}
                aria-label="Annuler la sélection"
                onClick={() => {
                  onChange(null)
                  setError('')
                }}
                className="text-red-600"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <p className="text-xs text-slate-500">
        L’image sera optimisée automatiquement par le serveur.
      </p>
    </section>
  )
}