<template>
  <div class="home">
    <h1>Amplitude</h1>
    <p>Log in to Spotify</p>
    <a href="https:/accounts.spotify.com/authorize?response_type=code&client_id=fa4cbe30a849431489c696eb50f9fb3e&scope=user-read-private user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fmain">
      Log in
    </a>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
