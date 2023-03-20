import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("search")
  async search(@Query() query: { q: string }) {
    return await this.appService.searchProducts(query.q);
  }
}

