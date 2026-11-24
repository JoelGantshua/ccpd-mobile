from pathlib import Path
from datetime import datetime
import subprocess, shutil
root=Path(r'D:\ccpd-mobile'); a=root/'admin'; b=root/'backend'
changes={}
def edit(p,old,new):
 s=changes.get(p,p.read_text(encoding='utf-8-sig'))
 if s.count(old)!=1: raise RuntimeError(f'Ancre incorrecte: {p}: {old[:80]}')
 changes[p]=s.replace(old,new)
def new(p,s):
 if p.exists(): raise RuntimeError(f'Fichier existe: {p}')
 changes[p]=s
p=b/'src/publications/publications.service.ts'
edit(p,"    if (!id) throw new ConflictException('Creation de doctrine temporairement bloquee avant contrainte unique.');","    if (!id) return {doctrineNumber:dto.doctrineNumber!,doctrineVersion:dto.doctrineVersion!};")
edit(p,'const publication = await this.prisma.publication.create({','const publication = await this.prisma.publication.create({')
source = changes[p]
start = source.index('async createDraft(')
end = source.index('async attachPdf(', start)
section = source[start:end]
anchor = '    });'
if section.count(anchor) != 1:
    raise RuntimeError('Ancre createDraft incorrecte')
section = section.replace(anchor, '''    }).catch((error: unknown) => {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        throw new ConflictException('Version de doctrine deja existante.');
      }
      throw error;
    });''', 1)
changes[p] = source[:start] + section + source[end:]
p=a/'src/services/api.ts'
edit(p,"  headers.set('Accept', 'application/json')","  if (!headers.has('Accept')) headers.set('Accept', 'application/json')")
edit(p,'    return await response.json() as T', '''    if (headers.get('Accept') === 'application/pdf') {
      if (!response.headers.get('Content-Type')?.toLowerCase().startsWith('application/pdf')) throw new ApiError('PDF invalide.', 502)
      return await response.blob() as T
    }
    return await response.json() as T''')
edit(p,"        409: 'Conflit avec les donnees existantes.',","        409: 'Conflit avec les donnees existantes.',\n        413: 'Fichier trop volumineux.',")
p=a/'src/App.tsx'
edit(p,"import EditorialPage from './components/EditorialPage'","import EditorialPage from './components/EditorialPage'\nimport PublicationsPage from './components/PublicationsPage'")
edit(p,"  ['documents', 'Gestion des documents'],\n  ['doctrines', 'Gestion des doctrines'],\n",'')
edit(p,'          {pages.map', '''          <Route path="documents" element={<PublicationsPage key="documents" type="DOCUMENT" />} />
          <Route path="doctrines" element={<PublicationsPage key="doctrines" type="DOCTRINE" />} />
          {pages.map''')
