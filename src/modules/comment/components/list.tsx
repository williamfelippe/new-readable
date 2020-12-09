import CommentItem from './item'
import Comment from '../types/comment'
import Vote from 'modules/vote/types/vote'

interface Props {
  comments: Comment[],
  onVote: (commentId: string, vote: Vote) => void
}

const CommentsList = ({ comments, onVote }: Props) => {
  return (
    <div className="grid grid-cols-1 divide-y divide-gray-100">
      {
        comments.map(comment => (
          <div key={comment.id} className="mb-4">
            <CommentItem
              comment={comment}
              onVote={onVote} />
          </div>
        ))
      }
    </div>
  )
}

export default CommentsList
