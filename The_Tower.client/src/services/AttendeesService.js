import { AppState } from "../AppState"
import { Attendee } from "../models/Attendee"
import { api } from "./AxiosService"


class AttendeesService{
    async getAttendees(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.attendees = res.data.map(attendee => new Attendee(attendee))
    }

    async getMyTickets(){
        const res = await api.get(`account/tickets`)
        AppState.myAttendees = res.data.map(attendee => new Attendee(attendee))
    }

    async createAttendee(body){
        const res = await api.post('api/tickets', body)
        const newAttendee = new Attendee(res.data)
        AppState.attendees.unshift(newAttendee)
    }
}

export const attendeesService = new AttendeesService()