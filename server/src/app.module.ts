/* istanbul ignore file */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SectionsController } from './sections/sections.controller'
import { CardsController } from './cards/cards.controller'
import { CardEntity } from './entities/Card'
import { CardsService } from './cards/cards.service'
import { SectionEntity } from './entities/Section'
import { SectionsService } from './sections/sections.service'
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'technical',
      password: 'technical',
      database: 'technical',
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([CardEntity, SectionEntity]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MulterModule.register({
      dest: join(__dirname, '..', 'public'),
      storage: diskStorage({
        destination: join(__dirname, '..', 'public')
      })
    })
  ],
  controllers: [AppController, SectionsController, CardsController],
  providers: [AppService, CardsService, SectionsService],
})
export class AppModule {}
