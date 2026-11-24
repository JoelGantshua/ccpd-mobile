import { Injectable, BadRequestException, PayloadTooLargeException } from '@nestjs/common';
import ExcelJS from 'exceljs';
const { Workbook } = ExcelJS;
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
  const pw = scope==='all'?{}:scope==='unassigned'?{id:{in:[] as string[]}}:{provinceId:scope};
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
