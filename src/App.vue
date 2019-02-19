<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="!firebase.auth().currentUser" to="/login">Login</router-link>
      <router-link v-if="!firebase.auth().currentUser" to="/signup">Sign Up</router-link>
      <router-link v-if="firebase.auth().currentUser" to="/main">Your Recommendations</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
