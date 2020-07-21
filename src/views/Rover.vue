<template>
  <v-container>
    <RoverForm/>
    <RoverContent/>
  </v-container>
</template>

<script>
import RoverForm from '../components/RoverForm';
import RoverContent from '../components/RoverContent';
  export default {
    components:{
      RoverForm,
      RoverContent
    }
  }
</script>

<style>

</style>