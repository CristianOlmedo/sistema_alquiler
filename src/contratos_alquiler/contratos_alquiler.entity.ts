import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Propiedad } from 'src/propiedades/propiedad.entity';
import { Cliente } from 'src/cliente/cliente.entity';

@Entity('contrato_alquiler')
export class Contrato_alquiler {
  @PrimaryGeneratedColumn()
  contrato_alquilerID: number;

  @ManyToOne(() => Propiedad, (propiedad) => propiedad.contratos)
  propiedadId: Propiedad;

  @ManyToOne(() => Cliente, (cliente) => cliente.contratos)
  clienteId: Cliente;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column('decimal')
  rentaMensual: number;

  @Column('decimal')
  depositoGarantia: number;

  @Column('text')
  terminosContrato: string;

  @Column({ type: 'enum', enum: ['activo', 'finalizado', 'pendiente'] })
  estado: 'activo' | 'finalizado' | 'pendiente';
}
