import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenimiento } from './mantenimiento.entity';
import { CrearMantenimientoDto } from './dto/crear-mantenimiento.dto';

@Injectable()
export class MantenimientoService {
  constructor(
    @InjectRepository(Mantenimiento)
    private readonly mantenimientoRepository: Repository<Mantenimiento>,
  ) {}

  async create(crearMantenimientoDto: CrearMantenimientoDto): Promise<Mantenimiento> {
    const mantenimiento = this.mantenimientoRepository.create(crearMantenimientoDto);
    return this.mantenimientoRepository.save(mantenimiento);
  }

  findAll(): Promise<Mantenimiento[]> {
    return this.mantenimientoRepository.find();
  }

  findOne(id: number): Promise<Mantenimiento> {
    return this.mantenimientoRepository.findOne({ where: { id } });
  }
}