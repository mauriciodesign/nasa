<template>
  <h1>Error 404</h1>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    methods: {
        ...mapActions(['updateUser'])
    },
    created() {
          this.updateUser(null)
    },
}
</script>

<style>

</style>
