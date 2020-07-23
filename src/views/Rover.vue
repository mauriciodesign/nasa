<template>
  <v-container>
    <RoverForm/>
    <RoverContent/>
  </v-container>
</template>

<script>
import RoverForm from '../components/RoverForm';
import RoverContent from '../components/RoverContent';
import { mapActions } from 'vuex'
  export default {
    components:{
      RoverForm,
      RoverContent
    },
    methods: {
        ...mapActions(['updateUser'])
    },
    created() {
        this.updateUser(true)
    },
  }
</script>

<style>

</style>