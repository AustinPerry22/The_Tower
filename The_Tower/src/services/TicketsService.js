import { dbContext } from "../db/DbContext.js"

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

    async deleteTicket(ticketId) {
        const ticketToDelete = await dbContext.Tickets.findById(ticketId)
        await ticketToDelete.delete()
        return 'deleted'
    }

}

export const ticketsService = new TicketsService()