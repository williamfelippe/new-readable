interface Post {
  id: string,
  timestamp: number,
  title: string,
  body: string,
  author: string,
  category: string,
  voteScore: number,
  deleted: boolean,
  commentCount: number
}

export default Post
