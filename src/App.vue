<template>
  <v-app>
    <v-content>
      <NavBar/>
      <transition name='fade'>
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: .3s;
}
.fade-enter-active {
  transition-delay: .3s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>