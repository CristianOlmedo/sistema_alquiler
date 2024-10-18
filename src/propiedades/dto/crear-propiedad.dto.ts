import { IsNotEmpty, IsString, IsEnum, IsDecimal, IsInt, IsOptional, } from 'class-validator';

export class CrearPropiedadDto {
  @IsNotEmpty()
  propietarioId: number;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  ciudad: string;

  @IsNotEmpty()
  @IsString()
  departamento: string;

  @IsNotEmpty()
  @IsEnum(['casa', 'apartamento', 'oficina', 'local_comercial'])
  tipoInmueble: 'casa' | 'apartamento' | 'oficina' | 'local_comercial';

  @IsNotEmpty()
  @IsDecimal()
  precioMensual: number;

  @IsNotEmpty()
  @IsInt()
  numHabitaciones: number;

  @IsNotEmpty()
  @IsInt()
  numBanos: number;

  @IsNotEmpty()
  @IsDecimal()
  areaM2: number;

  @IsNotEmpty()
  @IsEnum(['disponible', 'alquilado', 'mantenimiento'])
  estado: 'disponible' | 'alquilado' | 'mantenimiento';

  @IsOptional()
  @IsString()
  descripcion?: string;
}
