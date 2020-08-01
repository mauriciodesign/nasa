<template>
<v-main>
    <v-container class="mb-10">
        <v-row class="justify-center">
          <v-col cols="11" md="4" lg="3">
            <div class="px-xl-15">
                <v-date-picker min="1995-06-20" :max="new Date().toISOString().substr(0, 10)" v-model="date" @input="getDate" dark elevation="15" class="rounded-lg picker" height="auto" width="100%"></v-date-picker>
            </div>
            </v-col>
            <v-col class="mx-0" cols="11" md="8" lg="9">
                <h1>{{apods.title}}</h1>
                <p>{{apods.date}}</p>
                <v-card class="rounded-lg" elevation="15" dark>
                    <v-img v-if="apods.media_type === 'image'"
                    :src="apods.hdurl"
                    :lazy-src="apods.url"
                    width="100%">
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                    <iframe v-if="apods.media_type === 'video'" width="100%" height="500" :src="apods.url"></iframe>
                    <v-card-text class="px-10 py-10">
                        <div>{{apods.explanation}}</div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text v-if="apods.copyright" class="px-5 py-5 text-right">
                        Copyright © {{apods.copyright}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
  </v-main>
</template>

<script>
// @ is an alias to /src

import { mapState, mapActions } from "vuex";
export default {
  name: "Apod",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    ...mapState(["apods"]),
  },
  methods: {
    ...mapActions(["getApod", "updateUser"]),
    getDate(date) {
      this.getApod(date);
    },
  },
  created() {
    this.getApod(this.date);
    this.updateUser(true);
  },
};
</script>

<style lang="scss">
.picker {
  width: 100%;
}
</style>
