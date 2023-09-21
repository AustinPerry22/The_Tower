<template>
    {{ activeEvent }}
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';

export default {
setup() {
  const route = useRoute();
  onMounted(()=> getEvent())
  watchEffect(()=>{
    route.params.eventId
    getEvent()
  // get comments
})
async function getEvent(){
  try {
    AppState.activeEvent = {}
    await eventsService.getEvent(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}
  return {
    activeEvent: computed(()=> AppState.activeEvent)
    
  };
},
};
</script>


<style>
</style>