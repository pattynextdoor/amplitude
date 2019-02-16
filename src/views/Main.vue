<template>
  <div class="main">
    <h1>Successfully authenticated!</h1>
    <p>{{ token }}</p>
  </div>
</template>

<script>
import Player from '@/components/Player.vue'

export default {
  data: function() {
    return {
      tokenCode: "",
      token: ""
    }
  },
  methods: {
    getTokenCode: function() {
      let address = window.location.href;
      let code = address.substr(address.indexOf("?code=") + 6);

      this.$data.tokenCode = code;
    },
    getToken: function() {
      let tokenCode = this.$data.tokenCode;
      let clientId = 'fa4cbe30a849431489c696eb50f9fb3e';
      let clientSecret = '274e2e1d0d19493abff5d0540c0ca4db';
      let encoded = btoa(clientId + ':' + clientSecret);
      let postUrl = 'https://accounts.spotify.com/api/token'
                    + '?client_id=' + clientId
                    + '?client_secret=' + clientSecret
                    + '?grant_type=' + 'authorization_code'
                    + '?code=' + tokenCode
                    + '?redirect_uri=' + 'http://localhost:8080/main'; 

      console.log(postUrl);

      this.$http.post(postUrl, 
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded'
        } 
      },
        function(res, err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(res);
          }
      }
      
      );
    }
  },
  mounted() {
    this.getTokenCode();
    this.getToken();
  },
  components: {
    Player
  }
}
</script>