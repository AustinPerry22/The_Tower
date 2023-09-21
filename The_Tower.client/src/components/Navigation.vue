<template>
    <section class="row">
        <Login/>
        <router-link :to="{name: 'Home'}">
            home
        </router-link>
        <ModalWrapper v-if="user.isAuthenticated" id="create-Event">
            <template #button>
                <div>New Event</div>
            </template>
            <template #header>
                <h3 class="text-dark">creating Event</h3>
            </template>
            <template #body>
                <EventForm/>
            </template>
        </ModalWrapper>
    </section>
</template>

<script>
import { computed } from 'vue';
import Login from './Login.vue';
import ModalWrapper from './ModalWrapper.vue';
import { AppState } from '../AppState';
import EventForm from './EventForm.vue';

export default {
    setup() {
        return {
            user: computed(()=> AppState.user)
        };
    },
    components: { Login, ModalWrapper, EventForm }
};
</script>


<style lang="scss" scoped>

</style>