import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { Acao } from './schemas/acao.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Acao.modelName) public readonly __acaoModel: ModelType<Acao>,
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
    return this.__acaoModel.updateOne({ _id: id }, data);
  }

  async delete(id) {
    return this.__acaoModel.deleteOne({ _id: id });
  }
}
