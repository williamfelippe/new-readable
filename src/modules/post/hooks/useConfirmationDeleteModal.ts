import { useState } from 'react'

interface ModalData {
  isOpen: boolean,
  data: { postId: string } | null
}

const useConfirmationDeleteModal = () => {
  const [modalData, setModalData] = useState<ModalData>({ isOpen: false, data: null })

  const handleModalOpening = (postId: string) => {
    setModalData({
      isOpen: true,
      data: {
        postId
      }
    })
  }

  const handleModalClosing = () => {
    setModalData({ isOpen: false, data: null })
  }

  return {
    isOpen: modalData.isOpen,
    data: modalData.data,
    handleModalOpening,
    handleModalClosing
  }
}

export default useConfirmationDeleteModal
