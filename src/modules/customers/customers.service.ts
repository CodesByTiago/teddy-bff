import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomertDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findCustomers() {
    const customers = await this.customerRepository.find();
    return customers;
  }

  async createCustomer(createCustomerDTO: CreateCustomertDTO) {
    const customer = this.customerRepository.create(createCustomerDTO);
    return this.customerRepository.save(customer);
  }

  async updateCustomer(id: string, updateCustomerDTO: UpdateCustomerDTO) {
    const customer = await this.customerRepository.preload({
      ...updateCustomerDTO,
      id,
    });

    if (!customer) {
      throw new HttpException(
        `Cliente não encontrado found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.customerRepository.save(customer);
  }

  async deleteCustomer(id: string) {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new HttpException(`Cliente não encontrado`, HttpStatus.NOT_FOUND);
    }

    return this.customerRepository.remove(customer);
  }
}
