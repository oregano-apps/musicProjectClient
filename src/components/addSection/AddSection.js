import React, {useState, useRef, useEffect, useContext} from 'react'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InfoIcon from '@material-ui/icons/Info';
import FirstButton from '../firstButton/FirstButton';
import SpotifyWebApi from "spotify-web-api-node"
import {SpotifyContext} from './../../context/spotifyContext'
import {Context} from './../../context/Context'
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
    const [songDuration, setSongDuration] = useState("")
    const [songImage, setSongImage] = useState("")
    const [file, setFile] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const {spotifyToken, refreshToken} = useContext(SpotifyContext)
    const {user} = useContext(Context)
    const [focus, setFocus] = useState(false);




    function chooseTrack(track) {
      console.log("track 1", track)
      setSongName(track.title)
      artistName.current.value = track.artist
      setSongDuration(track.duration)
      console.log(track.duration)
      setSongImage(track.albumUrl)
    }

    const get_smallest_image = (track) => {
      const smallestAlbumImage = track.album.images.reduce(
        (smallest, image) => {
          if (image.height < smallest.height) return image
          return smallest
        },
        track.album.images[0]
      )
      return smallestAlbumImage
    }

    const getDurationClear = (trackDuration) => {
      let durationSeconds = trackDuration / 1000
      let durationMinuts = Math.floor(durationSeconds / 60)
      durationSeconds = Math.floor(durationSeconds - (durationMinuts * 60)).toString()
      durationSeconds.length < 2 ? durationSeconds = '0' + durationSeconds : durationSeconds = durationSeconds
      return `${durationMinuts}:${durationSeconds}`
    }

    const addSongSubmit = async (e) => {
        e.preventDefault()

        if (!songName || !artistName.current.value || !file) {
            console.log('not ready to submit')
            return
        }
        
        let songInfo = {
          name: songName.toLowerCase(),
          artist: artistName.current.value,
          duration: songDuration,
          backgroundPicture: songImage,
          user: user._id
        }

        const data = new FormData();
        data.append("file", file);
        


        const audioName = await axios.post("http://localhost:8800/api/songs/uploadAudio", data)
        console.log(audioName.data)
        songInfo.audio = audioName.data;
        await axios.post("http://localhost:8800/api/songs/createSong", songInfo)
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
              console.log(track)
              let smallestAlbumImage = get_smallest_image(track)
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
                duration: getDurationClear(track.duration_ms)
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
                            {focus && (songName.length > 0) ? <div className="addSeaction_searchResults" onClick={() => setFocus(false)}>
                              {searchResults.map(track => (
                              <TrackSearchResult
                                track={track}
                                key={track.uri}
                                chooseTrack={chooseTrack}
                              />
                              ))}     
                              </div>
                            : null}
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
                        <p className="addSection_fileName">{file ? file.name : null}</p>
                    </div>
                   <FirstButton color="#6F5BA7" colorTwo="#fff" text="Submit" icon={<CloudUploadIcon style={{color: "#b3d9ff"}} className="firstButton_buttonIcon" />} />
                </form>
            </div>
            
        </div>
    )
}

export default AddSection
