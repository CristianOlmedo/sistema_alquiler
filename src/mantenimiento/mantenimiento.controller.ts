import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service';
import { CrearMantenimientoDto } from './dto/crear-mantenimiento.dto';

@Controller('mantenimientos')
export class MantenimientoController {
constructor(private readonly MantenimientoService: MantenimientoService) {}

@Post()
create(@Body() CrearClienteDto: CrearMantenimientoDto) {
  return this.MantenimientoService.create(CrearClienteDto);
}

@Get()
findAll() {
  return this.MantenimientoService.findAll();
}

@Get(':id')
findOne(@Param('id') id: number) {
  return this.MantenimientoService.findOne(id);
}
}