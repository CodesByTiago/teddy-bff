import { IsString } from 'class-validator';

export class CreateCustomertDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly salary: string;

  @IsString()
  readonly companyValue: string;

  @IsString()
  readonly userId: string;
}
