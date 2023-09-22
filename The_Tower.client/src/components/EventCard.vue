<template>
    <section class="row justify-content-center">
        <div @click="openDetails" class="col-11 p-0 event-cover d-flex align-items-end selectable">
           <div class="info px-2">
            <h5>{{ event.name }}</h5>
            <h6>{{ event.location }}</h6>
            <section class="row"></section>
            <h6>{{ event.startDate }}</h6>
            <section v-if="event.isCanceled" class="row px-1">
                <div class="col-12 rounded-top-2 bg-danger text-end">
                    <h6>Event Cancelled</h6>
                </div>
            </section>
            <div v-else>
                <section v-if="event.capacity - event.ticketCount > 0" class="row justify-content-end">
                    <h6 class="text-end text-success">{{ event.capacity - event.ticketCount }} spots left</h6>
                </section>
                <section v-else class="row px-1">
                    <div class="col-12 rounded-top-2 bg-danger text-end">
                        <h6>Sold Out!</h6>
                    </div>
            </section>
            </div>
           </div>
        </div>
    </section>
</template>

<script>
import { computed } from 'vue';
import { Event } from '../models/Event';
import { router } from '../router';

export default {
props: {event: {type: Event, required: true}},
setup(props) {
  return {
    eventImg: computed(()=> `url('${props.event.coverImg}')`),

    openDetails(){
        router.push({ name: 'EventDetails', params: { eventId: props.event.id } })
    }
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
h5,
h6{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>