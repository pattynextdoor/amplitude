<template>
  <div class="player">
    <img v-bind:src="albumArt">
    <p>5</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      albumArt: "https://i.imgur.com/MKqTaPu.png"
    }
  },
  methods: {
    getAlbumArt: function() {
      let clientId = 'fa4cbe30a849431489c696eb50f9fb3e';
      // 🤫🤫🤫🤫 shh keep it a secret
      let clientSecret = '274e2e1d0d19493abff5d0540c0ca4db';
      let encoded = btoa(clientId + ':' + clientSecret);
      let token = this.$parent.$data.token;

      console.log(token);
      console.log(encoded);
    }
  },
  mounted() {
    this.getAlbumArt();
  }
}
</script>

<style scoped>
  img {
    max-width: 500px;
  }
</style>
  