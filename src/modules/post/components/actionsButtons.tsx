import { NavLink } from 'react-router-dom'

import Post from '../types/post'
import Vote from 'modules/vote/types/vote'
import RoutesPaths from 'common/routes/routesPaths'
import { VoteButtons } from 'modules/vote/components'
import { Button, Tooltip } from 'common/components'
import {
  CommentIcon,
  EditIcon,
  RemoveIcon
} from 'common/assets/icons'

interface Props {
  post: Post,
  onRemove: (postId: string) => void,
  onVote: (postId: string, vote: Vote) => void
}

const ActionsButtons = ({ post, onRemove, onVote }: Props) => {
  const handleRemove = () => onRemove(post.id)

  const handleVote = (vote: Vote) => onVote(post.id, vote)

  return (
    <div className="grid gap-2 grid-cols-4 text-sm items-center">
      <NavLink
        exact
        to={`${RoutesPaths.ROOT}?postId=${post.id}`}
        data-tip="Comments"
        className={`flex items-center hover:text-indigo-400
        justify-center transition duration-300 ease-in-out`}>
        <CommentIcon /> <span className="m-3">
          {post.commentCount}
        </span>
      </NavLink>

      <NavLink
        exact
        to={RoutesPaths.EDIT_POST.replace(':postId', post.id)}
        data-tip="Edit"
        className={`hover:text-indigo-400 flex justify-center
        transition duration-300 ease-in-out`}>
        <EditIcon />
      </NavLink>

      <Button
        onClick={handleRemove}
        data-tip="Remove"
        className="hover:text-indigo-400 transition duration-300 ease-in-out">
        <RemoveIcon />
      </Button>

      <VoteButtons
        onVote={handleVote}
        className="justify-center"
        voteScore={post.voteScore} />

      <Tooltip />
    </div>
  )
}

export default ActionsButtons
