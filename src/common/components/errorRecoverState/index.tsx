import RefreshIcon from '../../assets/icons/refresh'
import { Button, Card, Title } from '../'

interface Props {
  errorMessage?: string,
  onTryAgain?: () => void
}

const ErrorRecoverState = ({ errorMessage, onTryAgain }: Props) => {
  return (
    <Card className="w-full">
      <div className="flex flex-col items-center">
        <Title tag="h3" title="Ops..." className="mb-8" unstyled />

        <p className="text-sm text-gray-400 mb-8">
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
    </Card>
  )
}

export default ErrorRecoverState
