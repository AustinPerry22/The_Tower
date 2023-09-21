import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
    async createTicket(body){
        const res = await api.post('api/tickets', body)
        logger.log(res.data)
        const newTicket = new Ticket(res.data)
        logger.log(newTicket)
        AppState.tickets.unshift(newTicket)
        logger.log(AppState.tickets)
    }
}

export const ticketsService = new TicketsService()