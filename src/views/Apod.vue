<template>
    <v-container class="home my-10">
        <v-row justify="center">
          <v-col cols="11" md="4" lg="3">
            <div class="px-xl-15">
                <v-date-picker min="1995-06-20" v-model="date" @input="getDate" elevation="15" class="rounded-lg picker" height="auto" width="100%"></v-date-picker>
            </div>
            </v-col>
            <v-col class="mx-0" cols="11" md="8" lg="9">
                <h1>{{apods.title}}</h1>
                <p>{{date}}</p>
                <v-card class="rounded-lg" elevation="15" >
                    <v-img v-if="apods.media_type === 'image'" :src="apods.hdurl" width="100%"></v-img>
                    <iframe v-else width="100%" height="500" :src="apods.url"></iframe>
                    <v-card-text class="px-10 py-10">
                        <div div>{{apods.explanation}}</div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text v-if="apods.copyright" class="px-5 py-5 text-right">
                        Copyright © {{apods.copyright}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src

import { mapState, mapActions } from "vuex";
export default {
  name: "Apod",
      data () {
      return {
        date: new Date().toISOString().substr(0, 10),
      }
    },
  computed: {
    ...mapState(['apods']),

  },
  methods: {
    ...mapActions(["getApod"]),
        getDate(date){
          this.getApod(date)
        }
  },
  created() {
    this.getApod();
  }
};
</script>

<style lang="scss">
  .picker{
    width: 100%;
  }
</style>