import { dbContext } from "../db/DbContext.js"

class EventsService {
    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator ticketCount')
        return event
    }

}

export const eventsService = new EventsService()