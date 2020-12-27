import Sidebar from './'
import { render, screen, userEvent } from '../../testsSuit'

const props = {
  children: <div>test</div>,
  open: false,
  onClose: jest.fn(),
  className: 'testClass'
}

const prepare = (otherProps = {}) => {
  return render(<Sidebar {...props} {...otherProps} />)
}

describe('Sidebar', () => {
  it('should not render content when open prop is false', () => {
    prepare()

    const children = screen.queryByText('test')

    expect(children).not.toBeInTheDocument()
  })

  it('should render content when open prop is true', () => {
    prepare({ open: true })

    const children = screen.getByText('test')

    expect(children).toBeInTheDocument()
  })

  it('should call onClose function when click on the close button', () => {
    prepare()

    const closeButton = screen.getByRole('button')
    userEvent.click(closeButton)

    expect(props.onClose).toHaveBeenCalledTimes(1)
  })

  it('should add class passed as props', () => {
    prepare()

    const sidebar = screen.getByTestId('sidebar')

    expect(sidebar).toHaveClass(props.className)
  })
})
