import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany  } from 'typeorm';
import { Propietario } from 'src/propietario/propietario.entity';
import { Mantenimiento } from 'src/mantenimiento/mantenimiento.entity';

@Entity('propiedades')
export class Propiedad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Propietario, (propietario) => propietario.id)
  propietarioId: Propietario;

  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @Column()
  departamento: string;

  @Column({ type: 'enum', enum: ['casa', 'apartamento', 'oficina', 'local_comercial'] })
  tipoInmueble: 'casa' | 'apartamento' | 'oficina' | 'local_comercial';

  @Column('decimal')
  precioMensual: number;

  @Column()
  numHabitaciones: number;

  @Column()
  numBanos: number;

  @Column('decimal')
  areaM2: number;

  @Column({ type: 'enum', enum: ['disponible', 'alquilado', 'mantenimiento'] })
  estado: 'disponible' | 'alquilado' | 'mantenimiento';

  @Column({ nullable: true })
  descripcion?: string;

  @OneToMany(() => Mantenimiento, (mantenimiento) => mantenimiento.propiedad)
  mantenimientos: Mantenimiento[];
}
