import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { api } from "./AxiosService"

class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        AppState.events = res.data.map(event => new Event(event))
        AppState.filteredEvents = AppState.events
    }
}

export const eventsService = new EventsService()