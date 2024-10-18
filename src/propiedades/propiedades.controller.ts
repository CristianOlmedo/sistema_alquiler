import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { PropiedadesService } from './propiedades.service';
import { CrearPropiedadDto } from './dto/crear-propiedad.dto';
import { ActualizarPropiedadDto } from './dto/actualizar-propiedad.dto';

@Controller('propiedades')
export class PropiedadesController {
  constructor(private readonly propiedadesService: PropiedadesService) {}

  @Get()
  async obtenerTodas() {
    return await this.propiedadesService.obtenerTodas();
  }

  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.propiedadesService.obtenerPorId(id);
  }

  @Post()
  async crear(@Body() datos: CrearPropiedadDto) {
    return await this.propiedadesService.crear(datos);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() cambios: ActualizarPropiedadDto,
  ) {
    return await this.propiedadesService.actualizar(id, cambios);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return await this.propiedadesService.eliminar(id);
  }
}
