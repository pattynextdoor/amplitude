<template>
  <div class="home">
    <h1>Amplitude</h1>
    <p>Log in to Spotify</p>
    <a v-bind:href="authLink">
      Log in
    </a>
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
      let postUrl = 'https://accounts.spotify.com/authorize'
                    + '?client_id=' + clientId
                    // + '?client_secret=' + clientSecret
                    + '&response_type=' + 'token'
                    // + '?grant_type=' + 'authorization_code'
                    // + '?code=' + tokenCode
                    + '&redirect_uri=' + encodeURIComponent('http://localhost:8080/main');

      this.$data.authLink = postUrl; 
    }
  },
  mounted() {
    this.getToken();
  }
}
</script>
