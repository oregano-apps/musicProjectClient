import React from 'react'
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

function ControlPanel({height, backgroundColor}) {
    return (
        <div style={{height: height, backgroundColor:backgroundColor}} className="controlPanel">
            <div className="controlPanelRight">
                <FavoriteBorderIcon style={{color: "red"}} className="controlPanelIcon" />
            </div>
            <div className="controlPanelCenter">
                <SkipPreviousIcon className="controlPanelArrow" />
                <PlayArrowIcon className="controlPanelPlayButton" />
                <SkipNextIcon className="controlPanelArrow" />
            </div>
            <div className="controlPanelLeft">
                <ShuffleIcon className="controlPanelIcon" />
            </div>
            
        </div>
    )
}

export default ControlPanel
