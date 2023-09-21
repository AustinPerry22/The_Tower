import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { api } from "./AxiosService"
import {logger} from "../utils/Logger"
class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        AppState.events = res.data.map(event => new Event(event))
        AppState.filteredEvents = AppState.events
    }

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        const newEvent = new Event(res.data)
        AppState.events.push(newEvent)
        return newEvent
        
    }
}

export const eventsService = new EventsService()