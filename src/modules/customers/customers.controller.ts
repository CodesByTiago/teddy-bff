import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomertDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findCustomers() {
    return this.customerService.findCustomers();
  }

  @UseGuards(AuthGuard)
  @Post()
  createCustomer(@Body() createCustomerDTO: CreateCustomertDTO) {
    return this.customerService.createCustomer(createCustomerDTO);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDTO: UpdateCustomerDTO,
  ) {
    return this.customerService.updateCustomer(id, updateCustomerDTO);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }
}
