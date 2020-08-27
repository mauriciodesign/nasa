<template>
<v-form ref="form">
    <v-container>
        <v-row class="justify-center mx-8">
            <v-col class="form__date" cols="12" md="3" lg="2">
                <v-select :items="dateTypeSelect" v-model="dateTypeValue" label="Select Date Type" required :rules="selectRules"></v-select>
            </v-col>

            <v-col class="form__name" cols="12" md="6" lg="4" v-if="dateTypeValue">
                <v-row class="justify-center">
                    <v-col cols="12" md="6" class="py-0">
                        <v-select :items="rover" v-model="selectRoverValue" label="Name Rover" required :rules="selectRules" @input="selectValue"></v-select>
                    </v-col>

                    <v-col cols="12" md="6" class="py-0">
                        <div v-if="dateTypeValue === 'Sol Date'">
                            <v-text-field v-if="selectRoverValue === 'curiosity' || 'opportunity' || 'spirit'"
                                v-model="dateSol" :disabled="!selectRoverValue" label="Select sol date" type="number" min="0"
                                :max="manifest.max_sol" required
                                :rules="selectRules">
                            </v-text-field>
                        </div>

                        <div v-if="dateTypeValue === 'Earth Date'">
                            <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y>
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                    v-model="dateEarth"
                                    label="Select earth date"
                                    required
                                    :rules="selectRules"
                                    :disabled="!selectRoverValue"
                                    v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-if="selectRoverValue === 'curiosity' || 'opportunity' || 'spirit'"
                                :min="manifest.landing_date" :max="manifest.max_date" v-model="dateEarth" @input="dateEarthRover" ref="picker" dark>
                                </v-date-picker>
                            </v-menu>
                        </div>
                    </v-col>
                </v-row>
            </v-col>

            <div class="pt-4 ml-5">
                <v-btn color="info" large dark @click="dateResult"><v-icon>mdi-magnify</v-icon>Search</v-btn>
            </div>
        </v-row>
    </v-container>
</v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
  export default {
    name: 'RoverForm',
    data: () => ({
      dateTypeValue:'',
      selectRoverValue: null,
      dateEarth: null,
      dateSol: 1,
      menu: false,
      selectRules:[v => !!v || 'Item is required'],
      rover: [
        'curiosity',
        'opportunity',
        'spirit',
      ],
      dateTypeSelect: [
        'Sol Date',
        'Earth Date',
      ],
    }),
    computed: {
      ...mapState('rover',['manifest']),
    },
    methods: {
      ...mapActions('rover',['getRover', 'getdateglobal']),

      dateResult(){
        if (this.$refs.form.validate() !== false) {
          const payload = {selectRoverValue: this.selectRoverValue , dateEarth: this.dateEarth, dateSol: this.dateSol, dateTypeValue: this.dateTypeValue}
          this.getRover(payload)
        }
      },
      selectValue(value){
          this.getdateglobal(value)
      },
      dateEarthRover(dateEarth){
        this.$refs.menu.save(dateEarth)
      },
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    }
  }
</script>
