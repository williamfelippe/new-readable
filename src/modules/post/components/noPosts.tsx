import { InfoIcon } from 'common/assets/icons'

const NoPosts = () => {
  return (
    <div className="flex flex-col items-center mt-56">
      <p className="font-bold text-indigo-400 mb-4">
        <InfoIcon className="w-20 h-20" />
      </p>
      <p className="text-3xl text-gray-600">
        No posts at the moment
      </p>
    </div>
  )
}

export default NoPosts
