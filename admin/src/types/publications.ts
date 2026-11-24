export type PublicationType = 'DOCUMENT' | 'DOCTRINE'
export type PublicationStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
export type DoctrineVersion = 'COURTE' | 'INTEGRALE'
export interface Publication {
 id: string; title: string; description: string | null; type: PublicationType; status: PublicationStatus;
 doctrineNumber: number | null; doctrineVersion: DoctrineVersion | null; fileName: string | null; fileSize: number | null;
}
export interface PublicationInput { title: string; description: string; type: PublicationType; doctrineNumber?: number; doctrineVersion?: DoctrineVersion }
