from pathlib import Path
from datetime import datetime
import shutil, subprocess
root=Path('D:/ccpd-mobile')
b=root/'backend'; a=root/'admin'
changes={}
def edit(p,old,new):
 s=changes.get(p,p.read_text(encoding='utf-8-sig'))
 if s.count(old)!=1: raise RuntimeError(f'Ancre inattendue: {p}: {old}')
 changes[p]=s.replace(old,new,1)
def create(p,s):
 if p.exists(): raise RuntimeError(f'Existe deja: {p}')
 changes[p]=s
create(b/'src/auth/admin-reports.service.ts',r'''import { Injectable, BadRequestException, PayloadTooLargeException } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AdminReportsService {
 constructor(private readonly prisma: PrismaService) {}
 async generate(kind: string, scope: string) {
  if (!['all','members','opinions','participations','statistics'].includes(kind)) throw new BadRequestException('Rapport invalide');
  if (scope !== 'all' && scope !== 'unassigned' && (typeof scope !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(scope))) throw new BadRequestException('Province invalide');
  const provinces = await this.prisma.province.findMany({select:{id:true,name:true},orderBy:{name:'asc'}});
  if(scope!=='all' && scope!=='unassigned' && !provinces.some(p=>p.id===scope)) throw new BadRequestException('Province inconnue');
  const where = scope==='all'?{}:{provinceId:scope==='unassigned'?null:scope};
  const pw = scope==='all'?{}:{provinceId:scope==='unassigned'?'00000000-0000-0000-0000-000000000000':scope};
  const cap=10000;
  const [m,o,p]=await this.prisma.$transaction([
   this.prisma.user.findMany({where:{...where,role:'MEMBRE'},select:{fullName:true,email:true,provinceId:true,isActive:true,emailVerifiedAt:true,createdAt:true},orderBy:[{provinceId:'asc'},{createdAt:'asc'},{id:'asc'}],take:cap+1}),
   this.prisma.opinion.findMany({where,select:{provinceId:true,authorName:true,isAnonymous:true,content:true,status:true,createdAt:true,publication:{select:{title:true,doctrineVersion:true}}},orderBy:[{provinceId:'asc'},{createdAt:'asc'},{id:'asc'}],take:cap+1}),
   this.prisma.participation.findMany({where:pw,select:{provinceId:true,fullName:true,email:true,phone:true,motivation:true,status:true,emailVerifiedAt:true,createdAt:true},orderBy:[{provinceId:'asc'},{createdAt:'asc'},{id:'asc'}],take:cap+1})
  ],{isolationLevel:'RepeatableRead'});
  if(m.length>cap||o.length>cap||p.length>cap) throw new PayloadTooLargeException('Rapport trop volumineux; choisir une province');
  const w=new Workbook();w.creator='CCPD';w.created=new Date();
  const name=(id:string|null)=>provinces.find(x=>x.id===id)?.name??'Sans province';
  const date=(d:Date)=>d.toISOString();
  const state=(x:string)=>({PENDING:'En attente',APPROVED:'Approuvé',REJECTED:'Rejeté'} as Record<string,string>)[x]??x;
  const memberState=(x:typeof m[number])=>!x.emailVerifiedAt?'Non vérifié':x.isActive?'Actif':'En attente';
  function sheet(title:string,headers:string[],rows:(string|number)[][]){
   const s=w.addWorksheet(title,{views:[{state:'frozen',ySplit:1}]});
   s.addRow(headers);s.addRows(rows);
   s.columns.forEach((c,i)=>{c.width=['Contenu','Motivation','Publication'].includes(headers[i])?65:Math.max(18,headers[i].length+3);});
   s.getRow(1).font={bold:true,color:{argb:'FFFFFFFF'}};s.getRow(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF0A2545'}};
   s.autoFilter={from:{row:1,column:1},to:{row:Math.max(1,s.rowCount),column:headers.length}};
   // All user-supplied values are string cells, never formula objects.
   s.eachRow((r,n)=>{if(n>1)r.alignment={vertical:'top',wrapText:true};});
  }
  if(kind==='all'||kind==='statistics'){
   const ids:(string|null)[]=scope==='all'?[...provinces.map(x=>x.id),null]:[scope==='unassigned'?null:scope];
   const summary=(id:string|null|undefined)=>{const mm=m.filter(x=>id===undefined||x.provinceId===id),oo=o.filter(x=>id===undefined||x.provinceId===id),pp=p.filter(x=>id===undefined||x.provinceId===id);return [id===undefined?'Total':name(id),mm.length,mm.filter(x=>memberState(x)==='Actif').length,mm.filter(x=>memberState(x)==='En attente').length,mm.filter(x=>memberState(x)==='Non vérifié').length,oo.length,oo.filter(x=>x.status==='PENDING').length,oo.filter(x=>x.status==='APPROVED').length,oo.filter(x=>x.status==='REJECTED').length,pp.length,pp.filter(x=>x.status==='PENDING').length,pp.filter(x=>x.status==='APPROVED').length,pp.filter(x=>x.status==='REJECTED').length];};
   sheet('Synthèse',['Province','Inscrits','Actifs','À activer','Non vérifiés','Avis','Avis en attente','Avis approuvés','Avis rejetés','Participations','Demandes en attente','Demandes approuvées','Demandes rejetées'],[...ids.map(summary),summary(undefined)]);
  }
  if(kind==='all'||kind==='members')sheet('Membres',['Province','Nom','Email','Statut','Inscription UTC'],m.map(x=>[name(x.provinceId),x.fullName,x.email,memberState(x),date(x.createdAt)]));
  if(kind==='all'||kind==='opinions')sheet('Avis',['Province','Auteur','Publication','Version','Contenu','Statut','Date UTC'],o.map(x=>[name(x.provinceId),x.isAnonymous?'Anonyme':x.authorName??'Non renseigné',x.publication?.title??'Non associée',x.publication?.doctrineVersion??'',x.content,state(x.status),date(x.createdAt)]));
  if(kind==='all'||kind==='participations')sheet('Participations',['Province','Nom','Email','Téléphone','Motivation','Statut','Email vérifié','Date UTC'],p.map(x=>[name(x.provinceId),x.fullName,x.email,x.phone??'',x.motivation,state(x.status),x.emailVerifiedAt?'Oui':'Non',date(x.createdAt)]));
  return Buffer.from(await w.xlsx.writeBuffer());
 }
}
'''.replace("const pw = scope==='all'?{}:{provinceId:scope==='unassigned'?'00000000-0000-0000-0000-000000000000':scope};","const pw = scope==='all'?{}:scope==='unassigned'?{id:{in:[] as string[]}}:{provinceId:scope};"))
create(b/'src/auth/admin-reports.controller.ts', '''import { Controller, Get, Query, Header, StreamableFile, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { AdminReportsService } from './admin-reports.service.js';
@Controller('admin/reports')
@UseGuards(JwtAccessGuard, AdminGuard)
export class AdminReportsController {
 constructor(private readonly reports:AdminReportsService){}
 @Get('excel')
 @Header('Cache-Control','private, no-store')
 @Header('X-Content-Type-Options','nosniff')
 async excel(@Query('kind') kind='all',@Query('scope') scope='all'){
  const data=await this.reports.generate(kind,scope);
  return new StreamableFile(data,{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',disposition:'attachment; filename="CCPD_Rapport.xlsx"',length:data.length});
 }
}
''')
p=b/'src/auth/auth.module.ts'
edit(p,"import { Module } from '@nestjs/common';","import { Module } from '@nestjs/common';\nimport { AdminReportsController } from './admin-reports.controller.js';\nimport { AdminReportsService } from './admin-reports.service.js';")
edit(p,'    AdminInstitutionController,','    AdminInstitutionController,\n    AdminReportsController,')
edit(p,'    AdminInstitutionService,','    AdminInstitutionService,\n    AdminReportsService,')
p=a/'src/services/api.ts'
edit(p,"    if (headers.get('Accept') === 'application/pdf') {", "    if (headers.get('Accept') === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {\n      if (!response.headers.get('Content-Type')?.toLowerCase().startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) throw new ApiError('Classeur invalide.', 502)\n      return await response.blob() as T\n    }\n    if (headers.get('Accept') === 'application/pdf') {")
create(a/'src/components/ReportsPage.tsx', '''import { useEffect, useState } from 'react'
import { adminApi } from '../services/auth'
const kinds=[['all','Rapport complet'],['members','Membres'],['opinions','Avis'],['participations','Participations'],['statistics','Statistiques']]
export default function ReportsPage(){
 const [provinces,setProvinces]=useState<{id:string;name:string}[]>([]),[scope,setScope]=useState('all'),[kind,setKind]=useState('all'),[busy,setBusy]=useState(false),[ready,setReady]=useState(false),[error,setError]=useState('')
 useEffect(()=>{let live=true;adminApi<{provinces:{id:string;name:string}[]}>('/admin/statistics').then(x=>{if(live){setProvinces(x.provinces);setReady(true)}}).catch(e=>{if(live)setError(e instanceof Error?e.message:'Erreur serveur')});return()=>{live=false}},[])
 async function download(){
  if(busy||!ready)return
  setBusy(true);setError('')
  try{const q=new URLSearchParams({kind,scope});const blob=await adminApi<Blob>(`/admin/reports/excel?${q}`,{headers:{Accept:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}});const url=URL.createObjectURL(blob);const link=document.createElement('a');const province=scope==='all'?'Global':scope==='unassigned'?'Sans_province':provinces.find(p=>p.id===scope)?.name??'Province';link.href=url;link.download=`CCPD_${kind}_${province.replace(/[^a-zA-Z0-9_-]/g,'_')}.xlsx`;document.body.appendChild(link);link.click();link.remove();window.setTimeout(()=>URL.revokeObjectURL(url),30000)}catch(e){setError(e instanceof Error?e.message:'Erreur export')}finally{setBusy(false)}
 }
 return <div className="space-y-5"><h1 className="text-3xl font-bold">Rapports Excel</h1><div className="max-w-2xl space-y-5 rounded-xl border border-slate-200 bg-white p-6"><p className="text-slate-600">Export intégral des données de la province sélectionnée, indépendamment de la pagination. Documents confidentiels.</p><label className="block">Province<select className="mt-2 block w-full rounded border border-slate-300 p-3" value={scope} disabled={busy||!ready} onChange={e=>setScope(e.target.value)}><option value="all">Toutes les provinces</option>{provinces.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}<option value="unassigned">Sans province</option></select></label><label className="block">Type de rapport<select className="mt-2 block w-full rounded border border-slate-300 p-3" value={kind} disabled={busy} onChange={e=>setKind(e.target.value)}>{kinds.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>{error&&<p role="alert" className="text-red-700">{error}</p>}<button disabled={busy||!ready} onClick={()=>void download()} className="rounded-lg bg-[#0A2545] px-5 py-3 text-white disabled:opacity-50">{busy?'Génération…':'Télécharger le rapport Excel'}</button><p className="text-sm text-slate-500">Maximum 10 000 enregistrements par catégorie. Les avis anonymes restent anonymes.</p></div></div>
}
''')
p=a/'src/App.tsx'
edit(p,"import { logout } from './services/auth'","import ReportsPage from './components/ReportsPage'\nimport { logout } from './services/auth'")
edit(p,"  ['rapports', 'Rapports Excel'],\n",'')
edit(p,'          {pages.map(([path, title]) => (','          <Route path="rapports" element={<ReportsPage />} />\n          {pages.map(([path, title]) => (')
backup=Path('D:/ccpd-backups')/('reports-'+datetime.now().strftime('%Y%m%d-%H%M%S'));backup.mkdir(parents=True,exist_ok=False)
existing=set(p for p in changes if p.exists())
for p in existing:
 dest=backup/p.relative_to(root);dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,dest)
try:
 for p,s in changes.items():p.write_text(s,encoding='utf-8')
 subprocess.run(['npx.cmd','tsc','--noEmit','-p','tsconfig.build.json'],cwd=b,check=True)
 subprocess.run(['npm.cmd','run','build'],cwd=a,check=True)
except BaseException:
 for p in changes:
  if p in existing:shutil.copy2(backup/p.relative_to(root),p)
  else:p.unlink(missing_ok=True)
 print('RESTAURATION SOURCES OK');raise
print('RAPPORTS EXCEL OK - CODE SORTIE : 0');print('SAUVEGARDE :',backup)
