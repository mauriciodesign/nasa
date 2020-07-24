<template>
    <v-app-bar app color="primary" dark v-if="currentUser">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"/>
          <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"/>
        </div>

        <v-spacer></v-spacer>

        <div>
            <v-btn class="mx-2" text to="/apod">Apod</v-btn>
            <v-btn class="mx-2" text to="/rover">Rover</v-btn>
            <v-btn class="mx-2" target="_blank" text @click="logout">
                <span class="mr-2">Logout</span>
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </div>
    </v-app-bar>
</template>

<script>
import Firebase from 'firebase';
import { mapState, mapActions } from 'vuex'
  export default {
    name: 'NavBar',
    computed: {
        ...mapState(['currentUser'])
    },
    methods: {
        ...mapActions(['updateUser']),
      logout(){
        Firebase.auth().signOut().then(() =>{
          this.$router.push('/login')
          this.updateUser(null)
        })
      }
    },
  }
</script>

<style>
</style>
