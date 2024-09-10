export declare class DocAttachmentsEntity {
    DocId: number;
    DocPath: string;
    DocFolder: string;
    DocName: string;
    CreatedBy: string;
    CreatedOn: Date;
    ModifiedBy: string;
    ModifiedOn: string;
    constructor(attachments: Partial<DocAttachmentsEntity>);
}
