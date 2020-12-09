import { NavLink } from 'react-router-dom'

import Badge from './badge'
import Post from '../types/post'
import ActionsButtons from './actionsButtons'
import Formatter from 'common/utils/formatter'
import Vote from 'modules/vote/types/vote'
import RoutesPaths from 'common/routes/routesPaths'
import { Card } from 'common/components'

interface Props {
  post: Post,
  onRemove: (postId: string) => void,
  onVote: (postId: string, vote: Vote) => void
}

const PostItem = ({ post, onRemove, onVote }: Props) => {
  return (
    <Card
      dataTestId="post"
      className={`hover:shadow-md hover:-translate-y-1.5
      transition duration-300 ease-in-out`}>
      <>
        <NavLink
          exact
          className="flex flex-col"
          to={RoutesPaths.POST_DETAIL.replace(':postId', post.id)}>
          <Badge category={post.category} />

          <p className="text-xl font-bold mb-5 truncate">
            {post.title}
          </p>

          <p className="text-lg mb-5 truncate">
            {post.body}
          </p>

          <p className="text-xs mb-5 text-indigo-500">
            by {post.author} - <span className="italic">
              {Formatter.getHumanizedDate(post.timestamp)}
            </span>
          </p>
        </NavLink>

        <ActionsButtons
          post={post}
          onRemove={onRemove}
          onVote={onVote} />
      </>
    </Card>
  )
}

export default PostItem
