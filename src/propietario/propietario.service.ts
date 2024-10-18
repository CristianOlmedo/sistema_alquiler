import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propietario } from './propietario.entity';
import { CrearPropietarioDto } from './dto/crear-propietario.dto';
import { ActualizarPropietarioDto } from './dto/actualizar-propietario.dto';
import { Propiedad } from 'src/propiedades/propiedad.entity';
import { Contrato_alquiler } from 'src/contratos_alquiler/contratos_alquiler.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PropietarioService {
  constructor(
    @InjectRepository(Propietario)
    private readonly propietarioRepositorio: Repository<Propietario>,

    @InjectRepository(Propiedad)
    private readonly propiedadRepositorio: Repository<Propiedad>,

    @InjectRepository(Contrato_alquiler)
    private readonly contratoRepositorio: Repository<Contrato_alquiler>,
  ) {}

  async obtenerTodos(): Promise<Propietario[]> {
    return await this.propietarioRepositorio.find({
      relations: ['propiedades', 'contratos'],
    });
  }

  async obtenerPorId(id: number): Promise<Propietario> {
    const propietario = await this.propietarioRepositorio.findOne({
      where: { id },
      relations: ['propiedades', 'contratos'],
    });
    if (!propietario) {
      throw new NotFoundException(`El propietario con ID ${id} no existe.`);
    }
    return propietario;
  }

  async crear(datos: CrearPropietarioDto): Promise<Propietario> {
    const { password, propiedadesId, contratosId, ...resto } = datos;
  
    const existeCorreo = await this.propietarioRepositorio.findOne({
      where: { correo: datos.correo },
    });
    if (existeCorreo) {
      throw new ConflictException(
        `El correo ${datos.correo} ya está registrado.`,
      );
    }
  
    const hash = await bcrypt.hash(password, 10);
    const nuevoPropietario = this.propietarioRepositorio.create({
      ...resto,
      password: hash,
    });
  
    if (propiedadesId) {
      nuevoPropietario.propiedades = await this.propiedadRepositorio.findByIds(
        propiedadesId,
      );
    }
    if (contratosId) {
      nuevoPropietario.contratos = await this.contratoRepositorio.findByIds(
        contratosId,
      );
    }
  
    return await this.propietarioRepositorio.save(nuevoPropietario);
  }
  
  async actualizar(
    id: number,
    cambios: ActualizarPropietarioDto,
  ): Promise<Propietario> {
    const propietario = await this.obtenerPorId(id);
  
    if (cambios.correo) {
      const existe = await this.propietarioRepositorio.findOne({
        where: { correo: cambios.correo },
      });
      if (existe && existe.id !== id) {
        throw new ConflictException(
          `El correo ${cambios.correo} ya está registrado.`,
        );
      }
    }
  
    if (cambios.password) {
      cambios.password = await bcrypt.hash(cambios.password, 10);
    }
  
    if (cambios['propiedadesId']) {
      propietario.propiedades = await this.propiedadRepositorio.findByIds(
        cambios['propiedadesId'],
      );
    }
    if (cambios['contratosId']) {
      propietario.contratos = await this.contratoRepositorio.findByIds(
        cambios['contratosId'],
      );
    }
  
    Object.assign(propietario, cambios);
    return await this.propietarioRepositorio.save(propietario);
  }
  

  async eliminar(id: number): Promise<void> {
    const resultado = await this.propietarioRepositorio.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(
        `No se pudo eliminar el propietario con ID ${id}.`,
      );
    }
  }
}
