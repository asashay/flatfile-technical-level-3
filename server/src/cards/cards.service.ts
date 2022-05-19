import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CardEntity } from '../entities/Card'
import { Repository } from 'typeorm'

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(CardEntity)
    private cardsRepository: Repository<CardEntity>
  ) {}

  create({ sectionId, title }: { sectionId: number; title: string }): Promise<CardEntity> {
    let card = new CardEntity()
    card.title = title
    card.section_id = sectionId
    return this.cardsRepository.save(card)
  }

  update({ title, description, images, id }: 
    { title: string, description: string, images: string[], id: number }): Promise<CardEntity> {
    return this.cardsRepository.save({ id, description, title, images})
  }
}
