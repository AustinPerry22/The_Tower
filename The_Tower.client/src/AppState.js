import { reactive } from 'vue'
import { Event } from './models/Event.js'
import { Attendee } from './models/Attendee.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {Event[]} */
  events: [],

  /**@type {Event} */
  activeEvent: {},

  /**@type {Event[]} */
  myEvents: [],

  /**@type {Attendee[]} */
  attendees: [],

  /**@type {Attendee[]} */
  myAttendees: [],

  /**@type {Comment[]} */
  comments: [],

})
