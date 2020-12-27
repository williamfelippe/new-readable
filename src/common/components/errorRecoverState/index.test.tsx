import ErrorRecoverState from './'
import { render, screen, userEvent } from '../../testsSuit'

const props = {
  errorMessage: 'mockErrorMessage',
  onTryAgain: jest.fn()
}

const prepare = (otherProps = {}) => {
  return render(<ErrorRecoverState {...props} {...otherProps} />)
}

describe('ErrorRecoverState', () => {
  it('should show error message passed as prop', () => {
    prepare()

    const errorMessage = screen.getByText(props.errorMessage)

    expect(errorMessage).toBeInTheDocument()
  })

  it('should show a default message when none error message is passed as prop', () => {
    prepare({ errorMessage: '' })

    const defaultErrorMessage = screen.getByText('Something wrong happened')

    expect(defaultErrorMessage).toBeInTheDocument()
  })

  it('should call passed function when click on \'try again\'', () => {
    prepare()

    const tryAgainButton = screen.getByRole('button', { name: /try again/i })
    userEvent.click(tryAgainButton)

    expect(props.onTryAgain).toHaveBeenCalledTimes(1)
  })
})
