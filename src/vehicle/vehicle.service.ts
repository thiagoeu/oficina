import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Customer } from '../customer/entities/customer.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    const { plate, customerId } = createVehicleDto;

    //  Verifica se o cliente existe
    const customer = await this.customerRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new NotFoundException('Cliente deve ser selecionado');
    }

    //  Verifica se já existe veículo com essa placa
    const vehicleExists = await this.vehicleRepository.findOne({
      where: { plate },
    });
    if (vehicleExists) {
      throw new ConflictException('Veículo com esta placa já existe');
    }

    if (
      createVehicleDto.year < 1900 ||
      createVehicleDto.year > new Date().getFullYear()
    ) {
      throw new ConflictException('Ano inválido');
    }

    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      customer,
    });

    await this.vehicleRepository.save(vehicle);

    return { message: 'Veículo cadastrado com sucesso', vehicle };
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
