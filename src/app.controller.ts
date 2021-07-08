import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

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
      nome: 'Acao 01',
      descricao: 'Descrição da Ação 01',
    };
    return this.appService.create(data);
  }

  @Get('update/:id/')
  update(@Param('id') id: string) {
    console.log('passou no update', id);
    this.appService.update(id, { nome: 'Novo nome para a ação 02' });
  }

  @Get('delete/:id')
  delete(@Param('id') id: string) {
    console.log('passou no delete', id);
    this.appService.delete(id);
  }
}
