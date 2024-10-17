import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/cliente.entity';
import { Contrato_alquiler } from './contratos_alquiler/contratos_alquiler.entity';
import { Mantenimiento } from './mantenimiento/mantenimiento.entity';
import { Pago } from './pagos/pago.entity';
import { Propiedad } from './propiedades/propiedad.entity';
import { Propietario } from './propietario/propietario.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteController } from './cliente/cliente.controller';
import { PropietarioController } from './propietario/propietario.controller';
import { PropiedadesController } from './propiedades/propiedades.controller';
import { ContratosAlquilerController } from './contratos_alquiler/contratos_alquiler.controller';
import { PagosController } from './pagos/pagos.controller';
import { MantenimientoController } from './mantenimiento/mantenimiento.controller';
import { ClienteService } from './cliente/cliente.service';
import { MantenimientoService } from './mantenimiento/mantenimiento.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'sistema_alquiler',
      entities: [Cliente, Contrato_alquiler, Mantenimiento, Pago, Propiedad, Propietario],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Cliente, Contrato_alquiler, Mantenimiento, Pago, Propiedad, Propietario]),
  ],
  controllers: [AppController, ClienteController, ContratosAlquilerController, MantenimientoController, PagosController, PropiedadesController, PropietarioController],
  providers: [AppService, ClienteService, MantenimientoService],
})
export class AppModule { }