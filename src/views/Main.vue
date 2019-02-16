<template>
  <div class="main">
    <h1>Successfully authenticated!</h1>
    <p>{{ token }}</p>
    <Player />
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
    parseToken: function() {
      let address = window.location.href;
      let code = address.substr(address.indexOf("?code=") + 6);

      this.$data.tokenCode = code;
    }
  },
  mounted() {
    // this.getTokenCode();
    this.parseToken();
  },
  components: {
    'Player': Player
  }
}
</script>