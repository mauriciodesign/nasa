<template>
<v-form ref="form" v-model="valid" lazy-validation>
    <v-container class="my-5">
        <v-row justify="center">
            <v-col cols="12" md="3" lg="2">
                <v-select @input="dateType" :items="dateTypeSelect" v-model="dateTypeValue" label="Select Date Type" required :rules="selectRules"></v-select>
            </v-col>

            <v-col cols="12" md="6" lg="4" v-if="dateTypeValue === 'Earth Date'">
                <v-row justify="center">
                  <v-col cols="12" md="6" class="py-0">
                    <v-select @input="selectRover" :items="rover" v-model="selectRoverValue" label="Name Rover" required :rules="selectRules"></v-select>
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="dateEarth"
                                label="Select a date"
                                required
                                :rules="selectRules"
                                :disabled="selectRoverValue === null"
                                v-on="on">
                            </v-text-field>
                        </template>

                        <v-date-picker v-if="selectRoverValue === 'curiosity'" min="2012-08-06" :max="new Date().toISOString().substr(0,10)" v-model="dateEarth" @input="dateEarthRover" ref="picker"></v-date-picker>

                        <v-date-picker v-else-if="selectRoverValue === 'opportunity'" min="2004-01-26" max="2018-06-11" v-model="dateEarth" @input="dateEarthRover" ref="picker" ></v-date-picker>

                        <v-date-picker v-else-if="selectRoverValue === 'spirit'" min="2004-01-05" max="2010-03-21"  v-model="dateEarth" @input="dateEarthRover" ref="picker"></v-date-picker>

                    </v-menu>
                  </v-col>
                </v-row>
            </v-col>

            <v-col cols="12" md="6" lg="4" v-if="dateTypeValue === 'Sol Date'">
                <v-row justify="center">
                    <v-col cols="12" md="6" class="py-0">
                      <v-select @input="selectRover" :items="rover" v-model="selectRoverValue" label="Name Rover" required :rules="selectRules"></v-select>
                    </v-col>
                    <v-col cols="12" md="6" class="py-0">
                      <v-text-field v-model="dateSol" label="Sun Numbrer" @input="sendDateSolRover" type="number" min="1" max="5107" required :rules="selectRules"></v-text-field>
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
      valid: true,
      dateTypeValue:'',
      selectRoverValue: null,
      dateEarth: null,
      dateSol: null,
      menu: false,
      selectRules:[v => !!v || 'Item is required'],
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
      ...mapState(['roverLatest'])
    },
    methods: {
      ...mapActions(['getRover', 'sendDateType', 'sendSelectRover', 'sendDateEarthRover', 'sendDateSolRover']),

      dateResult(){
        if (this.$refs.form.validate() !== false) {
          this.getRover()
        }
      },
      dateType(dateTypeValue){
        this.sendDateType(dateTypeValue)
      },
      selectRover(selectRoverValue){
        this.sendSelectRover(selectRoverValue)
      },
      dateEarthRover(dateEarth){
        this.$refs.menu.save(dateEarth)
        this.sendDateEarthRover(dateEarth)
      },
      dateSolRover(dateSol){
        this.sendDateSolRover(dateSol)
      },
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
  }
</script>



