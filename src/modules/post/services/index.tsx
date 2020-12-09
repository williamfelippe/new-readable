import api from 'common/utils/api'
import Post from '../types/post'
import NewPost from '../types/newPost'
import Vote from 'modules/vote/types/vote'

class PostService {
  static async getPosts() {
    const response = await api.get<Post[]>('/posts')
    return response.data.filter(item => !item.deleted)
  }

  static async getPostsByCategory(categoryName: string) {
    const response = await api.get<Post[]>(`/${categoryName}/posts`)
    return response.data.filter(item => !item.deleted)
  }

  static async createPost(post: NewPost) {
    const response = await api.post<Post>('/posts', post)
    return response.data
  }

  static async getPost(postId: string) {
    const response = await api.get<Post>(`/posts/${postId}`)
    return response.data
  }

  static async updatePost(postId: string, post: NewPost) {
    const response = await api.put<Post>(`/posts/${postId}`, post)
    return response.data
  }

  static async deletePost(postId: string) {
    const response = await api.delete<Post>(`/posts/${postId}`)
    return response.data
  }

  static async votePost(postId: string, option: Vote) {
    const response = await api.post<Post>(`/posts/${postId}`, { option })
    return response.data
  }
}

export default PostService
