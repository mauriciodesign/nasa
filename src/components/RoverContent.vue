<template>
    <v-main>
        <v-container>
            <v-row>
                <v-col
                    v-for="rover in rovers" :key="rover.id"
                    class="px-8 py-8"
                    cols="12"
                    md="4"
                    sm="6">
                    <v-card class="card mx-auto">
                        <v-img
                          class="white--text align-end"
                          :src="rover.img_src"
                          :lazy-src="rover.img_src">
                        </v-img>

                        <v-card-title class="px-7">
                            <h3>{{rover.rover.name}} | Cámara: {{rover.camera.full_name}} | {{rover.camera.name}}</h3>
                        </v-card-title>
                        <v-card-text class="text--primary px-7">
                            <div>Día en la Tierra: {{rover.earth_date}}  |  Dias Sol {{rover.sol}}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
           </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['rovers'])
  },
}
</script>

<style lang="scss">
.card {
  transition: all 0.2s ease-out !important;
  box-shadow: 0 2px 43px -4px rgba(0, 0, 0, 0.19) !important;
  border-radius: 20px !important;
}
.card:hover {
  transform: translateY(2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05) !important;
}
</style>