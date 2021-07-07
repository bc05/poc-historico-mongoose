import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'config';
import { AppService } from './app.service';
import { AcaoModel } from './schemas/acao.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll() {
    return this.appService.getAll();
  }

  @Get('create')
  create() {
    const data = {
      nome: 'teste',
      descricao: 'descricao',
    };
    return this.appService.create(data);
  }

  @Get('update/:id/')
  update(@Param('id') id: string) {
    console.log('passou no update', id);
    this.appService.update(id, { nome: 'novo nome' });
  }

  @Get('delete/:id')
  delete(@Param('id') id: string) {
    console.log('passou no delete', id);
    this.appService.delete(id);
  }
}
