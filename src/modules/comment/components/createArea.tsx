import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import DateUtil from 'common/utils/date'
import MockInfoUtil from 'common/utils/mockInfo'
import { NewComment } from '../types/comment'
import { SendIcon } from 'common/assets/icons'
import { postComment } from '../store/actions'
import { Button, InputText, Toast } from 'common/components'

interface FormInputs {
  comment: string
}

interface Props {
  postId: string
}

const CreateCommentArea = ({ postId }: Props) => {
  const dispatch = useDispatch()

  const { register, handleSubmit, setValue, reset } = useForm<FormInputs>()

  const handlePostComment = async (comment: NewComment) => {
    try {
      await dispatch(postComment(comment))
      Toast.showToast('Comment saved!')
      reset()
    } catch {
      setValue('comment', comment.body)
    }
  }

  const handleComment = (data: FormInputs) => {
    const body = data.comment

    if (body) {
      const comment: NewComment = {
        id: MockInfoUtil.createId(),
        timestamp: DateUtil.now(),
        body,
        author: MockInfoUtil.createAuthorName(),
        parentId: postId
      }

      handlePostComment(comment)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleComment)}
      className={`flex items-center absolute bottom-0 left-0 p-5 w-full
      border-t border-gray-200 shadow bg-gray-50`}>
      <div className="flex-grow">
        <InputText
          name="comment"
          ref={register}
          placeholder="Add your comment..." />
      </div>

      <Button
        type="submit"
        disabled={false}
        className={classnames('ml-5 hover:text-indigo-400 text-base flex-none', {
          'animate-bounce': false // TODO: Add loading status when creating comment
        })}>
        <SendIcon />
      </Button>
    </form>
  )
}

export default CreateCommentArea
