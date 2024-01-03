import { Schema } from "mongoose";

export const CommentsSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    body: { type: String, required: true, maxLength: 1000 },
    isAttending: { type: Boolean, required: true, default: false }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentsSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
})