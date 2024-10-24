import { IsOptional, IsDecimal, IsDateString, IsString } from 'class-validator';

export class ActualizarPagoDto {
  @IsOptional()
  @IsDecimal()
  monto?: number;

  @IsOptional()
  @IsDateString()
  fechaPago?: string;

  @IsOptional()
  @IsString()
  metodoPago?: string;

  @IsOptional()
  clienteId?: number; // En caso de que se quiera cambiar el cliente asociado
}
