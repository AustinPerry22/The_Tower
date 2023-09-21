<template>
  <main class="container-fluid bg-dark">
    <h1>Tower</h1>
    <section class="row">
      <div class="col-11">
        <router-view />
      </div>
      <div class="col-1 bg-primary-subtle">
        <Login/>
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Login from './components/Login.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Login }
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
