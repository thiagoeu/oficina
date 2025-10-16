// service-order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOrder } from './entities/service-order.entity';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { Customer } from '../customer/entities/customer.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Mechanic } from '../mechanic/entities/mechanic.entity';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';

@Injectable()
export class ServiceOrderService {
  constructor(
    @InjectRepository(ServiceOrder)
    private serviceOrderRepository: Repository<ServiceOrder>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Mechanic)
    private mechanicRepository: Repository<Mechanic>,
  ) {}

  async create(createServiceOrderDto: CreateServiceOrderDto) {
    const { customer_id, vehicle_id, mechanic_id, ...rest } =
      createServiceOrderDto;

    // Verificar se as entidades relacionadas existem
    const customer = await this.customerRepository.findOne({
      where: { id: customer_id },
    });
    if (!customer)
      throw new NotFoundException(
        `Cliente com id ${customer_id} não encontrado.`,
      );

    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicle_id },
    });
    if (!vehicle)
      throw new NotFoundException(
        `Veículo com id ${vehicle_id} não encontrado.`,
      );

    const mechanic = await this.mechanicRepository.findOne({
      where: { id: mechanic_id },
    });
    if (!mechanic)
      throw new NotFoundException(
        `Mecânico com id ${mechanic_id} não encontrado.`,
      );

    // Criar a entidade
    const serviceOrder = this.serviceOrderRepository.create({
      customer,
      vehicle,
      mechanic,
      ...rest,
    });

    const data = await this.serviceOrderRepository.save(serviceOrder);
    // Salvar no banco
    return { message: 'Ordem de serviço criada com sucesso', data };
  }

  findAll() {
    return `This action returns all serviceOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceOrder`;
  }

  update(id: number, updateServiceOrderDto: UpdateServiceOrderDto) {
    return `This action updates a #${id} serviceOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceOrder`;
  }
}
