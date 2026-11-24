from pathlib import Path
from datetime import datetime
import shutil, subprocess
root=Path.cwd()
app=root/'src/App.tsx'
if not app.is_file(): raise SystemExit('Executer depuis D:/ccpd-mobile/admin')
s=app.read_text(encoding='utf-8-sig')
for route,title in [('membres','Gestion des membres'),('provinces','Gestion provinciale'),('avis','Modération des avis'),('participations','Gestion des participations')]:
    anchor=f"  ['{route}', '{title}'],\n"
    if s.count(anchor)!=1: raise SystemExit('Ancre incorrecte: '+route)
    s=s.replace(anchor,'')
anchor="import DashboardPage from './pages/dashboard/DashboardPage'"
assert s.count(anchor)==1
s=s.replace(anchor,"import { InstitutionOverview, InstitutionList } from './components/InstitutionPage'")
anchor='<Route index element={<DashboardPage />} />'
assert s.count(anchor)==1
s=s.replace(anchor,'''<Route index element={<InstitutionOverview />} />
          <Route path="provinces" element={<InstitutionOverview provincesOnly />} />
          <Route path="membres" element={<InstitutionList key="members" mode="members" />} />
          <Route path="avis" element={<InstitutionList key="opinions" mode="opinions" />} />
          <Route path="participations" element={<InstitutionList key="participations" mode="participations" />} />''')
