import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CrearPagoDto } from './dto/crear-pago.dto';
import { ActualizarPagoDto } from './dto/actualizar-pago.dto';
import { Pago } from './pago.entity';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  crear(@Body() crearPagoDto: CrearPagoDto) {
    return this.pagoService.crear(crearPagoDto);
  }
  @Put(':id')
  async actualizar(
    @Param('id') id: number,
    @Body() actualizarPagoDto: ActualizarPagoDto,
  ) {
    return this.pagoService.actualizar(id, actualizarPagoDto);
  }
  @Get()
  async listarPagos(): Promise<Pago[]> {
    return this.pagoService.listarPagos();
  }
}
