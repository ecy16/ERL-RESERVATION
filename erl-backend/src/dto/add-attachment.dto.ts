import { IsOptional } from 'class-validator';

export class AddAttachmentDto {
    @IsOptional()
    DocPath: string;
    @IsOptional()
    DocFolder: string;
    @IsOptional()
    DocName: string;
    @IsOptional()
    CreatedBy: string;
    @IsOptional()
    CreatedOn: Date;
}
