import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { api } from "./AxiosService"
class EventsService{
    async getEvents(){
        const res = await api.get('api/events')
        AppState.events = res.data.map(event => new Event(event))
    }

    async getMyEvents(){
        const res = await api.get('api/events')
        const allEvents = res.data.map(event => new Event(event))
        AppState.myEvents = allEvents.filter(singleEvent => singleEvent.creatorId == AppState.account.id)
    }

    async getEvent(eventId){
        const res = await api.get(`api/events/${eventId}`)
        AppState.activeEvent = new Event(res.data)
    }

    async createEvent(eventData){
        const res = await api.post('api/events', eventData)
        const newEvent = new Event(res.data)
        AppState.events.push(newEvent)
        return newEvent
    }

    async editEvent(eventId, eventData){
        const res = await api.put(`api/events/${eventId}`, eventData)
        const editedEvent = new Event(res.data)
        const eventIndex = AppState.events.findIndex(event => event.id == editedEvent.id)
        AppState.events.splice(eventIndex, 1, editedEvent)
        AppState.activeEvent = editedEvent
    }

    async cancelEvent(eventId){
        const res = await api.delete(`api/events/${eventId}`)
        const canceledEvent = new Event(res.data)
        const eventIndex = AppState.events.findIndex(event => event.id == canceledEvent.id)
        AppState.events.splice(eventIndex, 1, canceledEvent)
        AppState.activeEvent = canceledEvent
    }
}

export const eventsService = new EventsService()