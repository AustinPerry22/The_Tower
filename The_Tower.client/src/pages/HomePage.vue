<template>
  <section class="row justify-content-center">
    <div class="col-11 justify-content-center" id="top-card">
      <h3>Lorem ipsum dolor sit amet.</h3>
      <h3>Lorem ipsum dolor sit amet, consectetur adipisicing.</h3>
      <h3>Lorem ipsum dolor sit.</h3>
    </div>
  </section>
  <section class="row">
    navbar component
  </section>
  <section class="row justify-content-evenly">
    <div v-for="event in events" :key="event.id" class="col-3 event-card">
      event
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import {eventsService} from '../services/EventsService'
import Pop from '../utils/Pop';

export default {
  setup() {
    onMounted(()=>getEvents())
    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      events: computed(()=>AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
#top-card{
  background-image: url(https://images.unsplash.com/photo-1532621623813-d37d9cd1d992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNlYXRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60);
  background-position: center;
  background-size: cover;
  border-radius: .5rem;
  border-color: paleturquoise;
  border-style: solid;
  border-width: .15em;
  color: peru;
  height: 25vh;
}

.event-card{
  border: .5rem black solid .15em;
}

</style>
