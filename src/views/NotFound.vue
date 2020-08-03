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
  methods: {
    ...mapActions(["updateUser"]),
  },
  created() {
    this.updateUser(false);
  },
};
</script>

<style lang="scss">
.notfound {
  &__bg {
    background: url("/img/mars.jpg") bottom;
    background-size: cover;
    width: 100%;
    height: 100vh;
    position: fixed;
  }
  &__logo {
    height: auto !important;
    width: 200px;
    margin: 0 auto;
  }
  &__content {
    color: cornsilk;
    text-align: center;
    z-index: 1;
    position: relative;

    h1 {
      color: cornsilk;
      font-size: 8rem;
      margin-top: -70px;
    }
    h2 {
      color: cornsilk;
      font-size: 2rem;
      margin-top: -40px;
    }
    h3 {
      color: cornsilk;
      font-size: 1.5rem;
      margin: 10px 0 30px 0;
    }
  }
}
@media (min-width: 510px) {
  .notfound {
    &__logo {
      width: 250px;
    }
    &__content {
      h1 {
        font-size: 15rem;
      }
      h2 {
        font-size: 3rem;
      }
      h3 {
        font-size: 2rem;
        margin: 10px 0 30px 0;
      }
    }
  }
}
</style>
