import { SchemaOptions, Types, model } from 'mongoose';
import { ModelType, pre, prop, Typegoose } from 'typegoose';

@pre<Acao>('findOne', function(next) {
  console.log('estou passando aqui');
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

const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'acao',
};

export const AcaoModel = new Acao().getModelForClass(Acao, { schemaOptions });
