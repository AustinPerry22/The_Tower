import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsService {

    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator')
        return comments
    }
    async createComment(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        return comment
    }

    async deleteComment(commentId, accountId) {
        const commentToDelete = await dbContext.Comments.findById(commentId)
        if (commentToDelete.creatorId != accountId) throw new Forbidden('This is not your comment')
        await commentToDelete.delete()
        return 'deleted the comment'
    }

}
export const commentsService = new CommentsService()