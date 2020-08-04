<template>
    <v-app>
        <v-main>
            <v-overlay :value="overlay">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
            <NavBar/>
            <transition name='fade'>
                <router-view/>
            </transition>
        </v-main>
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

<style src="@/assets/scss/main.scss" lang="scss"></style>
