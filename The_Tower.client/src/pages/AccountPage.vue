<template>
  <section class="row justify-content-evenly">
      <div v-for="event in events" :key="event.id" class="col-3 g-4  event-card">
        <EventCard :event="event"/>
      </div>
    </section>
  <div v-for="ticket in tickets" :key="ticket.id">
    {{ ticket.id }} 🎫
  </div>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { attendeesService } from '../services/AttendeesService';
export default {
  setup() {
    watchEffect(()=>{
    AppState.account
    getMyEvents();
    getMyTickets();
  })

    async function getMyEvents(){
        try {
          await eventsService.getMyEvents()

        } catch (error) {
          Pop.error(error)
        }
      }

      async function getMyTickets(){
        try {
          await attendeesService.getMyTickets()
        } catch (error) {
          Pop.error(error)
        }
      }

    return {
      account: computed(() => AppState.account),
      events: computed(()=> AppState.myEvents),
      tickets: computed(()=> AppState.myAttendees)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
