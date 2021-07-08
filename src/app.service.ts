import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { TipoAcaoHistoricoRegistro } from './schemas/historico-registro.schema';
import { HistoricoRegistroService } from './historico-registro.service';
import { Acao } from './schemas/acao.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Acao.modelName) public readonly __acaoModel: ModelType<Acao>,
    private historicoRegistroService: HistoricoRegistroService,
  ) {}

  async getAll() {
    const acoes = await this.__acaoModel.find({});

    return acoes;
  }

  async create(data) {
    const acao = await this.__acaoModel.create(data);

    return acao;
  }

  async update(id, data) {
    const registro = await this.__acaoModel.findOne({ _id: id });

    await this.historicoRegistroService.registrarHistorico<Acao>({
      usuarioAcao: '60e6ea6da6f0546168a9451f',
      nomeCollection: this.__acaoModel.modelName,
      idDocumentoCollection: id,
      documento: registro,
      acao: TipoAcaoHistoricoRegistro.ALTERAR,
    });

    this.__acaoModel.findUpdate();

    return this.__acaoModel.deleteMany({ _id: id }, data);
  }

  async delete(id) {
    return this.__acaoModel.deleteOne({ _id: id });
  }
}
