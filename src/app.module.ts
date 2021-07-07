import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Acao, AcaoModel, HistoricoAcaoModel } from './schemas/acao.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/historico', {
      retryDelay: 500,
      retryAttempts: 3,
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([
      { name: AcaoModel.modelName, schema: Acao.model.schema },
      {
        name: HistoricoAcaoModel.modelName,
        schema: HistoricoAcaoModel.model.schema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
