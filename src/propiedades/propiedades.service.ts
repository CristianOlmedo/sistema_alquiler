import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propiedad } from './propiedad.entity';
import { CrearPropiedadDto } from './dto/crear-propiedad.dto';
import { ActualizarPropiedadDto } from './dto/actualizar-propiedad.dto';
import { Propietario } from 'src/propietario/propietario.entity';

@Injectable()
export class PropiedadesService {
  constructor(
    @InjectRepository(Propiedad)
    private readonly propiedadRepositorio: Repository<Propiedad>,
  ) {}

  async obtenerTodas(): Promise<Propiedad[]> {
    return await this.propiedadRepositorio.find({
      relations: ['propietarioId'],
    });
  }

  async obtenerPorId(id: number): Promise<Propiedad> {
    const propiedad = await this.propiedadRepositorio.findOne({
      where: { id },
      relations: ['propietarioId'],
    });
    if (!propiedad) {
      throw new NotFoundException(`La propiedad con ID ${id} no existe.`);
    }
    return propiedad;
  }

  async crear(datos: CrearPropiedadDto): Promise<Propiedad> {
    const nuevaPropiedad = this.propiedadRepositorio.create({
      ...datos,
      propietarioId: { id: datos.propietarioId } as Propietario,
    });

    return await this.propiedadRepositorio.save(nuevaPropiedad);
  }

  async actualizar(
    id: number,
    cambios: ActualizarPropiedadDto,
  ): Promise<Propiedad> {
    const propiedad = await this.obtenerPorId(id);
    Object.assign(propiedad, cambios);
    return await this.propiedadRepositorio.save(propiedad);
  }

  async eliminar(id: number): Promise<void> {
    const resultado = await this.propiedadRepositorio.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(
        `No se pudo eliminar la propiedad con ID ${id}.`,
      );
    }
  }
}
