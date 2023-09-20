import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TicketsService {

    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('profile event')
        return tickets
    }
    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('profile event')
        return tickets
    }
    async createTicket(ticketBody) {
        const ticket = await dbContext.Tickets.create(ticketBody)
        await ticket.populate('profile event')
        return ticket
    }

    async deleteTicket(ticketId, accountId) {
        const ticketToDelete = await dbContext.Tickets.findById(ticketId)
        if (ticketToDelete.accountId != accountId) throw new Forbidden('this is not your ticket')
        await ticketToDelete.delete()
        return 'deleted'
    }

}

export const ticketsService = new TicketsService()