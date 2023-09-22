<!-- <template>
    <section class="row">
        <Login/>
        <router-link :to="{name: 'Home'}">
            <h1>Tower</h1>
        </router-link>
        
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
</script> -->
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <h2>
          Tower <i class="mdi mdi-eiffel-tower"></i>
        </h2>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse p-2 rounded " id="navbarText">
        <ul class="navbar-nav me-auto">
            <ModalWrapper v-if="user.isAuthenticated" id="create-Event">
            <template #button>
                <div>New Event</div>
            </template>
            <template #header>
                <h3 class="text-dark">creating Event</h3>
            </template>
            <template #body>
                <EventForm :editing="false"/>
            </template>
        </ModalWrapper>
        </ul>
        <Login />
      </div>
    </nav>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { AppState } from '../AppState.js';
  import Login from './Login.vue';
  import ModalWrapper from './ModalWrapper.vue';
  export default {
    setup() {
      return {
        user: computed(()=> AppState.user)
      }
    },
    components: { Login, ModalWrapper }
  }
  </script>
  
  <style scoped>
  
  a:hover {
    text-decoration: none;
  }
  
  .nav-link {
    text-transform: uppercase;
  }
  
  .navbar-nav .router-link-exact-active {
    border-bottom: 2px solid var(--bs-success);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  
  @media screen and (min-width: 768px) {
    nav {
      height: 64px;
    }
  }
  </style>
