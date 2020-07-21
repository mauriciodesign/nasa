<template>
    <v-container class="home my-10">
        <v-row justify="center">
            <div class="mx-10">
                <v-date-picker min="1995-06-20" :max="new Date().toISOString().substr(0, 10)" v-model="date" @input="getDate" elevation="15" class="rounded-lg" height="auto"></v-date-picker>
            </div>
            <v-col class="mx-10">
                <h1>{{apods.title}}</h1>
                <p>{{date}}</p>
                <v-card class="rounded-lg" elevation="15" >
                    <v-img v-if="apods.media_type === 'image'" :src="apods.url"></v-img>
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
        minDate: "2019-07-04",
        maxDate: "2020-07-12"
      }
    },
  components: {},
  computed: {
    ...mapState(['apods']),

  },
  methods: {
    ...mapActions(["getApod", 'setPiker']),
        getDate(date){
          this.setPiker(date)
        }
  },
  created() {
    this.getApod();
  }
};
</script>
