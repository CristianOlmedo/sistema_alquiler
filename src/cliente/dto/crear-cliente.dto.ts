import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CrearClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsDateString()
  @IsOptional() // Opcional, ya que puede asignarse automáticamente
  fechaRegistro?: Date;
}