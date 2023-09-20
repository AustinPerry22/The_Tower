import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class EventsService {

    async getEvents() {
        const events = await dbContext.Events.find().populate('creator ticketCount')
        return events
    }
    async getEventsById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator ticketCount')
        return event
    }
    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        await event.populate('creator ticketCount')
        return event
    }

    async editEvent(eventId, eventBody) {
        const foundEvent = await this.getEventsById(eventId)
        if (!foundEvent) throw new BadRequest(`There is no event with an id of ${eventId}`)
        foundEvent.name = eventBody.name || foundEvent.name
        foundEvent.description = eventBody.description || foundEvent.description
        foundEvent.coverImg = eventBody.coverImg || foundEvent.coverImg
        foundEvent.location = eventBody.location || foundEvent.location
        foundEvent.capacity = eventBody.capacity || foundEvent.capacity
        foundEvent.startDate = eventBody.startDate || foundEvent.startDate
        foundEvent.type = eventBody.type || foundEvent.type
        foundEvent.ticketCount = eventBody.ticketCount || foundEvent.ticketCount

        await foundEvent.save()
        return foundEvent
    }

}

export const eventsService = new EventsService()