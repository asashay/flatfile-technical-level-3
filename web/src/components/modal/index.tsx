import { FunctionComponent } from 'react'
import FocusLock from 'react-focus-lock'

import {
  ModalWrapper,
  BackdropWrapper,
  ModalContent,
  CloseBtn,
  CloseBtnWrapper
} from './styled-components'

export type ModalProps = {
  open: boolean
  toggle?: () => void
  children?: JSX.Element
}

export const Modal: FunctionComponent<ModalProps> = ({ open, toggle, children }) => {
  const handleCloseClick = () => {
    toggle && toggle()
  }

  const modal = (
    <ModalWrapper>
      <BackdropWrapper>
        <FocusLock>
          <ModalContent aria-modal aria-labelledby='Card Modal' tabIndex={-1} role='dialog'>
            <CloseBtnWrapper>
              <CloseBtn
                data-testid='close-btn'
                dangerouslySetInnerHTML={{ __html: `&#x2715` }}
                onClick={handleCloseClick}
              ></CloseBtn>
            </CloseBtnWrapper>
            {children}
          </ModalContent>
        </FocusLock>
      </BackdropWrapper>
    </ModalWrapper>
  )

  return open ? modal : null
}
