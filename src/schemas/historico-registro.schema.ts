import { ModelType, prop, Typegoose } from 'typegoose';
import { SchemaOptions, Types } from 'mongoose';

export enum TipoAcaoHistoricoRegistro {
  ALTERAR = 'Alteração',
  EXCLUIR = 'Exclusão',
}

export class HistoricoRegistro extends Typegoose {
  @prop({ required: true })
  usuarioAcao: Types.ObjectId;

  @prop({ default: Date.now, index: true })
  dataCriacao: Date;

  @prop()
  idDocumentoCollection: Types.ObjectId;

  @prop({ required: true })
  documento: Object;

  @prop({ required: true })
  nomeCollection: String;

  @prop({
    enum: TipoAcaoHistoricoRegistro,
  })
  acao: TipoAcaoHistoricoRegistro;

  static get model(): ModelType<HistoricoRegistro> {
    return new HistoricoRegistro().getModelForClass(HistoricoRegistro, {
      schemaOptions,
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
  collection: 'historicoRegistro',
};
