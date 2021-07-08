import { ModelType, prop, Typegoose } from 'typegoose';
import { SchemaOptions, Types } from 'mongoose';

export enum TipoAcaoHistoricoRegistro {
  ALTERAR = 'Alteração',
  EXCLUIR = 'Exclusão',
}

export class HistoricoRegistro extends Typegoose {
  @prop({ required: true })
  usuarioAcao!: Object;

  @prop({ required: true, index: true })
  nomeCollection!: String;

  @prop({ required: true })
  documento!: Object;

  @prop({
    enum: TipoAcaoHistoricoRegistro,
  })
  acao!: TipoAcaoHistoricoRegistro;

  @prop({ default: Date.now, index: true })
  dataCriacao!: Date;

  static get model(): ModelType<HistoricoRegistro> {
    return new HistoricoRegistro().getModelForClass(HistoricoRegistro, {
      schemaOptions,
    });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}

const schemaOptions: Readonly<SchemaOptions> = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  collection: 'historicoRegistro',
};
