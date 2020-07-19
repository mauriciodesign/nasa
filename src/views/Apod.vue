<template>
    <v-container class="home my-10">
        <v-row justify="center">
            <div class="mx-10">
                <v-date-picker v-model="date" elevation="15" class="rounded-lg">
                    <v-btn block color="accent" dark @click="setDate(date)">Enviar</v-btn>
                </v-date-picker>
            </div>

            <v-col class="mx-10">
                <h1>{{apods.title}}</h1>
                <p>{{date}}</p>
                <v-card class="rounded-lg" elevation="15" >
                    <v-img :src="apods.url"></v-img>
                    <v-card-text>
                        <div div>{{apods.explanation}}</div>
                    </v-card-text>
                    <v-divider class="mx-4"></v-divider>
                    <v-card-text>Copyright © {{apods.copyright}}</v-card-text>
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
  components: {},
  computed: {
    ...mapState(['apods']),

  },
  methods: {
    ...mapActions(["getApod", 'setPiker']),
        setDate(date){
          this.setPiker(date)
        }
  },
  created() {
    this.getApod();
  }
};
</script>
