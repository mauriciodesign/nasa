<template>
  <div class="menu">
    <v-app-bar app dark v-if="currentUser">
      <v-btn class="d-flex align-center px-0" text color="transparent" to="/apod">
        <v-img
          alt="Nasa Logo"
          class="shrink mr-2 menu__logo"
          contain
          src="/img/NASA_logo.svg"
          transition="scale-transition"/>
      </v-btn>

      <v-spacer></v-spacer>

      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="displayMenu"></v-app-bar-nav-icon>
      </span>

      <div class="menu__down">
        <v-btn class="mx-1" text v-for="menu in menu" :key='menu.title' :to='menu.link'>
          <span class="mr-3">{{menu.title}}</span>
          <img :src='menu.icon' width="25">
        </v-btn>
        <v-btn class="mx-2" target="_blank" text @click="logout">
            <span class="mr-3">Logout</span>
            <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      dark
      width="100%"
      class="menu__responsive">
      <v-list nav class="mt-5">
        <v-list-item-group>
          <v-list-item v-for="list in menu" :key='list.title' :to='list.link'>
            <v-img :src='list.icon' width="30" class="mx-3"></v-img>
            <v-list-item-title text class="mx-4">{{list.title}}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-icon class="mx-4">mdi-logout</v-icon>
            <v-list-item-title class="mx-4">Logout</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Firebase from 'firebase';
import { mapState, mapActions } from 'vuex'
  export default {
    name: 'NavBar',
    data: () => ({
        menu: [
          {icon: '/img/apod.svg', title: 'Apod', link: '/apod'},
          {icon: '/img/rover.svg', title: 'Rover', link: '/rover'},
        ],
        drawer: false,
    }),
    computed: {
        ...mapState(['currentUser'])
    },
    methods: {
        ...mapActions(['updateUser']),
      displayMenu(){
        this.drawer = true
      },
      logout(){
        Firebase.auth().signOut().then(() =>{
          this.$router.push('/login')
          this.updateUser(null)
        })
      }
    },
  }
</script>
