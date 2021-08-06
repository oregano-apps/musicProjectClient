import React, {useState, useRef, useEffect, useContext} from 'react'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InfoIcon from '@material-ui/icons/Info';
import FirstButton from '../firstButton/FirstButton';
import SpotifyWebApi from "spotify-web-api-node"
import {Context} from './../../context/spotifyContext'
import axios from 'axios'
import TrackSearchResult from '../../utils/TrackSearchResult';

const spotifyApi = new SpotifyWebApi({
    clientId: "44ac6a7030a545d681e0ff5e34777f28",
  })

function AddSection() {
    // const songName = useRef()
    const [songName, setSongName] = useState("")
    const songNameRef = useRef()
    const artistName = useRef()
    const [file, setFile] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const {spotifyToken, refreshToken} = useContext(Context)
    const [focus, setFocus] = useState(false);




    function chooseTrack(track) {
     setSongName(track.title)
     artistName.current.value = track.artist
    }

    const addSongSubmit = (e) => {
        e.preventDefault()

        if (!songName || !artistName.current.value || !file) {
            console.log('not ready to submit')
            return
        }
        let songInfo = {
            songName: songName.current.value,
            artist: artistName.current.value,
        }

        const data = new FormData();
        const audioName = Date.now() + file.name;
        data.append("name", audioName);
        data.append("file", file);
        songInfo.audio = audioName;
        console.log(audioName)

        axios.post("http://localhost:8800/api/songs/createSong", songInfo)
        axios.post("http://localhost:8800/api/songs/uploadAudio", data)
    }

    useEffect(() => {
      if (!spotifyToken) return
      spotifyApi.setAccessToken(spotifyToken)
    }, [spotifyToken])


    useEffect(() => {
        if (!songName) return setSearchResults([])
        if (!spotifyToken || spotifyToken.length < 20) return
    
        let cancel = false
        spotifyApi.searchTracks(songName).then(res => {
          if (cancel) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            })
            
          )
        })

       
    
        return () => (cancel = true)
      }, [songName, spotifyToken])

    return (
        <div class='addSection'>
            <div className="addSection_card">
                <div className="addSection_top">
                    <h2 className="addSection_title">Add Song</h2>
                    <InfoIcon className="addSection_info" />
                </div>
                <form onSubmit={addSongSubmit} className="addSection_bottom">
                    <div className="addSection_inputs">
                        <div className="addSection_inputContainer">
                            <input ref={songNameRef} value={songName} onFocus={() => setFocus(true)} onChange={e => {setSongName(e.target.value)}} style={{zIndex: 9}} placeholder="Song Name" type="text" className="addSection_input" />
                            <span style={{zIndex: 10}} className="addSection_inputBorder"></span>
                            <div className="addSeaction_searchResults" onClick={() => setFocus(false)}>
                            {focus && (songName.length > 0) ? searchResults.map(track => (
                              <TrackSearchResult
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                              />
                            )): null}
                        </div>
                        </div>

                        

                        <div className="addSection_inputContainer">
                            <input ref={artistName} placeholder="Band / Artist" type="text" className="addSection_input" />
                            <span className="addSection_inputBorder"></span>
                        </div>

                        <label htmlFor="file" className="addSection_upload">
                            <MusicNoteIcon className="addSection_uploadIcon" />
                            <span className="addSection_uploadText">Upload Audio</span>
                            <MusicNoteIcon className="addSection_uploadIcon" />
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".mp3,.mp4"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                   <FirstButton color="#000" colorTwo="#fff" text="Submit" icon={<CloudUploadIcon className="firstButton_buttonIcon" />} />
                </form>
            </div>
            
        </div>
    )
}

export default AddSection
