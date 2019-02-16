<template>
  <div class="player">
    <img v-bind:src="albumArt">
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      albumArt: ""
    }
  },
  methods: {
    getAlbumArt: function() {
      let clientId = 'fa4cbe30a849431489c696eb50f9fb3e';
      let clientSecret = '274e2e1d0d19493abff5d0540c0ca4db';
      let encoded = btoa(clientId + ':' + clientSecret);
      let token = 'BQAnX_Tiw0dRbqwaWYs85sbRUrzE75K55KPmY3tHM2Jxv3G-tQf2oZugDdyhIHOYkcfnVFWZWteE03VBtYlBAG24V72P9_TE2-S7oinkA3YBwtZWCu7JdawGY4gayoUC2pIC1Xf1YiYUcbA8pHjs4S2u3ZqZtktKSQ';

      this.$http.get('https://api.spotify.com/v1/artists/0Q2Tc5yZFJpumLMc7Yz4e4/albums',
      {
        headers: {
          'Authorization': 'Bearer ' + encoded
        }
      })
      .then(function(res) {
        console.log(res);
      })
      ;
    }
  },
  mounted() {
    this.getAlbumArt();
  }
}
</script>

<style scoped>
  
</style>