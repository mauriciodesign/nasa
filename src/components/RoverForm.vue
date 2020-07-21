<template>
    <v-container class="my-5">
        <v-row justify="center">
            <v-col cols="12" sm="6" md="2">
                <v-select @input="select" :items="rover" v-model="valorSelect" label="Name Rover" :rules="nameRules"></v-select>
            </v-col>

            <v-col cols="12" sm="6" md="2">
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y>
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="dateSol"
                            :rules="nameRules"
                            label="Select a date"
                            readonly
                            required
                            v-on="on">
                        </v-text-field>
                    </template>

                    <v-date-picker v-if="search.selectRover === 'curiosity'" min="2012-08-06" :max="new Date().toISOString().substr(0,10)" v-model="dateSol" @input="dateRover" ref="picker" @change="save"></v-date-picker>

                    <v-date-picker v-else-if="search.selectRover === 'opportunity'" min="2004-01-26" max="2018-06-11" v-model="dateSol" @input="dateRover" ref="picker" @change="save"></v-date-picker>

                    <v-date-picker v-else-if="search.selectRover === 'spirit'" min="2004-01-05" max="2010-03-21"  v-model="dateSol" @input="dateRover" ref="picker" @change="save"></v-date-picker>

                </v-menu>
            </v-col>
            <div class="pt-4 ml-5">
              <v-btn color="success" large dark @click="dateResult"><v-icon>mdi-magnify</v-icon>Search</v-btn>
            </div>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
  export default {
    data: () => ({
      dateSol: '',
      valorSelect: null,
      menu: false,
      rover: [
        'curiosity',
        'opportunity',
        'spirit',
      ],
      nameRules: [
        v => !!v || 'Option is required',
      ],
    }),

    computed: {
    ...mapState(['search']),
    },

    methods: {
      ...mapActions(['getRover', 'sendSol', 'sendSelect']),
      dateResult(){
        this.getRover()
      },
      dateRover(sol){
        this.sendSol(sol)
        console.log(sol)
      },
      select(select){
        this.sendSelect(select)
        console.log(select)
      },
      save (date) {
        this.$refs.menu.save(date)
      }
    },
    watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    }
  }
</script>



