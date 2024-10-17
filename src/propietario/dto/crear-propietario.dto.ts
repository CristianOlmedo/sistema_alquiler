import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class CrearPropietarioDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  telefono: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  password: string; 
}
