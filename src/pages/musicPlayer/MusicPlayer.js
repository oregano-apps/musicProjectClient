import React, {useState, useRef, useEffect, useContext} from 'react'
import BackspaceIcon from '@material-ui/icons/Backspace';
import ControlPanel from '../../components/controlPanel/ControlPanel';
import SearchSong from '../../components/searchSong/SearchSong';
import Playlist from '../../components/playlist/Playlist';
import { PlaylistContext } from '../../context/playlistContext';

function MusicPlayer() {
    const audioRef = useRef()
    const [play, setPlay] = useState(false)
    const {playlist, dispatch} = useContext(PlaylistContext)
    const [playlistCursor, setPlaylistCursor] = useState(0)
    const currentSong = playlist[playlistCursor]
    let currentTime = Math.floor(audioRef.current?.currentTime)

    useEffect(() => {
        if (currentTime < audioRef.current?.duration) {
            setTimeout(() => currentTime += 1, 1000);
          } else {
            console.log('song over')
          }
    }, [])

    const start = () => {
        console.log(audioRef.current.paused)
        if (play) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setPlay(!play)
      }
    
    return (
        <div className="musicPlayer">
            <audio ref={audioRef} controls src="http://localhost:8800/api/songs/getAudio/9a639aee6d83fcbecce0884fa5956fb0">
            </audio>
            <section style={{    backgroundImage: `linear-gradient(to right top,rgba(0,0,0, .6),rgba(0,0,0, .9)),url("${currentSong ? currentSong.backgroundPicture : null}")`}} className="musicPlayerTitleSection">
                <BackspaceIcon className="musicPlayerBackButton" />
                <div className="musicPlayerTitleTop">
                    <img src={currentSong ? currentSong.backgroundPicture : "Song Name"} alt="" className="musicPlayerSongImage" />
                    <div className="musicPlayerTitleSongInfo">
                        <h1 className="musicPlayerTitleSongName">{currentSong ? currentSong.name : "Song Name"}</h1>
                        <h2 className="musicPlayerTitleArtistName">{currentSong ? currentSong.artist : "Song Artist"}</h2>
                    </div>
                </div>
                    <div className="musicPlayerProgressBarContainer">
                        <span className="musicPlayerProgressBarText">{currentTime}</span>
                        <div className="musicPlayerProgressBar" style={{backgroundPosition: (currentTime / audioRef.current?.duration) * 300}}></div>
                        <span className="musicPlayerProgressBarText">{currentSong ? currentSong.duration : "0:00"}</span>
                    </div>
                
            </section>
            <ControlPanel startFunction={start} play={play} height="12vh" backgroundColor="#b3d9ff" />
            <SearchSong />
            <Playlist />
        </div>
    )
}

export default MusicPlayer
