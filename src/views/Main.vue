<template>
  <div class="main">
    <h1>Amplitude</h1>
    <img class="albumArt" v-bind:src="albumArt">
    <p class="artist"> {{ currentArtist }} </p>
    <p class="song"> {{ currentSongTitle }}  </p>
    <a v-bind:href="currTrackLink" target="_blank">
      <button>Open Track</button>
    </a>

    <button v-on:click="addToAmplist">Add to Amplist</button>
    
    <ul class="buttons">
      <li>
        <img src="https://img.icons8.com/cotton/64/000000/circled-left-2.png"
             v-on:click="fastBackward">
      </li>
      <li>
        <img src="https://img.icons8.com/cotton/64/000000/circled-right.png"
             v-on:click="fastForward">
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
      token: '',
      amplistId: '',
      albumArt: "https://i.imgur.com/MKqTaPu.png",
      colors: [],
      top5Tracks: [],
      recommendations: [],
      currTrackIndex: 0,
      currTrackLink: '',
      currTrackUri: '',
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

        console.log(this.$data.recommendations);

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
      this.$data.currTrackLink = tracklist[currTrack].external_urls.spotify;
      this.$data.currTrackUri = tracklist[currTrack].uri;
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
    },
    addToAmplist: function() {
      // Check if user already has an Amplist
      anime({
        targets: '.albumArt',
        borderRadius: '50%',
        duration: 2000,
        easing: 'easeInOutQuart',
        direction: 'alternate'
      });
      if (this.amplistExists()) {
        // Create amplist 
        this.createAmplist();
      }
      // Add current track
      let token = this.$data.token;
      let reqUrl = 'https://api.spotify.com/v1/me/playlists';

      this.$http.get(reqUrl,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(function(response) {
        let playlists = response.body.items;

        for (let i = 0; i < playlists.length; i++) {
          if (playlists[i].name == "Amplist - Curated By Amplitude") {
            this.$data.amplistId = playlists[i].id;
          } 
        }

        let reqUrl = 'https://api.spotify.com/v1/playlists/'
                      + this.$data.amplistId + '/tracks'
                      + '?uris=' + encodeURIComponent(this.$data.currTrackUri);
        
        this.$http.post(reqUrl, 
        {
          body: {
            'uris': encodeURIComponent(this.$data.currTrackUri)
          }
        },
        {
          headers: {
            'Authorization': 'Bearer ' + this.$data.token
          }
        })
      })

    },
    amplistExists: function() {
      let token = this.$data.token;
      let reqUrl = 'https://api.spotify.com/v1/me/playlists';

      this.$http.get(reqUrl,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(function(response) {
        let playlists = response.body.items;

        for (let i = 0; i < playlists.length; i++) {
          if (playlists[i].name == 'Amplist - Curated By Amplitude') {
            return true;
          }
        }

        return false;
      });
    },
    createAmplist: function() {
      // First, retrieve current user's ID
      let token = this.$data.token;
      let reqUrl = 'https://api.spotify.com/v1/me';

      this.$http.get(reqUrl,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(function(response) {
        // Now we can create the playlist
        let userId = response.body.id;
        let reqUrl = 'https://api.spotify.com/v1/users/'
                      + userId + '/playlists'; 

        this.$http.post(reqUrl, 
        {
          'name': 'Amplist - Curated By Amplitude',
          'description': 'Songs saved from Amplitude.',
          'public': true
        },
        {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(function(response) {
          // Add song to Amplist
          console.log(response);
        });

      });
    }
  },
  mounted() {
    this.parseToken();
    this.getTopTracks();
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 37) {
        this.fastBackward();
      }
      else if (e.keyCode == 39) {
        this.fastForward();
      }
    })
  }
}
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Space+Mono');
 
 .main {
   font-family: 'Space Mono', monospace;
 }
 
 .albumArt {
   margin: 0 auto;
   max-width: 16.5%;
   border-radius: 10%;
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
   margin: 5%;
 } 

 button {
   background-color: transparent;
   font-size: 2em;
   color: #2c3e50;
   font-family: 'Space Mono', monospace;
 }

 font-awesome-icon {
   font-size: 50px;
 }

 .artist {
   padding: 0;
   font-size: 2em;
   font-weight: 500;
 }

 .song {
   font-size: 2.5em;
   font-weight: 700;
 }
</style>