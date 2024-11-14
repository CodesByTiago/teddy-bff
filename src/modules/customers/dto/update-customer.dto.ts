import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomertDTO } from './create-customer.dto';

export class UpdateCustomerDTO extends PartialType(CreateCustomertDTO) {}
