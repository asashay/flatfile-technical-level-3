import React, { FormEvent } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import axios from 'axios'
import map from 'lodash/map'

import { Modal } from '../modal'

import {
  CardContainer,
  CardTitle,
  CardInput,
  InputLabel,
  StyledInput,
  StyledBtn
} from './styled-components'

const schema = yup.object().shape({
  title: yup.string().trim().required(),
  description: yup.string().trim(),
  images: yup.array().of(yup.mixed())
})

type FormType = {
  title: string
  description: string
  images: ImageListType
}

const Card = ({ card: { title, id, description, images } }: any) => {
  const [open, setOpen] = React.useState(false);
  const [cardImages, setCardImages] = React.useState<ImageListType>(
    map(images, (el: any) => ({ data_url: el }))
  )
  const maxNumber = 3

  const { register, handleSubmit, setValue } = useForm<FormType>({
    mode: 'onBlur',
    defaultValues: { title, description, images: [] },
    resolver: yupResolver(schema)
  })

  const onChange = (imageList: ImageListType) => {
    setCardImages(imageList)
    setValue('images', imageList)
  }

  const toggle = () => setOpen(!open)

  const handleCardClick = () => toggle()

  const onCardSubmit = (data: any) => {
    axios({
      method: 'put',
      url: 'http://localhost:3001/cards',
      data: { ...data, images: map(cardImages, (el) => el.data_url), id }
    }).then((response) => {
      console.log('res', response)
    }).catch(err => {
      console.log('err', err);
    }).finally(() => toggle())
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSubmit(onCardSubmit)()
  }

  return (
    <div>
      <CardContainer onClick={handleCardClick} className='card'>
        <CardTitle>{title}</CardTitle>
      </CardContainer>
      <Modal open={open} toggle={toggle}>
        <div style={{ position: 'relative'}}>
          <form onSubmit={handleFormSubmit}>
            <CardInput>
              <InputLabel htmlFor='card-title' style={{ marginBottom: '6px' }}>
                Title
              </InputLabel>
              <StyledInput {...register('title', { required: true })}></StyledInput>
            </CardInput>
            <CardInput>
              <InputLabel htmlFor='card-title'>Description</InputLabel>
              <StyledInput {...register('description')}></StyledInput>
            </CardInput>
            <ImageUploading
              multiple
              value={cardImages}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey='data_url'
            >
              {({ onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
                <div className='upload__image-wrapper'>
                  <StyledBtn onClick={onImageUpload}>Upload images</StyledBtn>
                  &nbsp;
                  <StyledBtn onClick={onImageRemoveAll}>Remove all images</StyledBtn>
                  {map(cardImages, (image, index) => (
                    <div key={index} className='image-item'>
                      <img src={image['data_url']} alt='' width='100' />
                      <div className='image-item__btn-wrapper'>
                        <StyledBtn onClick={() => onImageUpdate(index)}>Update</StyledBtn>
                        <StyledBtn onClick={() => onImageRemove(index)}>Remove</StyledBtn>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
            <StyledBtn type='submit'>Submit</StyledBtn>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Card
