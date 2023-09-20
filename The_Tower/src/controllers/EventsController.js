import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/comments', this.getCommentsInEvent)
            .get('/:eventId/attendees', this.getAttendees)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .delete('/eventId', this.cancelEvent)
    }
}