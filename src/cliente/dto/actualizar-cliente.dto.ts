import { IsOptional, IsString, IsEmail } from 'class-validator';

export class ActualizarClienteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

/*   @IsOptional()
  @IsString()
  password?: string; // Permitir la actualización de la contraseña */
}
