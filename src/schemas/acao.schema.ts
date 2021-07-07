import { MongooseModule } from '@nestjs/mongoose';
import { SchemaOptions, Types, model } from 'mongoose';
import { ModelType, pre, prop, Typegoose } from 'typegoose';
import { HistoricoBase } from './historico-base.schema';

@pre<Acao>('updateOne', function(next) {
  console.log('estou passando aqui');
  const historico = model(
    HistoricoAcaoModel.modelName,
    HistoricoAcaoModel.model.schema,
  );
  historico.create({ nome: 'noix' });
  next();
})
export class Acao extends Typegoose {
  @prop({
    required: [true, 'O nome obrigatório'],
  })
  nome: string;

  @prop({
    required: [true, 'A descrição obrigatório'],
  })
  descricao: string;

  static get model(): ModelType<Acao> {
    return new Acao().getModelForClass(Acao, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}

class HistoricoAcao extends Acao {
  static get model(): ModelType<HistoricoAcao> {
    return new HistoricoAcao().getModelForClass(HistoricoAcao, {
      schemaOptions: historicoSchemaOptions,
    });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}

const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'acao',
};

const historicoSchemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'historicoAcao',
};

export const AcaoModel = new Acao().getModelForClass(Acao, { schemaOptions });
export const HistoricoAcaoModel = new HistoricoAcao().getModelForClass(
  HistoricoAcao,
  { schemaOptions: historicoSchemaOptions },
);
