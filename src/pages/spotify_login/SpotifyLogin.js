import React from 'react'
import {Link} from 'react-router-dom'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=44ac6a7030a545d681e0ff5e34777f28&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

function SpotifyLogin() {
    return (
        <div className="spotLogin">
            <div className="spotLogin_main">
                <div className="spotLogin_top">
                    <h1 className="spotLogin_title">Connect to spotify</h1>
                    <img src="/images/spotify-logo.png" alt="" className="spotLogin_logo" />
                </div>
                
                <div className="spotLogin_bottom">
                    <Link to="/login" className="spotLogin_button">Back</Link>
                    <a href={AUTH_URL} className="spotLogin_button">Click Here!</a>
                </div>
                
            </div>
            {/* <img src="/images/test_image.svg" alt="" className="spotLogin_image" /> */}
        </div>
        
    )
}

export default SpotifyLogin
