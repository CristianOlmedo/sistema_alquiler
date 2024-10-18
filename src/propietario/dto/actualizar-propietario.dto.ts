import { IsOptional, IsArray, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class ActualizarPropietarioDto {
  nombre?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  password?: string;

  @IsOptional()
  @IsArray()
  propiedadesId?: number[];

  @IsOptional()
  @IsArray()
  contratosId?: number[];
}
