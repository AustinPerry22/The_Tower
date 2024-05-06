<template>
  <section class="row justify-content-center">
    <div class="col-11">
      <section class="row justify-content-center">
        <div class="col-12 justify-content-center text-center d-flex flex-column text-light" id="top-card">
          <h3>Welcome To The Tower!</h3>
          <h3>Find events to join.</h3>
          <h3>Or create your own events.</h3>
        </div>
      </section>
      <section class="row text-center rounded bg-black py-2 mt-4 justify-content-evenly">
        <button :disabled="eventType==''" @click="eventType=''" class="btn btn-dark col-6 col-md-2">All</button>
        <button :disabled="eventType=='convention'" @click="eventType='convention'" class="btn btn-dark col-6 col-md-2">Conventions</button>
        <button :disabled="eventType=='sport'" @click="eventType='sport'" class="btn btn-dark col-6 col-md-2">Sports</button>
        <button :disabled="eventType=='digital'" @click="eventType='digital'" class="btn btn-dark col-6 col-md-2">Digital</button>
        <button :disabled="eventType=='concert'" @click="eventType='concert'" class="btn btn-dark col-6 col-md-2">Concerts</button>
      </section>
      <section class="row justify-content-evenly">
        <div v-for="event in events" :key="event.id" class="col-6 col-md-3 g-4  event-card">
          <EventCard :event="event"/>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import {eventsService} from '../services/EventsService';
import EventCard from '../components/EventCard.vue'
import Pop from '../utils/Pop';

export default {
  setup() {
    const eventType = ref('')
    onMounted(()=>getEvents())
    async function getEvents(){
      try {
        await eventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      eventType,
      events: computed(()=>{
        if(!eventType.value){
          return AppState.events
        }else{
          return AppState.events.filter(event => event.type == eventType.value)
        }
      })
    }
  },
  components:{ EventCard}
}
</script>

<style scoped lang="scss">

h3{
  filter: drop-shadow(.25rem .25rem .1rem black);
}

button:disabled{
  background-color: #087e39;
}

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
  border: .5rem rgb(32, 6, 75) solid .15em;
}


</style>
