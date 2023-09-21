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
              <button class="btn btn-info">
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
    <section v-if="user.isAuthenticated" class="row justify-content-center">
      <!-- TODO add comment form and comments underneath here -->
      <CommentForm :eventId="activeEvent.id"/>
    </section>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import {attendeesService} from '../services/AttendeesService'
import CommentForm from '../components/CommentForm.vue';

export default {
    setup() {
        const route = useRoute();
        watchEffect(() => {
            route.params.eventId;
            getEvent();
            getAttendees();
            // get comments
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
        return {
            activeEvent: computed(() => AppState.activeEvent),
            accountId: computed(() => AppState.account.id),
            spotsLeft: computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount),
            user: computed(() => AppState.user),
            canAttend: computed(() => {
                if (!AppState.user.isAuthenticated)
                    return false;
                if (AppState.activeEvent.isCanceled)
                    return false;
                if ((AppState.activeEvent.capacity - AppState.activeEvent.ticketCount) <= 0)
                    return false;
                // TODO return false if i have a ticket with this eventId
                return true;
            }),
            attendees: computed(() => AppState.attendees),
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
            }
        };
    },
    components: { CommentForm }
};
</script>


<style lang="scss" scoped>
.profile-pic{
  height: 7.5vh;
  border-radius: 5rem;
}
</style>