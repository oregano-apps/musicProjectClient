import React, {useContext} from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import axios from 'axios'
import {Context} from './../../context/Context'
import { likeSongCall } from '../../utils/apiCalls';

function ControlPanel({height, backgroundColor, startFunction, play, currentSong, nextFunction, prevFunction, shuffleSongsFunction, setPopupConfig }) {
    const {user, dispatch} = useContext(Context)
    const likeSong = async () => {
        if (!currentSong) return
        let alreadyFavorite = false
        if (user.lovedSongs.includes(currentSong.name)) {
            alreadyFavorite = true
            setPopupConfig({display: true, type: "success", message: "The song has deleted from the favorits"})
        } else{
            setPopupConfig({display: true, type: "success", message: "The song has added to the favorits"})
        }
        likeSongCall(alreadyFavorite, currentSong.name, dispatch)
        const res = await axios.patch('http://localhost:8800/api/users/likeSong', {alreadyFavorite, song: currentSong.name, userId: user._id})
        
    }


    return (
        <div style={{height: height, backgroundColor:backgroundColor}} className="controlPanel">
            <div className="controlPanelRight">
                {currentSong && user.lovedSongs.includes(currentSong.name) ? <FavoriteIcon onClick={likeSong} style={{color: "red"}} className="controlPanelIcon" /> : <FavoriteBorderIcon onClick={likeSong} style={{color: "red"}} className="controlPanelIcon" />}
            </div>
            <div className="controlPanelCenter">
                <SkipPreviousIcon onClick={prevFunction} className="controlPanelArrow" />
                {play ? <PauseIcon onClick={startFunction} className="controlPanelPlayButton" /> : <PlayArrowIcon onClick={startFunction} className="controlPanelPlayButton" />}
                <SkipNextIcon onClick={nextFunction} className="controlPanelArrow" />
            </div>
            <div className="controlPanelLeft">
                <ShuffleIcon onClick={shuffleSongsFunction} className="controlPanelIcon" />
            </div>
            
        </div>
    )
}

export default ControlPanel
