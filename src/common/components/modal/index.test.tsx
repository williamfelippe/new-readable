import Modal from './'
import { render, screen } from '../../testsSuit'

const props = {
  children: <div>test</div>,
  isOpen: false
}

const prepare = (otherProps = {}) => {
  return render(<Modal {...props} {...otherProps} />)
}

describe('Modal', () => {
  it('should not render children if isOpen prop is false', () => {
    prepare()

    const children = screen.queryByText('test')

    expect(children).not.toBeInTheDocument()
  })

  it('should render children if isOpen prop is true', () => {
    prepare({ isOpen: true })

    const children = screen.getByText('test')

    expect(children).toBeInTheDocument()
  })
})
