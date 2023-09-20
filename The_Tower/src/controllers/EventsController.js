import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            // .get('', this.getEvents)
            // .get('/:eventId', this.getEventById)
            // .get('/:eventId/comments', this.getCommentsInEvent)
            // .get('/:eventId/attendees', this.getAttendees)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
        // .delete('/eventId', this.cancelEvent)
    }

    async createEvent(req, res, next) {
        try {
            let eventBody = req.body
            eventBody.creatorId = req.userInfo.id
            const event = await eventsService.createEvent(eventBody)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }
}