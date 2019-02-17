<template>
  <div class="main">
    <img v-bind:src="albumArt">
    <p> {{ currentArtist }} </p>
    <p> {{ currentSongTitle }}  </p>
    <ul class="buttons">
      <li>
        <font-awesome-icon icon="fast-backward" class="fa-2x"
                           style="text-shadow: white 0px 0px 10px;"
                           v-on:click="fastBackward"/>
      </li>
      <li>
        <font-awesome-icon v-if="playing" 
                           v-on:click="playing = !playing" 
                           icon="pause-circle" 
                           style="text-shadow: white 0px 0px 10px;"
                           class="fa-2x"/>
        <font-awesome-icon v-else 
                           v-on:click="playing = !playing"
                           style="text-shadow: white 0px 0px 10px;"       
                           icon="play-circle" 
                           class="fa-2x"/>
      </li>
      <li>
        <font-awesome-icon icon="fast-forward" class="fa-2x"
                           style="text-shadow: white 0px 0px 10px;"
                           v-on:click="fastForward"/>
      </li>
    </ul>
  </div>
</template>

<script>
import anime from 'animejs'
import Clarifai from 'clarifai'

export default {
  data: function() {
    return {
      token: "",
      albumArt: "https://i.imgur.com/MKqTaPu.png",
      colors: [],
      top5Tracks: [],
      recommendations: [],
      currTrackIndex: 0,
      currentSongTitle: '',
      currentArtist: '',
      playing: true
    }
  },
  methods: {
    parseToken: function() {
      let address = window.location.href;
      let token = address.substr(address.indexOf('=') + 1);
      token = token.substr(0, token.indexOf('&'));

      this.$data.token= token;
    },
    getRecommendations: function(topTracks) {
      let token = this.$data.token;
      let seedStr = encodeURIComponent(topTracks);
      
      let reqUrl = 'https://api.spotify.com/v1/recommendations'
                    + '?seed_tracks=' + seedStr;

      this.$http.get(reqUrl, 
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(function(response) {
        this.$data.recommendations = response.body.tracks;

        this.controller();

      });
    },
    getTopTracks: function() {
      let type = 'tracks';
      let limit = 5;
      let token = this.$data.token;
      
      let reqUrl = 'https://api.spotify.com/v1/me/top/'
                    + type
                    + '?limit=' + limit;
      
      this.$http.get(reqUrl,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(function(response) {
        let topTracksArr = response.body.items;

        let trackIdArr = [];

        for (let i = 0; i < topTracksArr.length; i++) {
          let trackId = topTracksArr[i].id;
          trackIdArr.push(trackId)
        }

        var seedStr = '';

        for (var i = 0; i < trackIdArr.length; i++) {
          seedStr = seedStr.concat(trackIdArr[i]);

          if (i != trackIdArr.length - 1) {
            seedStr = seedStr.concat(',');
          }
        }

        this.getRecommendations(seedStr);
      });
    },
    getAlbumArt: function(album_id) {
      let token = this.$data.token;

      let albumId = album_id;

      let reqUrl = 'https://api.spotify.com/v1/albums/'
                    + albumId;

      this.$http.get(reqUrl,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(function(response) {
        let albumArt = response.body.images[0].url;
        this.$data.albumArt = albumArt;
        this.animation();
      });
    },
    animation: function() {
      const app = new Clarifai.App({
        apiKey: 'f95801e7152c47bc8f13ba567b50b642'
      });
      
      app.models.predict('eeed0b6733a644cea07cf4c60f87ebb7', this.$data.albumArt)
      .then(
        function(response) {
          console.log(response);
          let colors = response.outputs[0].data.colors;
          let colorArr = [];

          for (let i = 0; i < colors.length; i++) {
            let hexVal = colors[i].raw_hex;
            colorArr.push(hexVal);
          }

          anime({
            targets: 'body',
            keyframes: [
              {
                backgroundColor: colorArr[0]
              },
              {
                backgroundColor: colorArr[1],
              },
              {
                backgroundColor: colorArr[2],
              },
              {
                backgroundColor: colorArr[3],
              },
              {
                backgroundColor: colorArr[4],
              }  
            ],
            duration: 20000,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: true
          });
        }
      );
    },
    controller: function() {
      let tracklist = this.$data.recommendations;
      let currTrack = this.$data.currTrackIndex;

      console.log(tracklist[currTrack]);
      
      this.getAlbumArt(tracklist[currTrack].album.id);
      this.$data.currentArtist = tracklist[currTrack].artists[0].name;
      this.$data.currentSongTitle = tracklist[currTrack].name;
    },
    fastBackward: function() {
      if (this.$data.currTrackIndex > 0) {
        this.$data.currTrackIndex -= 1;
        this.controller();
      }
    },
    fastForward: function() {
      if (this.$data.currTrackIndex < this.$data.recommendations.length - 1) {
        this.$data.currTrackIndex += 1;
        this.controller();
      }
    }
  },
  mounted() {
    this.parseToken();
    this.getTopTracks();
  }
}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Space+Mono');
 
 .main {
   font-family: 'Space Mono', monospace;
   text-shadow: white 0px 0px 10px;
 }
 
 img {
   margin: 0 auto;
   max-width: 500px;
   border-radius: 15px;
   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
 }

 .buttons {
   margin-top: 3%;
   list-style-type: none;
   list-style: inside;
   text-align: center;
 }

 .buttons > li {
   display: inline;
   margin: 2.5%;
 } 

 font-awesome-icon {
   font-size: 50px;
 }
</style>