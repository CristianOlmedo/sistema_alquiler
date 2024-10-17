import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propietario } from './propietario.entity';
import { CrearPropietarioDto } from './dto/crear-propietario.dto';
import { ActualizarPropietarioDto } from './dto/actualizar-propietario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PropietarioService {
  constructor(
    @InjectRepository(Propietario)
    private readonly propietarioRepositorio: Repository<Propietario>,
  ) {}

  // Método para obtener todos los propietarios
  async obtenerTodos(): Promise<Propietario[]> {
    return await this.propietarioRepositorio.find();
  }

  // Método para obtener un propietario por ID
  async obtenerPorId(id: number): Promise<Propietario> {
    const propietario = await this.propietarioRepositorio.findOne({ where: { id } });
    if (!propietario) {
      throw new NotFoundException(`El propietario con ID ${id} no existe.`);
    }
    return propietario;
  }

  // Método para crear un nuevo propietario
  async crear(datos: CrearPropietarioDto): Promise<Propietario> {
    const { password, ...resto } = datos;
    const hash = await bcrypt.hash(password, 10);
    const nuevoPropietario = this.propietarioRepositorio.create({
      ...resto,
      password: hash,
    });
    return await this.propietarioRepositorio.save(nuevoPropietario);
  }

  // Método para actualizar un propietario por ID
  async actualizar(id: number, cambios: ActualizarPropietarioDto): Promise<Propietario> {
    const propietario = await this.obtenerPorId(id);
  
    if (cambios.correo) {
      const existe = await this.propietarioRepositorio.findOne({
        where: { correo: cambios.correo },
      });
  
      if (existe && existe.id !== id) {
        throw new Error(`El correo ${cambios.correo} ya está registrado.`);
      }
    }
  
    if (cambios.password) {
      cambios.password = await bcrypt.hash(cambios.password, 10);
    }
  
    Object.assign(propietario, cambios);
    return await this.propietarioRepositorio.save(propietario);
  }
  

  // Método para eliminar un propietario por ID
  async eliminar(id: number): Promise<void> {
    const resultado = await this.propietarioRepositorio.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se pudo eliminar el propietario con ID ${id}.`);
    }
  }
}
