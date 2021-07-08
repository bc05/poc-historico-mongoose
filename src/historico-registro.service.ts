import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, Typegoose } from 'typegoose';

import {
  HistoricoRegistro,
  TipoAcaoHistoricoRegistro,
} from './schemas/historico-registro.schema';

type IRegistrarHistorico<T extends Typegoose> = {
  usuarioAcao: String;
  nomeCollection: String;
  idDocumentoCollection: String;
  documento: T;
  acao: TipoAcaoHistoricoRegistro;
};

@Injectable()
export class HistoricoRegistroService {
  constructor(
    @InjectModel(HistoricoRegistro.modelName)
    public readonly __historicoModel: ModelType<HistoricoRegistro>,
  ) {}

  async registrarHistorico<T extends Typegoose>(data: IRegistrarHistorico<T>) {
    await this.__historicoModel.create(data);
  }

  async listarHistorico(idDocumento: String) {
    return await this.__historicoModel.find({ idDocumento });
  }
}
