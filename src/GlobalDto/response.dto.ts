import { IsString, IsNotEmpty, IsObject, IsNumber, IsOptional } from 'class-validator';

export class ResponseDto {
  @IsObject()
  readonly data: { };
 
  readonly message: string='Data Fetched Successfully';

  @IsNotEmpty()
  @IsNumber()
  readonly statusCode: number;

  constructor(partial: Partial<ResponseDto>) {
    Object.assign(this, partial);
    this.message = this.message || 'Data Fetched Successfully';
  }
}
