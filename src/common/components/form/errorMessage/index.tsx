interface Props {
  error: string
}

const ErrorMessage = ({ error }: Props) => {
  return <p className="text-red-500 text-sm">{error}</p>
}

export default ErrorMessage
