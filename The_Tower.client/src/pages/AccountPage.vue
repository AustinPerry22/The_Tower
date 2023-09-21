<template>
  <section class="row justify-content-evenly">
      <div v-for="event in events" :key="event.id" class="col-3 g-4">
        <EventCard :event="event"/>
      </div>
    </section>
    <section class="row justify-content-center">
      <div v-for="ticket in tickets" :key="ticket.id" class="col-10 g-4">
        <TicketCard :ticket="ticket"/>
      </div>
    </section>
  
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { ticketsService } from '../services/TicketsService';
import TicketCard from '../components/TicketCard.vue';
export default {
    setup() {
        watchEffect(() => {
            AppState.account;
            getMyEvents();
            getMyTickets();
        });
        async function getMyEvents() {
            try {
                await eventsService.getMyEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getMyTickets() {
            try {
                await ticketsService.getMyTickets();
            }
            catch (error) {
                Pop.error(error);
            }
        }
        return {
            account: computed(() => AppState.account),
            events: computed(() => AppState.myEvents),
            tickets: computed(() => AppState.myTickets)
        };
    },
    components: { TicketCard }
}
</script>

<style scoped>
</style>
