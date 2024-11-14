import { IsString } from 'class-validator';

export class CreateCustomertDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly salary: number;

  @IsString()
  readonly companyValue: number;

  @IsString()
  readonly userId: string;
}
