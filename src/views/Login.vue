<template>
  <div class="login">
    <h3>Sign In</h3>
    <input v-model="email" type="text" placeholder="Email">
    <input v-model="password" type="password" placehlder="Password">
    <button @click="login">Enter</button>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "login",
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(
        function(user) {
          console.log('User successfully signed in');
        },
        function(err) {
          console.log(err.message);
        }

      )
    }
  }
}
</script>

<style scoped>
 .login {
   margin-top: 40px;
 } 

 input {
   margin: 10px 0;
   width: 20%;
   padding: 15px;
   display: inline-block;
 }
</style>