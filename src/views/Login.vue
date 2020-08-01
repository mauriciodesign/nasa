<template>
    <v-main height="100vh">
        <v-snackbar elevation="3" top color="error darken-1" v-model="alert" timeout="3000">
            <div class="alert">
                <v-icon class='mr-8'>mdi-alert</v-icon>
                <span>The data is not correct</span>
            </div>
        </v-snackbar>
        <v-img v-if="apods.media_type === 'image'" :src="apods.hdurl" height="100vh" width="100%" class="login__apod"></v-img>
        <v-img v-if="apods.media_type === 'video'" src="https://apod.nasa.gov/apod/image/2007/Butterfly_HubbleSchmidt_4767.jpg" height="100vh" class="login__apod"></v-img>
        <div class="login">
          <div class="login__content">
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
    ...mapState(["apods"]),
  },
  methods: {
    ...mapActions(["updateUser", "getApod"]),
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

<style lang="scss">
.alert {
  text-align: center;
}
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &__apod {
    position: fixed;
  }
  &__content {
    margin: 20px 0;
  }
  &__logo {
    margin: 0 auto;
    width: 250px;
  }
  &__card {
    padding: 20px;
    border-radius: 18px !important;
    background-color: #ffffffba !important;
    width: 80%;
  }
  &__btn {
    border-radius: 15px;
  }
}

@media (min-width: 500px) {
  .login__card {
    width: 380px;
  }
}
@media (min-width: 960px) {
  .login__logo {
    margin: 10px auto 40px auto;
    width: 300px;
  }
}
</style>
