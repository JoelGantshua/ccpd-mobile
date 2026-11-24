export declare class CreatePublicationDto {
    title: string;
    description?: string;
    type: 'DOCUMENT' | 'DOCTRINE';
    doctrineNumber?: number;
    doctrineVersion?: 'COURTE' | 'INTEGRALE';
}
