<template>
  <div class="signup">
    <p>Create a new account</p>
    <input v-model="email" type="text" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <input type="password" placeholder="Confirm Password">
    <button @click="signUp">Sign up</button>

    <p>
      Already have an account?
      <router-link to="/login">Log in.</router-link>
    </p>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signup',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(
        function(user) {
          console.log('User has been created'); 
        },
        function(err) {
          console.log(err.message);
        }); 
    }
  }
}
</script>

<style scoped>
    display: inline-block;
  input {
  }
</style>
