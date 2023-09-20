import { dbContext } from "../db/DbContext.js"

class TicketsService {
    async createTicket(ticketBody) {
        const ticket = await dbContext.Tickets.create(ticketBody)
        await ticket.populate('profile event')
        return ticket
    }

}

export const ticketsService = new TicketsService()