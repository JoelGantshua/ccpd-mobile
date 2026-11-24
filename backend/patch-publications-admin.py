from pathlib import Path
from datetime import datetime
import shutil, subprocess
root=Path.cwd()
paths=[Path('src/auth/auth.module.ts'),Path('src/auth/admin-publications.controller.ts'),Path('src/publications/publications.service.ts'),Path('src/publications/dto/create-publication.dto.ts')]
original={p:p.read_text(encoding='utf-8-sig') for p in paths}
def replace(s,a,b):
    if s.count(a)!=1: raise RuntimeError('Ancre absente ou multiple: '+a[:100])
    return s.replace(a,b,1)
a,c,s,d=[original[p] for p in paths]
a=replace(a,"import { JwtAccessGuard } from './jwt-access.guard.js';","import { JwtAccessGuard } from './jwt-access.guard.js';\nimport { AdminGuard } from './admin.guard.js';")
a=replace(a,'    JwtAccessGuard,','    JwtAccessGuard,\n    AdminGuard,')
d=replace(d,'  IsIn,','  IsIn,\n  IsInt,\n  Min,\n  Max,')
d=replace(d,"  type!: 'DOCUMENT' | 'DOCTRINE';","  type!: 'DOCUMENT' | 'DOCTRINE';\n\n  @IsOptional()\n  @IsInt()\n  @Min(1)\n  @Max(15)\n  doctrineNumber?: number;\n\n  @IsOptional()\n  @IsIn(['COURTE', 'INTEGRALE'])\n  doctrineVersion?: 'COURTE' | 'INTEGRALE';")
c='''import { Body, Controller, Get, Header, Param, ParseUUIDPipe, Patch, Post, Query, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { PublicationsService } from '../publications/publications.service.js';
import { CreatePublicationDto } from '../publications/dto/create-publication.dto.js';

@Controller('admin/publications')
@UseGuards(JwtAccessGuard, AdminGuard)
export class AdminPublicationsController {
  constructor(private readonly publications: PublicationsService) {}
  @Get()
  list(@Query('type') type: string, @Query('page') page?: string) {
    return this.publications.adminList(type, page);
  }
  @Get(':id')
  detail(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) {
    return this.publications.adminDetail(id);
  }
  @Post()
  create(@Body() dto: CreatePublicationDto) { return this.publications.createDraft(dto); }
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version:'4'})) id: string, @Body() dto: CreatePublicationDto) {
    return this.publications.adminUpdate(id, dto);
  }
  @Post(':id/file')
  @UseInterceptors(FileInterceptor('file', {storage: memoryStorage(), limits:{fileSize:10*1024*1024,files:1,fields:0,parts:1}}))
  upload(@Param('id', new ParseUUIDPipe({version:'4'})) id: string, @UploadedFile() file?: Express.Multer.File) {
    return this.publications.attachPdf(id,file);
  }
  @Get(':id/file')
  @Header('Cache-Control','private, no-store')
  @Header('X-Content-Type-Options','nosniff')
  async preview(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) {
    const buffer = await this.publications.getAdminPdf(id);
    return new StreamableFile(buffer,{type:'application/pdf',disposition:'inline',length:buffer.length});
  }
  @Patch(':id/publish')
  publish(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) { return this.publications.publish(id); }
  @Patch(':id/archive')
  archive(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) { return this.publications.adminStatus(id,'ARCHIVED'); }
  @Patch(':id/draft')
  draft(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) { return this.publications.adminStatus(id,'DRAFT'); }
}
'''
s=replace(s,"import { mkdir, unlink, writeFile }", "import { mkdir, writeFile }")
start=s.index('    let updated;',s.index('async attachPdf'))
end=s.index('    return {',s.index('// Supprimer',start))
s=s[:start]+'''    const result = await this.prisma.publication.updateMany({
      where: { id, status: 'DRAFT', storageKey: publication.storageKey },
      data: { fileName: file.originalname.slice(0,255), storageKey, mimeType:'application/pdf', fileSize:file.buffer.length },
    });
    if (result.count !== 1) throw new ConflictException('Publication modifiee.');
    // Keep both files: a failed or ambiguous database operation must not destroy a PDF.
    const updated = await this.prisma.publication.findUniqueOrThrow({where:{id},select:this.adminSelect});

'''+s[end:]
s=replace(s,'    const publication = await this.prisma.publication.create({','    const metadata = await this.adminMetadata(dto);\n    const publication = await this.prisma.publication.create({')
s=replace(s,"        type: dto.type,\n        status: 'DRAFT',","        type: dto.type,\n        ...metadata,\n        status: 'DRAFT',")
s=replace(s,'  async getPublishedPdf(id: string) {','  async getPublishedPdf(id: string) {\n    return this.readPdf(id, true);\n  }\n\n  async getAdminPdf(id: string) {\n    return this.readPdf(id, false);\n  }\n\n  private async readPdf(id: string, publicOnly: boolean) {')
start=s.index('  private async readPdf')
end = s.index('async publish(id: string)', start)
s = s[:start] + replace(s[start:end], "        status: 'PUBLISHED',", "        ...(publicOnly ? { status: 'PUBLISHED' as const } : {}),") + s[end:]
# Prevent creation of new doctrine slots until database uniqueness is installed; existing slots can be edited without changing identity.
s=s[:s.rfind('}')]+'''
  private readonly adminSelect = {
    id:true,title:true,description:true,type:true,status:true,doctrineNumber:true,doctrineVersion:true,
    fileName:true,fileSize:true,createdAt:true,updatedAt:true,publishedAt:true,
  } as const;

  private async adminMetadata(dto: CreatePublicationDto, id?: string) {
    if (dto.type === 'DOCUMENT') {
      if (dto.doctrineNumber != null || dto.doctrineVersion != null) throw new BadRequestException('Metadonnees doctrine interdites pour un document.');
      return {doctrineNumber:null,doctrineVersion:null};
    }
    if (!Number.isInteger(dto.doctrineNumber) || dto.doctrineNumber! < 1 || dto.doctrineNumber! > 15 || !['COURTE','INTEGRALE'].includes(dto.doctrineVersion ?? '')) throw new BadRequestException('Numero et version obligatoires.');
    if (!id) throw new ConflictException('Creation de doctrine temporairement bloquee avant contrainte unique.');
    const existing = await this.prisma.publication.findUnique({where:{id}});
    if (!existing || existing.doctrineNumber !== dto.doctrineNumber || existing.doctrineVersion !== dto.doctrineVersion) throw new ConflictException('Identite de doctrine non modifiable.');
    return {doctrineNumber:dto.doctrineNumber!,doctrineVersion:dto.doctrineVersion!};
  }
  async adminList(type: string, pageInput?: string) {
    if (type !== 'DOCUMENT' && type !== 'DOCTRINE') throw new BadRequestException('Type invalide.');
    if (pageInput !== undefined && (typeof pageInput !== 'string' || !/^[1-9]\\d{0,4}$/.test(pageInput))) throw new BadRequestException('Page invalide.');
    const page = Number(pageInput ?? 1), pageSize=50;
    const where = {type};
    const [items,total] = await Promise.all([
      this.prisma.publication.findMany({where,select:this.adminSelect,skip:(page-1)*pageSize,take:pageSize,orderBy:[{doctrineNumber:'asc'},{doctrineVersion:'asc'},{updatedAt:'desc'},{id:'asc'}]}),
      this.prisma.publication.count({where}),
    ]);
    return {success:true,items,pagination:{page,pageSize,total,totalPages:Math.ceil(total/pageSize)}};
  }
  async adminDetail(id: string) {
    const publication = await this.prisma.publication.findUnique({where:{id},select:this.adminSelect});
    if (!publication) throw new NotFoundException('Publication introuvable.');
    return {success:true,publication};
  }
  async adminUpdate(id: string,dto: CreatePublicationDto) {
    const {publication} = await this.adminDetail(id);
    if (publication.type !== dto.type) throw new ConflictException('Type non modifiable.');
    const title = dto.title.trim();
    if (title.length < 3) throw new BadRequestException('Titre invalide.');
    const metadata = await this.adminMetadata(dto,id);
    const result = await this.prisma.publication.updateMany({where:{id,status:'DRAFT',updatedAt:publication.updatedAt},data:{title,description:dto.description?.trim() || null,...metadata}});
    if (result.count !== 1) throw new ConflictException('Brouillon requis ou publication modifiee.');
    return this.adminDetail(id);
  }
  async adminStatus(id: string,status:'DRAFT'|'ARCHIVED') {
    const result = await this.prisma.publication.updateMany({where:{id,status:{in:status==='DRAFT'?['PUBLISHED','ARCHIVED']:['DRAFT','PUBLISHED']}},data:{status,...(status==='DRAFT'?{publishedAt:null}:{})}});
    if (result.count !== 1) throw new ConflictException('Transition impossible.');
    return this.adminDetail(id);
  }
}
'''
s=replace(s,'    const where = {type};','    const where = {type: type as PublicationType};')
# Verify metadata before publishing existing drafts, including legacy incomplete drafts.
start=s.index('async publish(id: string)')
s=s[:start]+replace(s[start:],'        storageKey: true,','        storageKey: true,\n        type: true,\n        doctrineNumber: true,\n        doctrineVersion: true,')
s=replace(s,'    const key = publication.storageKey;',"    if (publication.type === 'DOCTRINE' && (!publication.doctrineNumber || publication.doctrineNumber < 1 || publication.doctrineNumber > 15 || !['COURTE','INTEGRALE'].includes(publication.doctrineVersion ?? ''))) throw new BadRequestException('Metadonnees doctrine invalides.');\n    const key = publication.storageKey;")
backup=Path('D:/ccpd-backups')/('publications-admin-'+datetime.now().strftime('%Y%m%d-%H%M%S'))
for p in paths:
    dest=backup/p; dest.parent.mkdir(parents=True,exist_ok=True); shutil.copy2(p,dest)
try:
    for p,value in zip(paths,[a,c,s,d]): p.write_text(value,encoding='utf-8')
    subprocess.run(['cmd','/c','npx.cmd','tsc','--noEmit','-p','tsconfig.build.json'],check=True)
except BaseException:
    for p in paths: shutil.copy2(backup/p,p)
    print('ECHEC - FICHIERS RESTAURES'); raise
print('API ADMIN PUBLICATIONS OK\nCODE SORTIE : 0\nSAUVEGARDE :',backup)
