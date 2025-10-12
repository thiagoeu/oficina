import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customerExist = await this.customerRepository.findOne({
      where: { cpf: createCustomerDto.cpf },
    });

    if (customerExist) {
      throw new ConflictException('Cliente já possui cadastro');
    }

    const emailExist = await this.userRepository.findOne({
      where: { email: createCustomerDto.user.email },
    });

    if (emailExist) {
      throw new ConflictException('E-mail já está em uso');
    }

    const user = this.customerRepository.save(createCustomerDto);

    return user;
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
