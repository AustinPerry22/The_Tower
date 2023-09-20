import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentsSchema } from '../models/Comment.js';
import { EventsSchema } from '../models/Event.js';
import { TicketsSchema } from '../models/Ticket.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Events = mongoose.model('Event', EventsSchema);

  Tickets = mongoose.model('Ticket', TicketsSchema);

  Comments = mongoose.model('Comment', CommentsSchema);


}

export const dbContext = new DbContext()
