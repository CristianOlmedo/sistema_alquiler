import { IsDecimal, IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class CrearPagoDto {
  @IsDecimal()
  monto: number;

  @IsDateString()
  fechaPago: string;

  @IsString()
  @IsNotEmpty()
  metodoPago: string;

  @IsNotEmpty()
  clienteId: number; // ID del cliente que realiza el pago
}
