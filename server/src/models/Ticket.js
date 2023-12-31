import { Schema } from "mongoose";

export const TicketsSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, required: true, ref: "Event" },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" }
}, { timestamps: true, toJSON: { virtuals: true } })

TicketsSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: "Account",
    justOne: true
})

TicketsSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true,
})