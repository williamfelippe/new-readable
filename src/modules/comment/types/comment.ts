interface Comment {
  id: string,
  parentId: string,
  timestamp: number,
  body: string,
  author: string,
  voteScore: number,
  deleted: boolean,
  parentDeleted: boolean
}

export type NewComment = Omit<Comment, 'voteScore' | 'deleted' | 'parentDeleted'>

export default Comment
