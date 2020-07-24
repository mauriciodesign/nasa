<template>
    <v-main height="100vh">
        <v-img v-if="apods.media_type === 'image'" :src="apods.hdurl" height="100vh" position="fixed"></v-img>
        <v-img v-else src="https://apod.nasa.gov/apod/image/2007/Butterfly_HubbleSchmidt_4767.jpg" height="100vh"></v-img>
        <div class="login">
            <v-img src="/img/NASA_logo.svg" transition="scale-transition" class="login__logo"></v-img>
            <v-card class="mx-auto my-auto login__card">
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
    </v-main>
</template>

<script>
import Firebase from 'firebase';
import {  mapState, mapActions } from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      user:'',
      password:'',
      showPassword: false,
      date: new Date().toISOString().substr(0, 10),
    }
  },
  computed: {
    ...mapState(['apods']),
  },
  methods: {
    ...mapActions(['updateUser', 'getApod']),
    login(){
      Firebase.auth().signInWithEmailAndPassword(this.user, this.password)
      .then((response) =>{
         this.updateUser(response.user.email)
         this.$router.push('/apod')
           alert(`bienvenido ${this.user}`)
       }).catch((error)=>{
           alert(error);
           alert('algo salio mal, intentelo de nuevo')
       })
    }
  },
  created() {
    this.getApod(this.date);
    this.updateUser(null)
  },
};
</script>

<style lang="scss">
.login{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 80%;
  &__logo{
    margin: 0 auto;
    width: 250px;
  }
  &__card{
    padding: 20px;
    border-radius: 18px !important;
    background-color: #ffffffba !important;
    width: 80%;
  }
  &__btn{
    border-radius: 15px;
  }
}

@media (min-width: 500px) {
  .login__card{
    width: 380px;
  }
}
@media (min-width: 960px) {
  .login__logo{
    margin: 10px auto 40px auto;
    width: 300px;
  }
}
</style>
