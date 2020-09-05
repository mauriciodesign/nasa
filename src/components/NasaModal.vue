<template>
  <v-row justify="center" class="modal">
    <v-dialog class="modal__content" v-model="dialog" scrollable persistent>
      <v-card dark>
        <v-card-title class="modal__title">
            <div class="modal__title-content">
                <h2 class="mr-5">{{modal.rover.name}}</h2>
                <div class="modal__title-camera">
                    <v-icon class="pr-3 pt-1">mdi-camera</v-icon>
                    <h4>{{modal.camera.full_name}}</h4>
                </div>
            </div>
            <v-btn icon @click="closeDialog()">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text class="modal__pading">
            <v-img class="modal__img" :src="modal.img_src"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: {
        dialog: {
            type: Boolean,
            default: false,
        },
        modal: {
            type: Object,
            required: true,
        },
    },
    methods: {
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
  }
</script>

