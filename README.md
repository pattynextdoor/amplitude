# Amplitude

> A fun and productive way to discover new music on Spotify

<img src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/763/041/datas/gallery.jpg">
<img src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/763/214/datas/gallery.jpg">

## Brief

Amplitude aims to encourage you to discover new music to prevent stale playlists.

## Usage

After signing in with your Spotify account, Amplitude utilizes your favorite tracks to curate multiple recommendations. You have the option to add each encountered song to your "Amplist", a Spotify playlist containing all of your favorite tracks from Amplitude.

* `git clone https://github.com/ptumb001/amplitude.git`
* `cd amplitude && npm install && npm run serve`

## Technologies Used
* [Vue.js](https://vuejs.org/)
  * Front-end JavaScript framework
* [anime.js](https://animejs.com/)
  * JavaScript animation framework
* [Clarifai API - Color Model](https://clarifai.com/models/color-image-recognition-model-eeed0b6733a644cea07cf4c60f87ebb7)
  * Used to extract dominant colors from album artwork for usage in anime.js
* [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
  * Retrieve Spotify album art, top tracks, recommendations, and playlist modification permission

## Bugs/Incomplete Features
* Sometimes accidentally creates a duplicate playlist
* Text color not dynamic (unlike background color)
* Spotify playback within browser not implemented, requires different API
* Other extraneous animations

## What I Learned

As a HTML/CSS-type of front-end developer (and not a JS framework-type), I found it daunting getting started with Vue. But it slowly grew on me, and I can clearly see how powerful frameworks can make interfaces. I also wrangled with Spotify's OAuth for quite a few hours, but I was able to get through it. Overall, I'm satisfied with how much I learned at this hackathon while having a great time.
