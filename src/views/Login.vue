<template>
    <v-main class="login" height="100vh">
        <v-snackbar elevation="13" top color="error darken-1" v-model="alert" timeout="3000">
            <v-row class="login__alert">
                <v-icon class="login__alert-icon">mdi-alert</v-icon>
                <v-col class="grow">The data is not correct, please try again</v-col>
            </v-row>
        </v-snackbar>
        <v-img v-if="apods.media_type === 'image'" :src="apods.url" height="100vh" width="100%" class="login__apod"></v-img>
        <v-img v-if="apods.media_type === 'video'" src="https://apod.nasa.gov/apod/image/2007/Butterfly_HubbleSchmidt_4767.jpg" height="100vh" width="100%" class="login__apod"></v-img>
        <div class="login__content">
            <div>
                <v-img src="/img/NASA_logo.svg" transition="scale-transition" class="login__logo"></v-img>
                <v-card class="mx-auto login__card">
                    <v-card-text>
                        <v-form>
                            <v-text-field label="Email" prepend-icon="mdi-email" v-model="user"/>
                            <v-text-field
                            label="Password"
                            :type="showPassword ? 'text' : 'password'"
                            prepend-icon="mdi-lock"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                            v-model="password"/>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn block color="info" @click="login" class="login__btn">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </v-main>
</template>

<script>
import Firebase from "firebase";
import { mapState, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: "",
      password: "",
      showPassword: false,
      alert: false,
      date: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    ...mapState('apod',["apods"]),
  },
  methods: {
    ...mapActions('apod',["getApod"]),
    ...mapActions(["updateUser"]),

    login() {
      Firebase.auth()
        .signInWithEmailAndPassword(this.user, this.password)
        .then((response) => {
          this.updateUser(response.user.email);
          this.$router.push("/apod");
        })
        .catch(() => {
          this.alert = true;
        });
    },
  },
  created() {
    this.getApod(this.date);
    this.updateUser(null);
  },
};
</script>

