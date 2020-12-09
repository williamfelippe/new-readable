import api from 'common/utils/api'
import Comment from '../types/comment'
import Vote from 'modules/vote/types/vote'
import { NewComment } from './../types/comment'

class CommentService {
  static async getComments(postId: string) {
    const response = await api.get<Comment[]>(`/posts/${postId}/comments`)
    return response.data.filter(item => !item.deleted)
  }

  static async getComment(commentId: string) {
    const response = await api.get<Comment>(`/comments/${commentId}`)
    return response.data
  }

  static async postComment(comment: NewComment) {
    const response = await api.post<NewComment>(`/comments`, comment)
    return response.data
  }

  static async putComment(commentId: string, comment: Comment) {
    const response = await api.put<Comment>(`/comments/${commentId}`, comment)
    return response.data
  }

  static async deleteComment(commentId: string) {
    const response = await api.delete<Comment>(`/comments/${commentId}`)
    return response.data
  }

  static async voteComment(commentId: string, option: Vote) {
    const response = await api.post<Comment>(`/comments/${commentId}`, { option })
    return response.data
  }
}

export default CommentService
