import RefreshIcon from '../../assets/icons/refresh'
import { Button } from '../'

interface Props {
  errorMessage?: string,
  onTryAgain?: () => void
}

const ErrorRecoverState = ({ errorMessage, onTryAgain }: Props) => {
  return (
    <div className="w-full max-w-xl m-auto flex flex-col items-center p-6">
      <p className="mb-8 text-4xl">
        Ops...
      </p>

      <p className="text-gray-500 text-xl mb-8">
        {errorMessage || 'Something wrong happened'}
      </p>

      {
        onTryAgain && (
          <Button
            onClick={onTryAgain}
            className={`bg-indigo-400 bg-black text-white text-lg py-2 px-5
              hover:ring-4 hover:ring-indigo-400`}>
            <span className="mr-3">Try again</span> <RefreshIcon />
          </Button>
        )
      }
    </div>
  )
}

export default ErrorRecoverState
