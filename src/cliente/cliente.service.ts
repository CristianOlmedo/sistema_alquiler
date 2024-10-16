import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { CrearClienteDto } from './dto/crear-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clientRepository: Repository<Cliente>,
  ) {}

  async create(CrearClienteDto: CrearClienteDto): Promise<Cliente> {
    const cliente = this.clientRepository.create({
      ...CrearClienteDto,
      fechaRegistro: new Date(),  // Establece la fecha de registro actual
    });
    return this.clientRepository.save(cliente);
  }

  findAll(): Promise<Cliente[]> {
    return this.clientRepository.find();
  }

  findOne(id: number): Promise<Cliente> {
    return this.clientRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}