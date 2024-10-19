import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mantenimiento } from './mantenimiento.entity';
import { CrearMantenimientoDto } from './dto/crear-mantenimiento.dto';
import { Propiedad } from 'src/propiedades/propiedad.entity';

@Injectable()
export class MantenimientoService {
  constructor(
    @InjectRepository(Mantenimiento)
    private readonly mantenimientoRepositorio: Repository<Mantenimiento>,

    @InjectRepository(Propiedad)
    private readonly propiedadRepositorio: Repository<Propiedad>,
  ) {}

  // Crear un nuevo mantenimiento
  async create(datos: CrearMantenimientoDto): Promise<Mantenimiento> {
    const propiedad = await this.propiedadRepositorio.findOneBy({
      id: datos.propiedadId, // Busca la propiedad por ID
    });

    if (!propiedad) {
      throw new NotFoundException(`La propiedad con ID ${datos.propiedadId} no existe.`);
    }

    const mantenimiento = this.mantenimientoRepositorio.create({
      ...datos,
      propiedad, // Establece la propiedad relacionada
      fechaSolicitud: new Date(), // Establece la fecha de solicitud
    });

    return this.mantenimientoRepositorio.save(mantenimiento);
  }

  // Obtener todos los mantenimientos
  async findAll(): Promise<Mantenimiento[]> {
    return await this.mantenimientoRepositorio.find({
      relations: ['propiedad'], // Incluye la relación con la propiedad
    });
  }

  // Obtener un mantenimiento por ID
  async findOne(id: number): Promise<Mantenimiento> {
    const mantenimiento = await this.mantenimientoRepositorio.findOne({
      where: { id },
      relations: ['propiedad'], // Incluye la relación con la propiedad
    });
    
    if (!mantenimiento) {
      throw new NotFoundException(`El mantenimiento con ID ${id} no existe.`);
    }

    return mantenimiento;
  }

  // Eliminar un mantenimiento
  async remove(id: number): Promise<void> {
    const resultado = await this.mantenimientoRepositorio.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se pudo eliminar el mantenimiento con ID ${id}.`);
    }
  }
}
