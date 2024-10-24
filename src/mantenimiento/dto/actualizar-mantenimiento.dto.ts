import { IsEnum, IsOptional, IsDecimal, IsString } from 'class-validator';

export class ActualizarMantenimientoDto {
  @IsOptional()
  @IsString()
  descripcionProblema?: string;

  @IsOptional()
  @IsEnum(['pendiente', 'en_progreso', 'completado'])
  estado?: 'pendiente' | 'en_progreso' | 'completado';

  @IsOptional()
  @IsDecimal()
  costoEstimado?: number;

  @IsOptional()
  @IsDecimal()
  costoFinal?: number;
}
