import { dbContext } from "../db/DbContext.js"

class EventsService {
    async getEvents() {
        const events = await dbContext.Events.find().populate('creator ticketCount')
        return events
    }
    async getEventsById(eventId) {
        const event = (await dbContext.Events.findById(eventId)).populate('creator ticketCount')
        return event
    }
    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator ticketCount')
        return event
    }

}

export const eventsService = new EventsService()