<template>
    <section class="row">
        <div class="col-4 img-fluid">
            <img :src="ticket.event.coverImg" :alt="ticket.event.name">
        </div>
        <div class="col-8">
            <h4>{{ ticket.event.name }}</h4>
            <h5>{{ ticket.event.location }}</h5>
            <h5>{{ ticket.event.startDate }}</h5>
            <button @click="deleteTicket" class="btn btn-danger">unattend</button>
        </div>
    </section>
</template>

<script>
import { Ticket } from '../models/Ticket';
import { ticketsService } from '../services/TicketsService';
import Pop from '../utils/Pop';

export default {
    props:{ticket:{type: Ticket}},
setup(props) {
  return {
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


<style>
</style>