import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{

    async getComments(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        AppState.comments = res.data.map(comment => new Comment(comment))
    }

    async createComment(body){
        const res = await api.post('api/comments', body)
        const newComment = new Comment(res.data)
        AppState.comments.unshift(newComment)
    }

    async deleteComment(commentId){
        await api.delete(`api/comments/${commentId}`)
        const commentIndex = AppState.comments.findIndex(comment=> comment.id == commentId)
        AppState.comments.splice(commentIndex, 1)
    }

}

export const commentsService = new CommentsService()