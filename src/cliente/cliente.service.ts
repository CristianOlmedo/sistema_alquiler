import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CrearClienteDto } from './dto/crear-cliente.dto';
import { ActualizarClienteDto } from './dto/actualizar-cliente.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientRepository: Repository<Cliente>,
  ) {}

  // Crear un nuevo cliente
  async create(datos: CrearClienteDto): Promise<Cliente> {
    const cliente = this.clientRepository.create({
      ...datos,
      fechaRegistro: new Date(),  // Establece la fecha de registro actual
    });

    // Encriptar la contraseña antes de guardar
/*     if (datos.password) {
      const hash = await bcrypt.hash(datos.password, 10);
      cliente.password = hash;
    } */
    
    return this.clientRepository.save(cliente);
  }

  // Obtener todos los clientes
  async findAll(): Promise<Cliente[]> {
    return await this.clientRepository.find();
  }

  // Obtener un cliente por ID
  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`El cliente con ID ${id} no existe.`);
    }
    return cliente;
  }

  // Actualizar un cliente
  async update(id: number, cambios: ActualizarClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id); // Busca el cliente por ID

    // Verificar si el correo está en uso por otro cliente
    if (cambios.correo) {
      const existe = await this.clientRepository.findOne({
        where: { correo: cambios.correo },
      });
      if (existe && existe.id !== id) {
        throw new ConflictException(`El correo ${cambios.correo} ya está registrado.`);
      }
    }

/*     // Encriptar la nueva contraseña si se proporciona
    if (cambios.password) {
      cambios.password = await bcrypt.hash(cambios.password, 10);
    } */

    // Actualiza el cliente con los nuevos datos
    Object.assign(cliente, cambios);
    return await this.clientRepository.save(cliente);
  }

  // Eliminar un cliente
  async remove(id: number): Promise<void> {
    const resultado = await this.clientRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se pudo eliminar el cliente con ID ${id}.`);
    }
  }
}
