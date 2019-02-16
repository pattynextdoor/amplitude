module.export = {
  spotifyLogin: () => {
    let my_client_id = 'fa4cbe30a849431489c696eb50f9fb3e';
    let redirect_uri = 'http://localhost:8080';
    let scopes = 'user-read-private user-read-email';
    let url = 'https://accounts.spotify.com/authorize'
      + '?response_type=code'
      + '&client_id='
      + my_client_id
      + (scopes ? '&scope=' + encodeURIComponent(scopes) : '')
      + '&redirect_uri=' + encodeURIComponent(redirect_uri);
    
    window.location.href = url;
  }
}