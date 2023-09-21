import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

    async getTickets(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data.map(ticket => new Ticket(ticket))
    }

    async getMyTickets(){
        const res = await api.get(`account/tickets`)
        AppState.myTickets = res.data.map(ticket => new Ticket(ticket))
    }

    async createTicket(body){
        const res = await api.post('api/tickets', body)
        const newTicket = new Ticket(res.data)
        AppState.tickets.unshift(newTicket)
    }

    async deleteTicket(ticketId){
        await api.delete(`api/tickets/${ticketId}`)
        const ticketToRemove = AppState.myTickets.findIndex(ticket=> ticket.id == ticketId)
        AppState.myTickets.splice(ticketToRemove, 1)
    }
}

export const ticketsService = new TicketsService()