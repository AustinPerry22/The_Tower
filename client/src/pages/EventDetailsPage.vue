<template>
    <section class="row">
      <div class="col-12 col-md-4">
        <img :src="activeEvent.coverImg" :alt="activeEvent.name" class="img-fluid">
      </div>
      <div class="col-12 col-md-8">
        <section v-if="(activeEvent.creatorId == accountId) && !activeEvent.isCanceled" class="row justify-content-end">
          <ModalWrapper id="edit-Event">
            <template #button>
              <div>Edit Event</div>
            </template>
            <template #header>
                <h3 class="text-dark">Editing Event</h3>
            </template>
            <template #body>
                <EventForm :editing="true" :activeEvent="activeEvent"/>
            </template>
        </ModalWrapper>
          
          <button @click="cancelEvent" class="btn btn-danger col-3">Cancel Event</button>
        </section>
        <h4>{{ activeEvent.name }}</h4>
        <h6>Location: {{ activeEvent.location }}</h6>
        <p>{{ activeEvent.description }}</p>
        <section class="row justify-content-between">
          <div v-if="!activeEvent.isCanceled" class="col-6">
            <h5 v-if="spotsLeft > 0" class="text-primary">{{ spotsLeft }} spots left</h5>
            <h5 v-else class="text-danger">no spots left</h5>
          </div>
          <div v-else class="col-6">
            <h5 class="text-danger">event is canceled!</h5>
          </div>
          <div v-if="canAttend" class="col-6 text-end">
              <button @click="createTicket" class="btn btn-info">
                Attend
              </button>
            </div>
        </section>
      </div>
    </section>
    <h5 class="mt-3 text-center">Attendee's</h5>
    <section class="row bg-dark-subtle">
      <div v-for="ticket in tickets" :key="ticket.id" class="col-6 col-md-3 d-flex">
        <img :src="ticket.profile.picture" :alt="ticket.profile.name" :title="ticket.profile.name" class="profile-pic">
        <p class="text-dark">{{ ticket.profile.name }}</p>
      </div>
    </section>
    <section class="row justify-content-center">
      <CommentForm v-if="user.isAuthenticated && activeEvent.id" :eventId="activeEvent.id" class="my-4"/>
      <div v-for="comment in comments" :key="comment.id" class="col-10 my-2">
        <CommentCard :comment="comment"/>
      </div>
    </section>
</template>

<script>
import {computed, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import CommentForm from '../components/CommentForm.vue';
import CommentCard from '../components/CommentCard.vue'
import { commentsService } from '../services/CommentsService';
import { ticketsService } from '../services/TicketsService';

export default {
    setup() {
        const route = useRoute();
        watchEffect(() => {
            route.params.eventId;
            getEvent();
            getTickets();
            getComments();
        });
        async function getEvent() {
            try {
                AppState.activeEvent = {};
                await eventsService.getEvent(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getTickets() {
            try {
                AppState.tickets = [];
                await ticketsService.getTickets(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }

        async function getComments(){
          try {
            AppState.comments = [];
            await commentsService.getComments(route.params.eventId)
          } catch (error) {
            Pop.error(error)
          }
        }

        function isExpired(date){
            const today = new Date()
            const eventDate = new Date(date)
            return eventDate < today
          }

        return {
            activeEvent: computed(() => AppState.activeEvent),
            accountId: computed(() => AppState.account.id),
            spotsLeft: computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount),
            user: computed(() => AppState.user),
            canAttend: computed(() => {
                if (!AppState.user.isAuthenticated) return false;
                if (AppState.activeEvent.isCanceled) return false;
                if ((AppState.activeEvent.capacity - AppState.activeEvent.ticketCount) <= 0) return false;
                if(!AppState.account.id) return false;
                let notExpired = isExpired(AppState.activeEvent.startDate)
                if(notExpired) return false;
                let noTicket = true;
                AppState.tickets.forEach(ticket=>{
                  if(ticket.eventId == AppState.activeEvent.id) {
                    if(ticket.accountId == AppState.account.id){
                    noTicket = false;
                  }}
                })
                return noTicket;
            }),

            

            tickets: computed(() => AppState.tickets),
            comments: computed(()=> AppState.comments),
            async cancelEvent() {
                try {
                    if (await Pop.confirm('are you sure you want to cancel the event?')) {
                        await eventsService.cancelEvent(this.activeEvent.id);
                        Pop.success('canceled the event');
                    }
                }
                catch (error) {
                    Pop.error(error);
                }
            },

            async createTicket(){
              try {
                await ticketsService.createTicket({eventId: this.activeEvent.id})
              } catch (error) {
                Pop.error(error)
              }
            }
        };
    },
    components: { CommentForm, CommentCard }
};
</script>


<style lang="scss" scoped>
.profile-pic{
  height: 7.5vh;
  border-radius: 5rem;
}
p{
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>