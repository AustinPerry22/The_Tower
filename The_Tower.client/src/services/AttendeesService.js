import { AppState } from "../AppState"
import { Attendee } from "../models/Attendee"
import { api } from "./AxiosService"

class AttendeesService{
    async getAttendees(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.attendees = res.data.map(attendee => new Attendee(attendee))
    }
}

export const attendeesService = new AttendeesService()