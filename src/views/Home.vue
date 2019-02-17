<template>
  <div class="home">
    <h1>Amplitude</h1>
    <font-awesome-icon icon="headphones" class="fa-5x"/>
    <p>A fun and productive way to discover new music on Spotify.</p>
    <p>To get start, let's
      <a v-bind:href="authLink">
        log in to Spotify.
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      authLink: ""
    }
  },
  methods: {
    getToken: function() {
      let tokenCode = this.$data.tokenCode;
      let clientId = 'fa4cbe30a849431489c696eb50f9fb3e';
      let clientSecret = '274e2e1d0d19493abff5d0540c0ca4db';
      let encoded = btoa(clientId + ':' + clientSecret);
      let scopes = encodeURIComponent('user-modify-playback-state user-top-read user-read-recently-played user-read-private user-read-email user-read-birthdate');
      let postUrl = 'https://accounts.spotify.com/authorize'
                    + '?client_id=' + clientId
                    // + '?client_secret=' + clientSecret
                    + '&response_type=' + 'token'
                    // + '?grant_type=' + 'authorization_code'
                    // + '?code=' + tokenCode
                    + '&scope=' + scopes
                    + '&redirect_uri=' + encodeURIComponent('http://localhost:8080/main');
      console.log(postUrl);
      this.$data.authLink = postUrl; 
    }
  },
  mounted() {
    this.getToken();
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Space+Mono');

  .home {
    font-family: 'Space Mono', monospace;
  } 

  h1 {
    font-size: 8rem;
    letter-spacing: 2px;
  }
</style>
