<template>
    <v-container class="py-3 rover">
        <div v-if="cameras" class="rover__camera">
            <h2>Types of cameras</h2>
            <v-row class="mt-5 justify-center">
                <div class="px-5 my-2" v-for="(count, camera) in camerasCount" :key="camera">
                    <h3>{{ camera }} : {{ count }}</h3>
                </div>
            </v-row>
            <h3 class="rover__camera-photos"><v-icon class="pr-2">mdi-camera</v-icon> Total Photos: {{rovers.length}}</h3>
            <p v-if="lastPhotoRover">Latest photos sent from the curosity</p>
        </div>
        <div class="rover__alert" v-if="emptyPhotoAlert">
            <v-alert prominent type="error" elevation="15" class="rover__alert-empty">
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
                <v-card class="rover__card mx-auto" dark>
                    <v-img
                      :src="rover.img_src">
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height"
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
                        <h2 class="rover__card-camera"><v-icon class="pr-3">mdi-camera</v-icon> {{rover.camera.full_name}} | {{rover.camera.name}}</h2>
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
    ...mapState('rover',["rovers", "lastPhotoRover", "emptyPhotoAlert"]),
    ...mapGetters('rover',["cameras"]),

    camerasCount() {
      let summary = {};
      this.cameras.map((camera) => {
        summary[camera] = (summary[camera] || 0) + 1;
      });
      return summary;
    },
  },
  methods: {
    ...mapActions('rover',["getRoverlatest"]),
  },
  created() {
    this.getRoverlatest();
  },
};
</script>
