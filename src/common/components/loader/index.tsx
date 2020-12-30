import clsx from 'clsx'

import Backdrop from '../backdrop'

enum LoaderSizes {
  XS = 'xs',
  MD = 'md',
  LG = 'lg'
}

interface Props {
  classNames?: string,
  size?: LoaderSizes.XS | LoaderSizes.MD | LoaderSizes.LG,
  full?: boolean
}

const Loader = ({ classNames, size = LoaderSizes.LG, full = false }: Props) => {
  const loaderClasses = clsx(
    `rounded-full border-solid border-gray-300
    border-t-indigo-400 animate-spin`,
    {
      'h-6 w-6 border-solid border-2': size === LoaderSizes.XS,
      'h-12 w-12 border-solid border-4': size === LoaderSizes.MD,
      'h-16 w-16 border-solid border-6': size === LoaderSizes.LG
    },
    classNames
  )

  if (full) {
    return (
      <Backdrop>
        <div data-testid="loader" className={loaderClasses} />
      </Backdrop>
    )
  }

  return <div data-testid="loader" className={loaderClasses} />
}

export default Loader
