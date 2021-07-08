import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Acao, AcaoModel } from './schemas/acao.schema';
import { HistoricoRegistro } from './schemas/historico-registro.schema';
import { HistoricoRegistroService } from './historico-registro.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/historico', {
      retryDelay: 500,
      retryAttempts: 3,
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([
      { name: AcaoModel.modelName, schema: AcaoModel.model.schema },
      {
        name: HistoricoRegistro.modelName,
        schema: HistoricoRegistro.model.schema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, HistoricoRegistroService],
})
export class AppModule {}
