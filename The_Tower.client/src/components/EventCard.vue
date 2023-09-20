<template>
    <section class="row justify-content-center">
        <div class="col-11 p-0 event-cover d-flex align-items-end">
           <div class="info px-3">
            <h5>{{ event.name }}</h5>
            <h6>{{ event.location }}</h6>
            <section class="row"></section>
            <h6>{{ event.startDate }}</h6>
            <section class="row justify-content-end">
                <h6 class="text-end">{{ event.ticketCount }} spots left</h6>
            </section>
           </div>
        </div>
    </section>
</template>

<script>
import { computed } from 'vue';
import { Event } from '../models/Event';

export default {
props: {event: {type: Event, required: true}},
setup(props) {
  return {
    eventImg: computed(()=> `url('${props.event.coverImg}')`),
  };
},
};
</script>


<style lang="scss" scoped>
.event-cover{
    
    height: 32.5vh;
    background-image: v-bind(eventImg);
    background-position: center;
    background-size: cover;
    border-radius: .5em;
    border-style: solid;
    border-color: gray;
    border-width: .35em;
}

.info{
    background-color: rgba(0, 0, 0, 0.164);
    backdrop-filter: blur(.25rem);
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    width: 100%;
}
</style>