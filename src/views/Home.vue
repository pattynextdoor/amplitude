<template>
  <div class="home">
    <font-awesome-icon icon="headphones" class="fa-5x"/>
    <h1>Amplitude</h1>
    <p>A fun and productive way to discover new music on Spotify.</p>
    <p>
      Amplitude utilizes Spotify's web API to deliver thoughtful
      recommendations while providing a way to revisit your favorite tracks.
    </p>
    <p>To get started, let's
      <a v-bind:href="authLink">
        log in to Spotify.
      </a>
    </p>
  </div>
</template>

<script>
import anime from 'animejs'

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
      let scopes = encodeURIComponent('playlist-modify-public playlist-modify-private user-modify-playback-state user-top-read user-read-recently-played user-read-private user-read-email user-read-birthdate');
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
    anime({
      targets: '.home',
      scale: [0.5, 1],
      duration: 500,
      easing: 'easeInOutSine'
    });
    this.getToken();
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Space+Mono');

  .home {
    font-family: 'Space Mono', monospace;
    padding: 0 25%;
  } 

  h1 {
    font-size: 8rem;
    letter-spacing: 2px;
    margin: 0 auto;
    margin-bottom: 5%;
  }

</style>
