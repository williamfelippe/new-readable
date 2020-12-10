import { Button, Modal } from 'common/components'

interface Props {
  isOpen: boolean,
  onAccept: () => void,
  onRefuse: () => void
}

const ConfirmModal = ({ isOpen, onAccept, onRefuse }: Props) => {
  return (
    <Modal isOpen={isOpen}>
      <div className="text-center">
        <p className="text-2xl text-gray-600 mb-6">
          Are you sure that you want to delete this post?
        </p>

        <div className="flex items-center justify-center">
          <Button
            onClick={onAccept}
            className={`mr-20 bg-indigo-400 hover:bg-indigo-500 transition
            duration-300 ease-in-out text-white py-2 px-8`}>
            Yes
          </Button>

          <Button
            onClick={onRefuse}
            className={`bg-white text:gray-500 hover:bg-gray-500 hover:text-white
            transition duration-300 ease-in-out border-solid border
            border-gray-400 py-2 px-8`}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
