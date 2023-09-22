export class Ticket{
    constructor(data){
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.profile = data.profile
        this.event = data.event
        this.startDate = new Date(data.event.startDate).toLocaleDateString()
    }
}