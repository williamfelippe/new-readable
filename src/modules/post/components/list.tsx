import PostItem from './item'
import Post from '../types/post'
import Vote from 'modules/vote/types/vote'

interface Props {
  posts: Record<string, Post>,
  postsIds: string[],
  onRemove: (postId: string) => void,
  onVote: (postId: string, vote: Vote) => void
}

const PostList = ({ posts, postsIds, onRemove, onVote }: Props) => {
  return (
    <div className={`grid gap-4 grid-cols-1
      md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
      {
        postsIds.map(postId => (
          <div key={postId}>
            <PostItem
              post={posts[postId]}
              onVote={onVote}
              onRemove={onRemove} />
          </div>
        ))
      }
    </div>
  )
}

export default PostList
