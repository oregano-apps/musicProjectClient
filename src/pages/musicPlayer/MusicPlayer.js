import React, {useState, useRef, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import BackspaceIcon from '@material-ui/icons/Backspace';
import ControlPanel from '../../components/controlPanel/ControlPanel';
import SearchSong from '../../components/searchSong/SearchSong';
import Playlist from '../../components/playlist/Playlist';
import { PlaylistContext } from '../../context/playlistContext';
import Popup from '../../components/popup/Popup';

function MusicPlayer() {
    const audioRef = useRef()
    const [audioSource, setAudioSource] = useState(null)
    const [play, setPlay] = useState(false)
    const {playlist, dispatch} = useContext(PlaylistContext)
    const [playlistCursor, setPlaylistCursor] = useState(0)
    const currentSong = playlist[playlistCursor]
    const [popupConfig, setPopupConfig] = useState({display: false, message: '', type: ''})
    let [currentTime, setCurrentTime] = useState(audioRef.current?.currentTime ? Math.floor(audioRef.current.currentTime) : "0:00")
    let [currentTimeDisplay, setCurrentTimeDisplay] = useState(currentTime)

    const updateProgress = () => {
        setCurrentTime(Math.floor(audioRef.current.currentTime))
        setCurrentTimeDisplay(getDurationClear(Math.floor(audioRef.current.currentTime)))
    }

    const getDurationClear = (durationSeconds) => {
        let durationMinuts = Math.floor(durationSeconds / 60)
        durationSeconds = Math.floor(durationSeconds - (durationMinuts * 60)).toString()
        durationSeconds.length < 2 ? durationSeconds = '0' + durationSeconds : durationSeconds = durationSeconds
        return `${durationMinuts}:${durationSeconds}`
      }

    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', updateProgress);
    }, [])

    const getAudio = async (songNumber) => {
        if (!currentSong){
            setPopupConfig({display: true, message: 'Please insert a song', type: 'error'})
            return
        }
        else {
            await setAudioSource(`http://localhost:8800/api/songs/getAudio/${playlist[songNumber].audio}`)
            audioRef.current.play()
            setPlay(true)
            updateProgress()
        } 

    }

    const start = (songNumber) => {
        if (!audioSource || audioSource !== `http://localhost:8800/api/songs/getAudio/${playlist[songNumber]?.audio}`) {
             return getAudio(songNumber)
        }
        if (play) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setPlay(!play)
        updateProgress()
      }

    const changeSong = async (direction, message) => {
        if (playlist[direction]){
            await setPlaylistCursor(direction)
            updateProgress()
            start(direction)
            
        } else {
            setPopupConfig({display: true, message: message, type: 'error'})
        }
    }

    const shuffleSongs = () => {
        if (playlist.length == 0) {
            return setPopupConfig({display: true, message: 'Please add songs to the playlist', type: 'error'})
        }
        const randomSong = Math.floor(Math.random() * playlist.length)
        changeSong(randomSong, 'asd')
    }

    return (
        <div className="musicPlayer" onClick={e => popupConfig.display ? setPopupConfig({...popupConfig, display: false}) : null}>
            <Popup classes={popupConfig.display ? "popup popupActive" : 'popup'} type={popupConfig.type} message={popupConfig.message} />
            <audio ref={audioRef} src={audioSource}>
            </audio>
            <section style={{backgroundImage: `linear-gradient(to right top,rgba(0,0,0, .6),rgba(0,0,0, .9)),url("${currentSong ? currentSong.backgroundPicture : null}")`}} className="musicPlayerTitleSection">
                <Link to="/homepage">
                    <BackspaceIcon className="musicPlayerBackButton" />
                </Link>
                <div className="musicPlayerTitleTop">
                    <img src={currentSong ? currentSong.backgroundPicture : "Song Name"} alt="" className="musicPlayerSongImage" />
                    <div className="musicPlayerTitleSongInfo">
                        <h1 className="musicPlayerTitleSongName">{currentSong ? currentSong.name : "Song Name"}</h1>
                        <h2 className="musicPlayerTitleArtistName">{currentSong ? currentSong.artist : "Song Artist"}</h2>
                    </div>
                </div>
                    <div className="musicPlayerProgressBarContainer">
                        <span className="musicPlayerProgressBarText">{currentTimeDisplay}</span>
                        <div className="musicPlayerProgressBar" style={{backgroundPosition: (currentTime / audioRef.current?.duration) * 300}}></div>
                        <span className="musicPlayerProgressBarText">{currentSong ? currentSong.duration : "0:00"}</span>
                    </div>
                
            </section>
            <ControlPanel currentSong={currentSong}
                nextFunction={() => {changeSong(playlistCursor + 1, 'this was the last song')}}
                prevFunction={() => {changeSong(playlistCursor - 1, 'this was the last song')}}
                startFunction={e => start(playlistCursor)}
                shuffleSongsFunction={shuffleSongs}
                setPopupConfig={setPopupConfig}
                play={play} height="12vh" backgroundColor="#b3d9ff" />
            <SearchSong />
            <Playlist currentSong={currentSong} setPlaylistCursor={setPlaylistCursor} startFunction={start} />
        </div>
    )
}

export default MusicPlayer
