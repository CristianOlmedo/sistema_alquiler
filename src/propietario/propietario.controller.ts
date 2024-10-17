import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PropietarioService } from './propietario.service';
import { CrearPropietarioDto } from './dto/crear-propietario.dto';
import { ActualizarPropietarioDto } from './dto/actualizar-propietario.dto';

@Controller('propietarios')
export class PropietarioController {
  constructor(private readonly propietarioService: PropietarioService) {}

  @Get()
  async obtenerTodos() {
    return await this.propietarioService.obtenerTodos();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number) {
    return await this.propietarioService.obtenerPorId(id);
  }

  @Post()
  async crear(@Body() datos: CrearPropietarioDto) {
    return await this.propietarioService.crear(datos);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: number,
    @Body() cambios: ActualizarPropietarioDto,
  ) {
    return await this.propietarioService.actualizar(id, cambios);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number) {
    return await this.propietarioService.eliminar(id);
  }
}
