import Comment from '../types/comment'
import Vote from 'modules/vote/types/vote'
import Formatter from 'common/utils/formatter'
import { VoteButtons } from 'modules/vote/components'

interface Props {
  comment: Comment,
  onVote: (commentId: string, vote: Vote) => void
}

const CommentItem = ({ comment, onVote }: Props) => {
  const handleVote = (vote: Vote) => onVote(comment.id, vote)

  return (
    <div className="bg-white py-4 px-8 rounded">
      <p className="text-xl font-bold">{comment.body}</p>

      <p className="text-sm mb-5 text-indigo-500">
        by {comment.author} - <span className="italic">
          {Formatter.getHumanizedDate(comment.timestamp)}
        </span>
      </p>

      <VoteButtons
        onVote={handleVote}
        voteScore={comment.voteScore} />
    </div>
  )
}

export default CommentItem
