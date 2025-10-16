import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mechanic } from './entities/mechanic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MechanicService {
  constructor(
    @InjectRepository(Mechanic)
    private mechanicRepository: Repository<Mechanic>,
  ) {}
  async create(createMechanicDto: CreateMechanicDto) {
    const mechanic = await this.mechanicRepository.create(createMechanicDto);
    await this.mechanicRepository.save(mechanic);

    return {
      message: 'Mecânico criado com sucesso.',
      mechanic,
    };
  }

  findAll() {
    return `This action returns all mechanic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mechanic`;
  }

  update(id: number, updateMechanicDto: UpdateMechanicDto) {
    return `This action updates a #${id} mechanic`;
  }

  remove(id: number) {
    return `This action removes a #${id} mechanic`;
  }
}
