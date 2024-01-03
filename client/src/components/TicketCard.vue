<template>
    <section class="row">
        <div class="col-4 ticket-cover">
        </div>
        <div class="col-8 ticket-content">
            <h4>{{ ticket.event.name }}</h4>
            <h5>{{ ticket.event.location }}</h5>
            <h5>{{ ticket.startDate }}</h5>
            <button @click="deleteTicket" class="btn btn-danger">unattend</button>
        </div>
    </section>
</template>

<script>
import { computed } from 'vue';
import { Ticket } from '../models/Ticket';
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';

export default {
    props:{ticket:{type: Ticket}},
setup(props) {
  return {
    eventImg: computed(()=> `url('${props.ticket.event.coverImg}')`),
    async deleteTicket(){
        try {
            await ticketsService.deleteTicket(props.ticket.id)
        } catch (error) {
            Pop.error(error)
        }
    }
  };
},
};
</script>


<style lang="scss" scoped>
.ticket-cover{
height: 25vh;
background-image: v-bind(eventImg);
background-position: center;
background-size: cover;
border-color: rgb(156, 134, 5);
border-style: solid;
border-radius: 1rem;
}

.ticket-content{
    border-color: rgb(156, 134, 5);
    background-color: rgb(11, 14, 0);
border-style: solid;
border-radius: 1rem;
}
</style>