<template>
    <v-container class="py-3">
        <div v-if="cameras" class="camera">
          <h2>Types of cameras</h2>
          <v-row class="mt-5 justify-center">
            <div class="px-5 my-2" v-for="(count, camera) in camerasCount" :key="camera">
               <h3>{{ camera }} : {{ count }}</h3>
            </div>
          </v-row>
          <h3 class="camera__photos"><v-icon class="pr-2">mdi-camera</v-icon> Total Photos: {{rovers.length}}</h3>
          <p v-if="lastPhotoRover">Latest photos sent from the curosity</p>
        </div>
        <div class="alert" v-if="emptyPhotoAlert">
            <v-alert prominent type="error" elevation="15" class="alert__emptyrover">
                <v-row align="center">
                  <v-col class="grow">On this day there are no photos, try another day.</v-col>
                </v-row>
            </v-alert>
        </div>
        <v-row>
            <v-col
                v-for="rover in rovers" :key="rover.id"
                class="px-8 py-8"
                cols="12"
                md="6">
                <v-card class="card mx-auto" dark>
                    <v-img
                      :src="rover.img_src">
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                    <v-card-title class="px-7">
                        <h2>{{rover.rover.name}}</h2>
                    </v-card-title>
                    <v-card-text class="px-7">
                        <h2 class="card__camera"><v-icon class="pr-3">mdi-camera</v-icon> {{rover.camera.full_name}} | {{rover.camera.name}}</h2>
                        <div class="py-2">Day on earth: {{rover.earth_date}}  |  Sol day {{rover.sol}}</div>
                    </v-card-text>
                </v-card>
            </v-col>
       </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "RoverContent",
  computed: {
    ...mapState(["rovers", "lastPhotoRover", "emptyPhotoAlert"]),
    ...mapGetters(["cameras"]),

    camerasCount() {
      let summary = {};
      this.cameras.map((camera) => {
        summary[camera] = (summary[camera] || 0) + 1;
      });
      return summary;
    },
  },
  methods: {
    ...mapActions(["getRoverlatest"]),
  },
  created() {
    this.getRoverlatest();
  },
};
</script>

<style lang="scss">
.card {
  animation-name: animar;
  animation-duration: 1s;
  transition: all 0.2s ease-out !important;
  box-shadow: 0 2px 43px -4px rgba(0, 0, 0, 0.5) !important;
  border-radius: 20px !important;
  &:hover {
    transform: translateY(2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  }
  &__camera {
    line-height: 1.5;
  }
}

.camera {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__photos {
    border: 1px solid #ccc;
    padding: 10px 20px;
    border-radius: 15px;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
}
.alert {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  &__emptyrover {
    border-radius: 0.6rem !important;
    padding-left: 20px;
    padding-right: 20px;
    animation-name: animar;
    animation-duration: 1s;
  }
}
@keyframes animar {
  0% {
    opacity: 0;
    margin-top: -10px;
  }
  100% {
    opacity: 1;
    margin-top: 0px;
  }
}
</style>
