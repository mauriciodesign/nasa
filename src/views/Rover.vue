<template>
  <v-main>
    <RoverForm/>
    <RoverContent/>
  </v-main>
</template>

<script>
import RoverForm from "../components/RoverForm";
import RoverContent from "../components/RoverContent";
import { mapActions } from "vuex";
export default {
  name: "Rover",
  components: {
    RoverForm,
    RoverContent,
  },
  methods: {
    ...mapActions(["updateUser"]),
  },
  created() {
    this.updateUser(true);
  },
};
</script>
