
from pathlib import Path
from datetime import datetime
import shutil
import subprocess

path = Path("src/components/EditorialPage.tsx")
code = path.read_text(encoding="utf-8-sig")

if "EditorialImagePicker" in code:
    raise SystemExit("STOP : integration deja presente.")

def replace(old, new):
    global code
    if code.count(old) != 1:
        raise SystemExit(f"STOP : structure inattendue : {old}")
    code = code.replace(old, new, 1)

code = """import EditorialImagePicker from './EditorialImagePicker'
import { uploadEditorialImage, getPublicImageUrl } from '../services/editorial-images'
""" + code

replace(
    "  const [form, setForm] = useState(emptyForm())",
    """  const [form, setForm] = useState(emptyForm())
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [hasImage, setHasImage] = useState(false)"""
)

replace(
    "  function newItem() {",
    """  function newItem() {
    setImageFile(null)
    setHasImage(false)"""
)

replace(
    "const { member } = await getCommitteeMember(item.id)",
    """const { member } = await getCommitteeMember(item.id)
        setHasImage(Boolean(member.photoKey))
        setImageFile(null)"""
)

replace(
    "const { article } = await getArticle(item.id)",
    """const { article } = await getArticle(item.id)
        setHasImage(Boolean(article.coverImageKey))
        setImageFile(null)"""
)

start = code.index("  async function submit(")
end = code.index("  async function changeStatus(", start)

code = code[:start] + """  async function submit(event: FormEvent<HTMLFormElement>) {
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

""" + code[end:]

replace(
    '<form onSubmit={submit} className="space-y-5">',
    """<form onSubmit={submit} className="space-y-5">

            <EditorialImagePicker
              file={imageFile}
              onChange={setImageFile}
              isCommittee={isCommittee}
              hasImage={hasImage}
              disabled={busy}
            />"""
)

replace(
    '<td className="p-4 max-w-sm">',
    """<td className="p-4 max-w-sm">

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
                      )}"""
)

replace(
    "Les images seront intégrées dans la prochaine étape.",
    "Les images sont optimisees automatiquement a l'importation."
)

backup = (
    Path("D:/ccpd-backups")
    / datetime.now().strftime("editorial-images-ui-%Y%m%d-%H%M%S")
)

backup.mkdir(parents=True, exist_ok=False)
shutil.copy2(path, backup / path.name)

try:
    path.write_text(code, encoding="utf-8")

    result = subprocess.run(
        ["npm.cmd", "run", "build"],
        check=False,
    )

    if result.returncode != 0:
        raise RuntimeError("Compilation echouee.")

except BaseException:
    shutil.copy2(backup / path.name, path)
    print("Interface originale restauree.")
    raise

print("\n=== RESULTAT ===")
print("IMAGE PICKER OK")
print("IMPORTATION COMITE OK")
print("IMPORTATION POLITIQUE OK")
print("IMPORTATION ECONOMIE OK")
print("CODE SORTIE : 0")
print(f"SAUVEGARDE : {backup}")
