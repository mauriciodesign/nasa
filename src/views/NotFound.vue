<template>
    <v-main class="notfound">
        <v-col class="notfound__bg" cols="12"></v-col>
        <v-btn class="notfound__logo d-flex align-center" text color="transparent" to="/apod">
            <v-img
              alt="Nasa Logo"
              width="30px"
              contain
              src="/img/NASA_logo.svg"
              transition="scale-transition"/>
        </v-btn>
        <v-col class="notfound__content" cols="12">
            <h3>Sorry page does not found</h3>
            <h1>404</h1>
            <h2>Opss! ... Houston, we have a problem</h2>
            <v-btn large to="/apod" class="my-8">
                <v-icon color="#717171">mdi-arrow-left </v-icon>
                <span class="mr-3">Go back home</span>
            </v-btn>
        </v-col>
    </v-main>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NotFound",
  methods: {
    ...mapActions(["updateUser"]),
  },
  created() {
    this.updateUser(false);
  },
};
</script>
