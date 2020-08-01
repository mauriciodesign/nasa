<template>
  <v-app>
    <v-content>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <NavBar/>
      <transition name='fade'>
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    NavBar,
  },
  computed: {
    ...mapState(["overlay"]),
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
