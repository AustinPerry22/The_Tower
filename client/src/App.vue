<template>
  <main class="container-fluid bg-dark">
    <section class="row">
      <Navigation/>
      <div class="col-12">
        <router-view />
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navigation from './components/Navigation.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components:{ Navigation}
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}

.background-color{
  background-color: #2A2D3A;
}
footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
