import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddReservationDto {
    @IsOptional()
    BookingNo: string;

    @ApiProperty({
        example: '2024-09-12',
        description: 'The date of the reservation'
    })
    @IsString()
    @IsOptional()
    BookingDate: string;

    @ApiProperty({
        description: 'The category of the booking',
        example:'self driven'
    })
    @IsString()
    @IsOptional()
    BookingCategory: string;

    @ApiProperty({
        description: 'This is the booking type',
        example:'Complimentary'
    })
    @IsString()
    @IsOptional()
    BookingType: string;

    @ApiProperty({ example: 'JKIA', description: 'This is the booking branch' })
    @IsString()
    @IsOptional()
    Branch: string;

    @ApiProperty({ example: 'InProgress', description: 'The status of the booking' })
    @IsOptional()
    @IsString()
    BookingStatus: string;

    @ApiProperty({ example: 'John Doe', description: 'The target client' })
    @IsString()
    @IsOptional()
    BookingFor: string;

    @ApiProperty({ example: 'KQ1234', description: 'This is the company code' })
    @IsString()
    @IsOptional()
    CompanyCode: string;

    @ApiProperty({ example: 'Safaricom', description: 'This is the payee company name' })
    @IsString()
    @IsOptional()
    PayeeCompanyName: string;

    @ApiProperty({ example: 'Sample remarks text', description: 'Remarks about the reservation' })
    @IsString()
    @IsOptional()
    Remarks: string;

    @ApiProperty({ example: 'Jane Doe', description: 'Reservation creator' })
    @IsString()
    @IsOptional()
    Source: string;

    @ApiProperty({ example: 'Ref001', description: 'Source reference' })
    @IsString()
    @IsOptional()
    SourceRefNo: string;

    @ApiProperty({ example: '1', description: 'Contract is' })
    @IsString()
    @IsOptional()
    ContractId: number;
    
    @IsOptional()
    CreditCardPreAuthStatus: string;
    @IsOptional()
    CreatedBy: string;
    @IsOptional()
    CreatedOn: string;
    @IsOptional()
    TotalAmount: string;
    @IsOptional()
    TotalPaid: string;
    @IsOptional()
    ExchangeRate: string;
    @IsOptional()
    companyName: string;
    @IsOptional()
    ContractNo: string;

}
