<template>
  <div v-for="event in events" :key="event.id">
    {{ event.id }} 🎤
  </div>
  <div v-for="ticket in tickets" :key="ticket.id">
    {{ ticket.id }} 🎫
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { attendeesService } from '../services/AttendeesService';
export default {
  setup() {
    onMounted(()=> {
      getMyEvents();
      getMyTickets();
    });

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
