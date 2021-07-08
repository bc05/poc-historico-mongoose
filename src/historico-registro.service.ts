import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType, Typegoose } from 'typegoose';

import {
  HistoricoRegistro,
  TipoAcaoHistoricoRegistro,
} from './schemas/historico-registro.schema';

type TUsuarioAcao = {
  nome: String;
};

type TRegistrarHistorico<Documento extends Typegoose, T> = {
  usuarioAcao: TUsuarioAcao & T;
  nomeCollection: String;
  idDocumentoCollection: String;
  documento: Documento;
  acao: TipoAcaoHistoricoRegistro;
};

@Injectable()
export class HistoricoRegistroService {
  constructor(
    @InjectModel(HistoricoRegistro.modelName)
    public readonly __historicoModel: ModelType<HistoricoRegistro>,
  ) {}

  async registrarHistorico<Documento extends Typegoose, Usuario>(
    data: TRegistrarHistorico<Documento, Usuario>,
  ) {
    await this.__historicoModel.create(data);
  }

  async restaurarDocumento(nomeCollection: string) {
    const historico = await this.__historicoModel
      .find({ nomeCollection })
      .sort({ _id: 'desc' });

    console.log('historico', historico);
  }
}
