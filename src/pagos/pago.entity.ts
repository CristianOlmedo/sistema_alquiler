import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { Contrato_alquiler } from 'src/contratos_alquiler/contratos_alquiler.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.contratos)
  inquilino: Cliente;

  @ManyToOne(() => Contrato_alquiler, (contrato_alquiler) => contrato_alquiler.contrato_alquilerID)
  contrato: Contrato_alquiler;

  @Column({ type: 'decimal' })
  monto: number;

  @Column({ type: 'enum', enum: ['Nequi', 'Tarjeta de Crédito', 'Efectivo', 'Transferencia'] })
  metodoPago: 'Nequi' | 'Tarjeta de Crédito' | 'Efectivo' | 'Transferencia';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaPago: Date;

  @Column({ type: 'enum', enum: ['pendiente', 'completado'], default: 'pendiente' })
  estado: 'pendiente' | 'completado';

  @Column({ nullable: true })
  referencia?: string; // para agregar un código o referencia de la transacción
}