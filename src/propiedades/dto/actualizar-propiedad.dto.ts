import { IsString, IsEnum, IsDecimal, IsInt, IsOptional } from 'class-validator';
  
  export class ActualizarPropiedadDto {
    @IsOptional()
    propietarioId?: number;
  
    @IsOptional()
    @IsString()
    direccion?: string;
  
    @IsOptional()
    @IsString()
    ciudad?: string;
  
    @IsOptional()
    @IsString()
    departamento?: string;
  
    @IsOptional()
    @IsEnum(['casa', 'apartamento', 'oficina', 'local_comercial'])
    tipoInmueble?: 'casa' | 'apartamento' | 'oficina' | 'local_comercial';
  
    @IsOptional()
    @IsDecimal()
    precioMensual?: number;
  
    @IsOptional()
    @IsInt()
    numHabitaciones?: number;
  
    @IsOptional()
    @IsInt()
    numBanos?: number;
  
    @IsOptional()
    @IsDecimal()
    areaM2?: number;
  
    @IsOptional()
    @IsEnum(['disponible', 'alquilado', 'mantenimiento'])
    estado?: 'disponible' | 'alquilado' | 'mantenimiento';
  
    @IsOptional()
    @IsString()
    descripcion?: string;
  }
  