new(a/'src/types/publications.ts','''export type PublicationType = 'DOCUMENT' | 'DOCTRINE'
export type PublicationStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
export type DoctrineVersion = 'COURTE' | 'INTEGRALE'
export interface Publication {
 id: string; title: string; description: string | null; type: PublicationType; status: PublicationStatus;
 doctrineNumber: number | null; doctrineVersion: DoctrineVersion | null; fileName: string | null; fileSize: number | null;
}
export interface PublicationInput { title: string; description: string; type: PublicationType; doctrineNumber?: number; doctrineVersion?: DoctrineVersion }
''')
new(a/'src/services/publications.ts','''import { adminApi } from './auth'
import type { Publication, PublicationInput, PublicationType } from '../types/publications'
const base = '/admin/publications'
export const listPublications = (type: PublicationType, page: number) => adminApi<{items: Publication[]; pagination: {total: number; totalPages: number}}>(`${base}?type=${type}&page=${page}`)
export const savePublication = (data: PublicationInput, id?: string) => adminApi<{publication: {id: string}}>(id ? `${base}/${id}` : base, {method: id ? 'PATCH' : 'POST', body: JSON.stringify(data)})
export const uploadPdf = (id: string, file: File) => { const body = new FormData(); body.append('file', file); return adminApi(`${base}/${id}/file`, {method:'POST',body}) }
export const changeStatus = (id: string, action: 'publish' | 'archive' | 'draft') => adminApi(`${base}/${id}/${action}`, {method:'PATCH'})
export const previewPdf = (id: string) => adminApi<Blob>(`${base}/${id}/file`, {headers:{Accept:'application/pdf'}})
''')
new(a/'src/components/PublicationsPage.tsx','''import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Publication, PublicationInput, PublicationType, DoctrineVersion } from '../types/publications'
import { listPublications, savePublication, uploadPdf, changeStatus, previewPdf } from '../services/publications'
const button = 'rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:opacity-50'
const field = 'w-full rounded-lg border border-slate-300 p-2'
const labels = {DRAFT:'Brouillon', PUBLISHED:'Publié', ARCHIVED:'Archivé'}
export default function PublicationsPage({type}:{type:PublicationType}) {
 const [items,setItems] = useState<Publication[]>([])
 const [page,setPage] = useState(1), [pages,setPages] = useState(1), [total,setTotal] = useState(0)
 const [revision,setRevision] = useState(0), [busy,setBusy] = useState(false), [loading,setLoading] = useState(true)
 const [error,setError] = useState(''), [notice,setNotice] = useState('')
 const [search,setSearch] = useState(''), [status,setStatus] = useState('')
 const [form,setForm] = useState<PublicationInput|null>(null), [editing,setEditing] = useState<string|undefined>()
 const [file,setFile] = useState<File|null>(null), [preview,setPreview] = useState<Blob|null>(null), [url,setUrl] = useState('')
 useEffect(()=>{let active=true; setLoading(true); setError(''); listPublications(type,page).then(r=>{if(active){setItems(r.items);setPages(Math.max(1,r.pagination.totalPages));setTotal(r.pagination.total)}}).catch(e=>{if(active){setItems([]);setError(String(e.message??e))}}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[type,page,revision])
 useEffect(()=>{if(!preview){setUrl('');return} const u=URL.createObjectURL(preview);setUrl(u);return()=>URL.revokeObjectURL(u)},[preview])
 const reload=()=>setRevision(v=>v+1)
 function open(p?:Publication,n?:number,v?:DoctrineVersion){setError('');setNotice('');setEditing(p?.id);setFile(null);setForm({type,title:p?.title??'',description:p?.description??'',...(type==='DOCTRINE'?{doctrineNumber:p?.doctrineNumber??n,doctrineVersion:p?.doctrineVersion??v}:{})})}
 async function submit(e:FormEvent){e.preventDefault();if(!form||busy)return;setBusy(true);setError('');setNotice('');try{if(file&&(file.size===0||file.size>10*1024*1024||!file.name.toLowerCase().endsWith('.pdf')))throw new Error('PDF requis, maximum 10 Mo.');const r=await savePublication({...form,title:form.title.trim()},editing);setEditing(r.publication.id);if(file)await uploadPdf(r.publication.id,file);setForm(null);setFile(null);setNotice('Brouillon enregistré.');reload()}catch(e){setError(e instanceof Error?e.message:String(e))}finally{setBusy(false)}}
 async function transition(p:Publication,action:'publish'|'archive'|'draft'){if(!window.confirm(`${action==='publish'?'Publier':action==='archive'?'Archiver':'Remettre en brouillon'} : ${p.title} ?`))return;setBusy(true);setError('');setNotice('');try{await changeStatus(p.id,action);setNotice('Statut mis à jour.');reload()}catch(e){setError(e instanceof Error?e.message:String(e))}finally{setBusy(false)}}
 async function show(p:Publication){setBusy(true);setError('');try{setPreview(await previewPdf(p.id))}catch(e){setError(e instanceof Error?e.message:String(e))}finally{setBusy(false)}}
 const visible=items.filter(p=>(!status||p.status===status)&&`${p.title} ${p.doctrineNumber??''} ${p.doctrineVersion??''}`.toLowerCase().includes(search.toLowerCase()))
 const locked=busy||loading||!!form||!!preview
 function item(p:Publication){return <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-center gap-3"><div className="flex-1 min-w-48"><p className="font-semibold">{p.title}</p><p className="text-sm text-slate-500">{p.doctrineVersion??''} · {labels[p.status]} · {p.fileSize?`${Math.round(p.fileSize/1024)} Ko`:'Sans PDF'}</p></div><button className={button} disabled={locked||!p.fileSize} onClick={()=>void show(p)}>Aperçu PDF</button>{p.status==='DRAFT'?<><button className={button} disabled={locked} onClick={()=>open(p)}>Modifier / PDF</button><button className={button} disabled={locked||!p.fileSize} onClick={()=>void transition(p,'publish')}>Publier</button></>:<button className={button} disabled={locked} onClick={()=>void transition(p,'draft')}>Remettre en brouillon</button>}{p.status!=='ARCHIVED'&&<button className={button} disabled={locked} onClick={()=>void transition(p,'archive')}>Archiver</button>}</div>}
 return <section className="space-y-4"><div className="flex flex-wrap justify-between gap-3"><div><h1 className="text-3xl font-bold">Gestion des {type==='DOCUMENT'?'documents':'doctrines'}</h1><p className="text-slate-500">{total} publications enregistrées</p></div>{type==='DOCUMENT'&&<button className="bg-[#0A2545] text-white rounded-lg px-4 py-2" disabled={locked} onClick={()=>open()}>Nouveau document</button>}</div>
 {error&&<p role="alert" className="text-red-700">{error}</p>}{notice&&<p role="status" className="text-green-700">{notice}</p>}
 {form&&<form onSubmit={submit} className="bg-white border rounded-xl p-4 space-y-3"><h2 className="font-bold">{editing?'Modifier le brouillon':'Nouveau brouillon'}</h2>{type==='DOCTRINE'&&<p>Doctrine {form.doctrineNumber} — {form.doctrineVersion}</p>}<label className="block">Titre<input className={field} required minLength={3} maxLength={200} value={form.title} disabled={busy} onChange={e=>setForm({...form,title:e.target.value})}/></label><label className="block">Description<textarea className={field} maxLength={2000} value={form.description} disabled={busy} onChange={e=>setForm({...form,description:e.target.value})}/></label><label className="block">PDF (facultatif, 10 Mo maximum)<input className={field} type="file" accept="application/pdf,.pdf" disabled={busy} onChange={e=>setFile(e.target.files?.[0]??null)}/></label><p className="text-sm text-slate-500">Sans nouveau fichier, le PDF existant est conservé.</p><div className="flex gap-2"><button className={button} disabled={busy} type="submit">Enregistrer</button><button className={button} disabled={busy} type="button" onClick={()=>{setForm(null);setFile(null);reload()}}>Fermer</button></div></form>}
 {preview&&<div className="bg-white border rounded-xl p-3"><button className={button} onClick={()=>setPreview(null)}>Fermer l’aperçu</button>{url&&<><a className="ml-3 underline" href={url} download="publication.pdf">Télécharger</a><iframe title="Aperçu PDF" src={url} className="w-full h-[65vh] mt-3" /></>}</div>}
 <div className="flex gap-2"><input className={field} placeholder="Rechercher sur cette page" value={search} onChange={e=>setSearch(e.target.value)}/><select className={field} value={status} onChange={e=>setStatus(e.target.value)}><option value="">Tous les statuts</option>{Object.entries(labels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select><button className={button} disabled={locked} onClick={reload}>Actualiser</button></div>
 {loading?<p>Chargement…</p>:type==='DOCUMENT'?visible.map(item):Array.from({length:15},(_,i)=>i+1).map(n=>{const group=visible.filter(p=>p.doctrineNumber===n);if((search||status)&&!group.length)return null;return <div key={n} className="space-y-2"><h2 className="font-bold">Doctrine {String(n).padStart(2,'0')}</h2>{group.map(item)}{!search&&!status&&!error&&(['COURTE','INTEGRALE'] as const).filter(v=>!items.some(p=>p.doctrineNumber===n&&p.doctrineVersion===v)).map(v=><button key={v} className={button} disabled={locked} onClick={()=>open(undefined,n,v)}>Créer version {v.toLowerCase()}</button>)}</div>})}
 {!loading&&!visible.length&&<p>Aucun résultat.</p>}<div className="flex gap-3 items-center"><button className={button} disabled={locked||page<=1} onClick={()=>setPage(p=>p-1)}>Précédent</button><span>Page {page}/{pages}</span><button className={button} disabled={locked||page>=pages} onClick={()=>setPage(p=>p+1)}>Suivant</button></div></section>
}
''')
backup=Path(r'D:\ccpd-backups')/('publications-dashboard-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
backup.mkdir(parents=True,exist_ok=False)
for p in changes:
 if p.exists():
  dest=backup/p.relative_to(root);dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,dest)
try:
 for p,s in changes.items():
  p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s,encoding='utf-8')
 subprocess.run(['cmd','/c','npx','tsc','--noEmit','-p','tsconfig.build.json'],cwd=b,check=True)
 subprocess.run(['cmd','/c','npm','run','build'],cwd=a,check=True)
except BaseException:
 for p in changes:
  dest=backup/p.relative_to(root)
  if dest.exists(): shutil.copy2(dest,p)
  elif p.exists(): p.unlink()
 print('RESTAURATION DES SOURCES EFFECTUEE');raise
print('DASHBOARD PUBLICATIONS OK\nCODE SORTIE : 0\nSAUVEGARDE :',backup)
