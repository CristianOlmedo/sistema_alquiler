import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CrearClienteDto } from './dto/crear-cliente.dto';
import { ActualizarClienteDto } from './dto/actualizar-cliente.dto';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() crearClienteDto: CrearClienteDto): Promise<Cliente> {
    return this.clienteService.create(crearClienteDto);
  }

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cliente> {
    const cliente = await this.clienteService.findOne(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return cliente;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() actualizarClienteDto: ActualizarClienteDto,
  ): Promise<Cliente> {
    const clienteActualizado = await this.clienteService.update(
      id,
      actualizarClienteDto,
    );
    if (!clienteActualizado) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return clienteActualizado;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.clienteService.remove(id);
  }
}
