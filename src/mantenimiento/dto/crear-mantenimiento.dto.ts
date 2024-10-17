import { IsNotEmpty, IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';

export class CrearMantenimientoDto {
  @IsNotEmpty()
  @IsNumber()
  propiedadId: number;

  @IsNotEmpty()
  @IsString()
  descripcionProblema: string;

  @IsNotEmpty()
  @IsEnum(['pendiente', 'en_progreso', 'completado'])
  estado: 'pendiente' | 'en_progreso' | 'completado';

  @IsOptional()
  @IsNumber()
  costoEstimado?: number;
}