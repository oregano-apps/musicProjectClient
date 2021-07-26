const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=44ac6a7030a545d681e0ff5e34777f28&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
  
  function Login() {
      return (
          <div>
            <a className="btn btn-success btn-lg" href={AUTH_URL}>
                Login With Spotify
            </a>
          </div>
      )
  }
  
  export default Login
  