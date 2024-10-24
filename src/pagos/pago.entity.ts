import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  monto: number;

  @Column({ type: 'date' })
  fechaPago: Date;

  @Column({ type: 'varchar', length: 255 })
  metodoPago: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.id)
  cliente: Cliente; // Relación con el cliente
}
