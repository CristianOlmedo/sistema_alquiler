import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CrearClienteDto } from './dto/crear-cliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly ClienteService: ClienteService) {}

  @Post()
  create(@Body() CrearClienteDto: CrearClienteDto) {
    return this.ClienteService.create(CrearClienteDto);
  }

  @Get()
  findAll() {
    return this.ClienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ClienteService.findOne(id);
  }
}