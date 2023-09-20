import { Schema } from "mongoose";

export const EventsSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
        name: { type: String, required: true, maxLength: 50 },
        description: { type: String, required: true, maxLength: 1000 },
        coverImg: { type: String, maxLength: 5000, default: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' },
        location: { type: String, maxLength: 100, default: 'online' },
        capacity: { type: Number, max: 999999999, default: 100 },
        startDate: { type: Date },
        isCanceled: { type: Boolean, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], default: 'convention' },
    }, { timestamps: true, toJSON: { virtuals: true } })

EventsSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

EventsSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})