import styled from 'styled-components'

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
`

export const BackdropWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 500;
`

export const ModalContent = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  z-index: 700;
  width: inherit;
  outline: 0;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
`

export const CloseBtn = styled.div`
  font-size: 14px;
  border: none;
  margin-left: 0.5rem;
  width: 44px;
  height: auto;
  border-radius: 50%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  font-weight: bold;
`

export const CloseBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
