import { Body, Controller, Logger, Post, Put, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer';
import * as path from 'path';

import { CardEntity } from '../entities/Card'
import { CardsService } from './cards.service'

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name)

  constructor(private cardsService: CardsService) {}

  @Post()
  addCard(@Body() card: { sectionId: number; title: string }): Promise<CardEntity> {
    this.logger.log('POST /cards')

    return this.cardsService.create(card)
  }

  @Put()
  updateCard(@Body() card: { sectionId: number; title: string, images: any[], description: string, id: number  }): Promise<any> {
    this.logger.log('PUT /cards', );

    return this.cardsService.update(card);
  }
}