component=root/'src/components/InstitutionPage.tsx'
if component.exists(): raise SystemExit('Composant deja present; aucune modification.')
code=r'''import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { adminApi } from '../services/auth'

type Mode = 'members' | 'opinions' | 'participations'
type Counts = { members:number; activeMembers:number; pendingMembers:number; unverifiedMembers:number; opinions:number; pendingOpinions:number; approvedOpinions:number; rejectedOpinions:number; participations:number; pendingParticipations:number; approvedParticipations:number; rejectedParticipations:number }
type Province = { id:string; name:string }
type Stats = { global:Counts; provinces:(Province & Counts)[]; unassigned:Counts }
type Item = { id:string; fullName?:string; email?:string; phone?:string|null; isActive?:boolean; emailVerifiedAt?:string|null; authorName?:string|null; isAnonymous?:boolean; content?:string; motivation?:string; status?:string; createdAt:string; province:Province|null; publication?:{title:string; doctrineVersion:string|null}|null }
type Result = { items:Item[]; pagination:{page:number;total:number;totalPages:number} }
const titles = {members:'Gestion des membres',opinions:'Modération des avis',participations:'Gestion des participations'}
const panel='rounded-xl border border-slate-200 bg-white p-5'
const btn='rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100 disabled:opacity-40'
const field='rounded-lg border border-slate-300 bg-white px-3 py-2'
const message=(e:unknown)=>e instanceof Error?e.message:'Erreur inattendue.'
const status=(x:Item,mode:Mode)=>mode==='members' ? !x.emailVerifiedAt?'Non vérifié':x.isActive?'Actif':'En attente' : ({PENDING:'En attente',APPROVED:'Approuvé',REJECTED:'Rejeté'}[x.status??'']??'Inconnu')
const date=(s:string)=>new Date(s).toLocaleString('fr-FR')
function useStats(revision:number){
 const [data,setData]=useState<Stats|null>(null),[error,setError]=useState('')
 useEffect(()=>{let alive=true;setError('');adminApi<Stats>('/admin/statistics').then(x=>{if(alive)setData(x)}).catch(e=>{if(alive){setData(null);setError(message(e))}});return()=>{alive=false}},[revision])
 return {data,error}
}
export function InstitutionOverview({provincesOnly=false}:{provincesOnly?:boolean}){
 const [revision,setRevision]=useState(0)
 const {data,error}=useStats(revision)
 return <div className="space-y-5"><div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-bold">{provincesOnly?'Gestion provinciale':'Vue générale'}</h1><button className={btn} onClick={()=>setRevision(x=>x+1)}>Actualiser</button></div>
 {error&&<p role="alert" className="text-red-700">{error}</p>}
 {!data&&!error&&<p>Chargement des statistiques…</p>}
 {data&&<>{!provincesOnly&&<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[['Membres inscrits',data.global.members],['Comptes à activer',data.global.pendingMembers],['Avis en attente',data.global.pendingOpinions],['Participations en attente',data.global.pendingParticipations]].map(([label,value])=><div key={label} className={panel}><p className="text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-[#0A2545]">{value}</p></div>)}</div>}
 <div className={panel}><h2 className="mb-4 text-lg font-semibold">Répartition provinciale</h2><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b">{['Province','Inscrits','Actifs','À activer','Non vérifiés','Avis','Participations'].map(x=><th className="p-3" key={x}>{x}</th>)}</tr></thead><tbody>{[...data.provinces,{id:'',name:'Sans province',...data.unassigned}].map(p=><tr key={p.name} className="border-b"><td className="p-3 font-medium">{p.name}</td>{[p.members,p.activeMembers,p.pendingMembers,p.unverifiedMembers,p.opinions,p.participations].map((n,i)=><td key={i} className="p-3">{p.id&&[0,5,6].includes(i)?<Link className="text-blue-800 underline" to={`/${i===0?'membres':i===5?'avis':'participations'}?provinceId=${encodeURIComponent(p.id)}`}>{n}</Link>:n}</td>)}</tr>)}<tr className="font-bold"><td className="p-3">Total</td>{[data.global.members,data.global.activeMembers,data.global.pendingMembers,data.global.unverifiedMembers,data.global.opinions,data.global.participations].map((n,i)=><td key={i} className="p-3">{n}</td>)}</tr></tbody></table></div></div>
 <div className={panel}><h2 className="font-semibold mb-4">Avis par province</h2>{[...data.provinces,{id:'',name:'Sans province',...data.unassigned}].map(p=><div key={p.name} className="mb-3 grid grid-cols-[110px_1fr_35px] items-center gap-3 text-sm"><span>{p.name}</span><div className="h-3 rounded bg-slate-100"><div className="h-3 rounded bg-[#0A2545]" style={{width:`${100*p.opinions/Math.max(1,data.global.opinions)}%`}}/></div><span>{p.opinions}</span></div>)}</div></>}
 </div>
}
export function InstitutionList({mode}:{mode:Mode}){
 const [params,setParams]=useSearchParams()
 const province=params.get('provinceId')??''
 const [page,setPage]=useState(1),[revision,setRevision]=useState(0),[search,setSearch]=useState(''),[filter,setFilter]=useState(''),[data,setData]=useState<Result|null>(null),[error,setError]=useState(''),[actionError,setActionError]=useState(''),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true)
 const stats=useStats(revision)
 useEffect(()=>{let alive=true;setLoading(true);setData(null);setError('');const q=new URLSearchParams({page:String(page)});if(province)q.set('provinceId',province);adminApi<Result>(`/admin/${mode}?${q}`).then(x=>{if(alive)setData(x)}).catch(e=>{if(alive)setError(message(e))}).finally(()=>{if(alive)setLoading(false)});return()=>{alive=false}},[mode,province,page,revision])
 const rows=(data?.items??[]).filter(x=>{const hay=[x.fullName,x.email,x.isAnonymous?'Anonyme':x.authorName,x.content,x.motivation,x.publication?.title,x.province?.name].join(' ').toLocaleLowerCase('fr');return hay.includes(search.toLocaleLowerCase('fr'))&&(!filter||status(x,mode)===filter)})
 async function act(x:Item,action:'approve'|'reject'){
  if(busy||!window.confirm(action==='approve'?'Confirmer cette approbation ?':'Confirmer ce rejet ?'))return
  setBusy(true);setActionError('');try{await adminApi(`/admin/${mode}/${x.id}/${action}`,{method:'PATCH'});setRevision(v=>v+1)}catch(e){setActionError(message(e));setRevision(v=>v+1)}finally{setBusy(false)}
 }
 return <div className="space-y-5"><h1 className="text-3xl font-bold">{titles[mode]}</h1><div className={panel}><div className="flex flex-wrap gap-3"><select aria-label="Province" className={field} value={province} disabled={busy} onChange={e=>{setPage(1);setParams(e.target.value?{provinceId:e.target.value}:{})}}><option value="">Toutes les provinces</option>{stats.data?.provinces.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select><input className={field} aria-label="Recherche sur cette page" placeholder="Rechercher sur cette page" value={search} onChange={e=>setSearch(e.target.value)}/><select className={field} aria-label="Statut sur cette page" value={filter} onChange={e=>setFilter(e.target.value)}><option value="">Tous les statuts (page)</option>{(mode==='members'?['Actif','En attente','Non vérifié']:['En attente','Approuvé','Rejeté']).map(x=><option key={x}>{x}</option>)}</select><button className={btn} disabled={busy||loading} onClick={()=>setRevision(x=>x+1)}>Actualiser</button></div><p className="mt-3 text-sm text-slate-500">{data?.pagination.total??'—'} enregistrements · {rows.length} affichés sur cette page</p></div>
 {stats.error&&<p role="alert">Provinces : {stats.error}</p>}{error&&<p role="alert" className="text-red-700">{error}</p>}{actionError&&<p role="alert" className="text-red-700">{actionError}</p>}{loading&&<p>Chargement…</p>}{!loading&&!error&&!rows.length&&<p>Aucun résultat sur cette page.</p>}
 {rows.map(x=><article key={x.id} className={panel}><div className="flex flex-wrap justify-between gap-2"><h2 className="font-semibold text-lg">{mode==='opinions'?(x.isAnonymous?'Anonyme':x.authorName||'Auteur non renseigné'):x.fullName}</h2><span className="rounded bg-slate-100 px-3 py-1 text-sm">{status(x,mode)}</span></div><p className="text-sm text-slate-500">{x.province?.name??'Sans province'} · {date(x.createdAt)}</p>{mode!=='opinions'&&<p className="mt-2 break-all">{x.email}{x.phone?` · ${x.phone}`:''}</p>}{mode==='opinions'&&<p className="mt-3 text-sm font-medium">Publication : {x.publication?.title??'Non associée'} {x.publication?.doctrineVersion??''}</p>}{(x.content||x.motivation)&&<p className="mt-3 whitespace-pre-wrap break-words">{x.content||x.motivation}</p>}{mode==='participations'&&<p className="mt-2 text-sm">Email : {x.emailVerifiedAt?'vérifié':'non vérifié'}</p>}{(mode==='members'?!!x.emailVerifiedAt&&!x.isActive:x.status==='PENDING')&&<div className="mt-4 flex gap-2"><button className={btn} disabled={busy||loading} onClick={()=>void act(x,'approve')}>{mode==='members'?'Activer':'Approuver'}</button>{mode!=='members'&&<button className={`${btn} text-red-700`} disabled={busy||loading} onClick={()=>void act(x,'reject')}>Rejeter</button>}</div>}</article>)}
 <div className="flex items-center justify-between"><button className={btn} disabled={busy||loading||page<=1} onClick={()=>setPage(x=>x-1)}>Précédent</button><span>Page {page}/{Math.max(1,data?.pagination.totalPages??1)}</span><button className={btn} disabled={busy||loading||!data||page>=data.pagination.totalPages} onClick={()=>setPage(x=>x+1)}>Suivant</button></div></div>
}
'''
# Avoid indexing a narrow inferred object with arbitrary string under strict TS.
code=code.replace("({PENDING:'En attente',APPROVED:'Approuvé',REJECTED:'Rejeté'}[x.status??'']", "(({PENDING:'En attente',APPROVED:'Approuvé',REJECTED:'Rejeté'} as Record<string,string>)[x.status??'']")
backup=Path('D:/ccpd-backups')/('institution-ui-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
backup.mkdir(parents=True,exist_ok=False)
shutil.copy2(app,backup/'App.tsx')
try:
    component.write_text(code,encoding='utf-8')
    app.write_text(s,encoding='utf-8')
    result=subprocess.run(['npm.cmd','run','build'],cwd=root)
    if result.returncode: raise RuntimeError('Compilation echouee')
except BaseException:
    shutil.copy2(backup/'App.tsx',app)
    component.unlink(missing_ok=True)
    print('RESTAURATION DES SOURCES OK')
    raise
print('DASHBOARD INSTITUTIONNEL OK')
print('CODE SORTIE : 0')
print('SAUVEGARDE :',backup)
