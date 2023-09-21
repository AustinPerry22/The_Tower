<template>
    <section class="row">
      <div class="col-4">
        <img :src="activeEvent.coverImg" :alt="activeEvent.name" class="img-fluid">
      </div>
      <div class="col-8">
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
        <h6>{{ activeEvent.location }}</h6>
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
              <button @click="createAttendee" class="btn btn-info">
                Attend
              </button>
            </div>
        </section>
      </div>
    </section>
    <h5>See who's Attending</h5>
    <section class="row bg-dark-subtle">
      <div v-for="attendee in attendees" :key="attendee.id">
        <img :src="attendee.profile.picture" :alt="attendee.profile.name" :title="attendee.profile.name" class="profile-pic">
      </div>
    </section>
    <section class="row justify-content-center">
      <!-- TODO add comment form and comments underneath here -->
      <CommentForm v-if="user.isAuthenticated && activeEvent.id" :eventId="activeEvent.id"/>
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
import {attendeesService} from '../services/AttendeesService'
import CommentForm from '../components/CommentForm.vue';
import CommentCard from '../components/CommentCard.vue'
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';

export default {
    setup() {
        const route = useRoute();
        watchEffect(() => {
            route.params.eventId;
            getEvent();
            getAttendees();
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
        async function getAttendees() {
            try {
                AppState.attendees = [];
                await attendeesService.getAttendees(route.params.eventId);
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
        return {
            activeEvent: computed(() => AppState.activeEvent),
            accountId: computed(() => AppState.account.id),
            spotsLeft: computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount),
            user: computed(() => AppState.user),
            canAttend: computed(() => {
                if (!AppState.user.isAuthenticated) return false;
                if (AppState.activeEvent.isCanceled) return false;
                if ((AppState.activeEvent.capacity - AppState.activeEvent.ticketCount) <= 0) return false;
                let noTicket = true;
                AppState.attendees.forEach(attendee=>{
                  if(attendee.eventId == AppState.activeEvent.id) {
                    noTicket = false
                  }
                })
                return noTicket;
            }),

            attendees: computed(() => AppState.attendees),
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

            async createAttendee(){
              try {
                await attendeesService.createAttendee({eventId: this.activeEvent.id})
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
</style>