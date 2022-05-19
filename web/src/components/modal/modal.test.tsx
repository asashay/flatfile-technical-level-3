import { render, cleanup, screen } from '@testing-library/react'

import { Modal } from './index'

jest.mock('axios')

describe('<Modal />', () => {
  afterEach(cleanup)

  it('matches snapshot', async () => {
    const { asFragment } = render(<Modal open />)

    await screen.findByTestId('close-btn')

    expect(asFragment).toMatchSnapshot()
  })

  it('renders Modal successfully', async () => {
    render(<Modal open />)

    const modalCloseBtn = await screen.findByTestId('close-btn')
    expect(modalCloseBtn).toBeTruthy()
  })

  it('renders Modal children successfully', async () => {
    render(
      <Modal open>
        <div data-testid='test-child'>Test child</div>
      </Modal>
    )

    await screen.findByTestId('close-btn')
    const testChild = await screen.findByTestId('test-child')

    expect(testChild).toBeTruthy()
  })
})
