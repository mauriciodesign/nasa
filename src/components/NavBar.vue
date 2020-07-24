<template>
    <v-app-bar app dark v-if="currentUser">
        <v-btn class="d-flex align-center" text color="transparent" to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2 mt-5"
            contain
            src="/img/NASA_logo.svg"
            transition="scale-transition"
            width="140"/>
        </v-btn>

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
