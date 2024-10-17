import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contrato_alquiler } from 'src/contratos_alquiler/contratos_alquiler.entity';
import { Propiedad } from 'src/propiedades/propiedad.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;
  
  @Column({ unique: true })
  correo: string;

  @Column({ length: 20 })
  telefono: string;

  @Column()
  direccion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @OneToMany(() => Propiedad, (propiedad) => propiedad.propietarioId)
  propiedades: Propiedad[];

  @OneToMany(() => Contrato_alquiler, (contrato_alquiler) => contrato_alquiler.clienteId)
  contratos: Contrato_alquiler[];
}
