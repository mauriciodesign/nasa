<template>
<v-form v-model="valid">
    <v-container class="my-5">
        <v-row justify="center">
            <v-col cols="12" md="3" lg="2">
                <v-select @input="dateType" :items="dateTypeSelect" v-model="dateTypeValue" label="Select Date Type"></v-select>
            </v-col>

            <v-col cols="12" md="6" lg="4" v-if="dateTypeValue === 'Earth Date'">
                <v-row justify="center">
                  <v-col cols="12" md="6" class="py-0">
                    <v-select @input="selectRover" :items="rover" v-model="selectRoverValue" label="Name Rover"></v-select>
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-menu v-if="selectRoverValue !== null"
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="dateEarth"
                                label="Select a date"
                                readonly
                                required
                                v-on="on">
                            </v-text-field>
                        </template>

                        <v-date-picker v-if="search.selectRoverValue === 'curiosity'" min="2012-08-06" :max="new Date().toISOString().substr(0,10)" v-model="dateEarth" @input="dateEarthRover" ref="picker"></v-date-picker>

                        <v-date-picker v-else-if="search.selectRoverValue === 'opportunity'" min="2004-01-26" max="2018-06-11" v-model="dateEarth" @input="dateEarthRover" ref="picker" ></v-date-picker>

                        <v-date-picker v-else-if="search.selectRoverValue === 'spirit'" min="2004-01-05" max="2010-03-21"  v-model="dateEarth" @input="dateEarthRover" ref="picker" ></v-date-picker>

                    </v-menu>
                  </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="6" lg="4" v-if="dateTypeValue === 'Sol Date'">
                <v-row justify="center">
                    <v-col cols="12" md="6" class="py-0">
                      <v-select @input="selectRover" :items="rover" v-model="selectRoverValue" label="Name Rover"></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field v-model="dateSol" label="Sun Numbrer" @input="sendDateSolRover" type="number" min="1" max="30"></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
            <div class="pt-4 ml-5">
                <v-btn color="success" large dark @click="dateResult"><v-icon>mdi-magnify</v-icon>Search</v-btn>
            </div>
        </v-row>
    </v-container>
</v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
  export default {
    data: () => ({
      valid: false,
      dateTypeValue:'',
      selectRoverValue: null,
      dateEarth: '',
      dateSol: '',
      menu: false,
      rover: [
        'curiosity',
        'opportunity',
        'spirit',
      ],
      dateTypeSelect: [
        'Earth Date',
        'Sol Date',
      ],
    }),

    computed: {
    ...mapState(['search']),
    },

    methods: {
      ...mapActions(['getRover', 'sendDateType', 'sendSelectRover', 'sendDateEarthRover', 'sendDateSolRover']),

      dateResult(){
        this.getRover()
      },
      dateType(dateTypeValue){
        this.sendDateType(dateTypeValue)
      },
      selectRover(selectRoverValue){
        this.sendSelectRover(selectRoverValue)
      },
      dateEarthRover(dateEarth){
        this.sendDateEarthRover(dateEarth)
      },
      dateSolRover(dateSol){
        this.sendDateSolRover(dateSol)
      },
    },
  }
</script>



