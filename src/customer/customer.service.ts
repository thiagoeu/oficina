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
    const { user: userData, cpf } = createCustomerDto;

    // Verifica se o CPF já existe
    const customerExist = await this.customerRepository.findOne({
      where: { cpf },
    });
    if (customerExist)
      throw new ConflictException('Cliente já possui cadastro');

    // Verifica se o e-mail já existe
    const emailExist = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (emailExist) throw new ConflictException('E-mail já está em uso');

    // Verifica se a senha tem pelo menos 6 caracteres
    if (userData.password.length < 8)
      throw new ConflictException('Senha deve conter pelo menos 8 caracteres');

    // Cria o usuário primeiro
    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    // Cria o cliente e vincula o usuário
    const customer = this.customerRepository.create({
      ...createCustomerDto,
      user,
    });
    await this.customerRepository.save(customer);

    return { message: 'Cliente cadastrado com sucesso', customer };
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
