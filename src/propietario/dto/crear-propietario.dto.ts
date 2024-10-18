import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, IsArray, IsOptional } from 'class-validator';

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

  @IsOptional()
  @IsArray()
  propiedadesId: number[];

  @IsOptional()
  @IsArray()
  contratosId: number[];
}
