import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pago.entity';
import { CrearPagoDto } from './dto/crear-pago.dto';
import { Cliente } from 'src/cliente/cliente.entity';
import { ActualizarPagoDto } from './dto/actualizar-pago.dto';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepositorio: Repository<Pago>,
    @InjectRepository(Cliente)
    private readonly clienteRepositorio: Repository<Cliente>,
  ) {}

  async crear(datos: CrearPagoDto): Promise<Pago> {
    const cliente = await this.clienteRepositorio.findOne({
      where: { id: datos.clienteId },
    });

    if (!cliente) {
      throw new NotFoundException(`El cliente con ID ${datos.clienteId} no existe.`);
    }

    const nuevoPago = this.pagoRepositorio.create({
      ...datos,
      cliente: cliente,
    });

    return this.pagoRepositorio.save(nuevoPago);
  }

    // Método para actualizar un pago
  async actualizar(id: number, cambios: ActualizarPagoDto): Promise<Pago> {
    const pago = await this.pagoRepositorio.findOne({ where: { id }, relations: ['cliente'] });

    if (!pago) {
      throw new NotFoundException(`El pago con ID ${id} no existe.`);
    }

    // Si se proporciona un nuevo cliente, verificar que exista
    if (cambios.clienteId) {
      const cliente = await this.clienteRepositorio.findOne({ where: { id: cambios.clienteId } });
      if (!cliente) {
        throw new NotFoundException(`El cliente con ID ${cambios.clienteId} no existe.`);
      }
      pago.cliente = cliente;
    }

    // Actualizar solo los campos que fueron proporcionados
    Object.assign(pago, cambios);

    return await this.pagoRepositorio.save(pago);
  }

    // Método para listar todos los pagos
    async listarPagos(): Promise<Pago[]> {
      return await this.pagoRepositorio.find(); // Recupera todos los pagos
    }


  // Otras funciones como buscar pagos, eliminar pagos, etc.
}
