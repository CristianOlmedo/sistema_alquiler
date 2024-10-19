import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Propiedad } from 'src/propiedades/propiedad.entity';

@Entity('mantenimiento')
export class Mantenimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Propiedad, (propiedad) => propiedad.id)  // nullable: false evita nulos
  propiedad: Propiedad;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaSolicitud: Date;

  @Column('text')
  descripcionProblema: string;

  @Column({ type: 'enum', enum: ['pendiente', 'en progreso', 'completado'] })
  estado: 'pendiente' | 'en_progreso' | 'completado';

  @Column('decimal', { nullable: true })
  costoEstimado: number;

  @Column('decimal', { nullable: true })
  costoFinal?: number;
}
