import React, {Suspense, useContext, useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import PlaylistCard from '../../3dComponents/PlaylistCard/PlaylistCard'
import Orbit from './../../3dComponents/OrbitControls'
import CameraControls from '../../3dComponents/CameraControls';
import Header from '../../3dComponents/Header'
import {PlaylistContext} from './../../context/playlistContext'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { mapLinear } from 'three/src/math/MathUtils';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteSongFromPlaylistCall } from '../../utils/apiCalls';

function Playlist({startFunction, setPlaylistCursor, currentSong}) {
    const {playlist, dispatch} = useContext(PlaylistContext)
    const [optionNumber, setOptionNumber] = useState("")

    return (
        <div className="playlist">
            <img src="https://static.vecteezy.com/system/resources/previews/001/370/786/non_2x/wavy-soapy-hexagon-pattern-blue-abstract-background-free-vector.jpg" alt="" className="playlistbackground" />
            <div className="playlistTop">
                <div className="playlistTopLeft">
                    <h2 className="playlistTitle">Playlist</h2>
                </div>
                <div className="playlistTopRight">
                    <button className="playlistFavoriteButton">
                        <FavoriteIcon className="playlistFavoriteButtonIcon" />
                    </button>
                </div>
            </div>
            <div className="playlistMiddle">
                <svg xmlns="http://www.w3.org/2000/svg" className="playlistWaves" viewBox="0 0 1440 320"><path fill="#fcfcfc" fill-opacity="1" d="M0,96L18.5,128C36.9,160,74,224,111,213.3C147.7,203,185,117,222,80C258.5,43,295,53,332,101.3C369.2,149,406,235,443,234.7C480,235,517,149,554,101.3C590.8,53,628,43,665,80C701.5,117,738,203,775,197.3C812.3,192,849,96,886,85.3C923.1,75,960,149,997,197.3C1033.8,245,1071,267,1108,250.7C1144.6,235,1182,181,1218,170.7C1255.4,160,1292,192,1329,213.3C1366.2,235,1403,245,1422,250.7L1440,256L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path></svg>
            </div>
            <div className="playlistBottom">
                {
                    playlist.map((song, index) => {
                        return(
                    <div className={`playlistItem ${currentSong.name == song.name ? "playlistItemActive" : 'playlistItemInactive'}`}>
                        <button onClick={e => {
                            startFunction(index)
                            setPlaylistCursor(index)
                        }}className="playlistItemTrashButton">{index}</button>
                        <div onClick={e => {
                            startFunction(index)
                            setPlaylistCursor(index)
                        }} className="playlistItemInfo">
                            <h3 className="playlistItemArtist">{song.name}</h3>
                            <h2 className="playlistItemSongName">{song.artist}</h2>
                        </div>
                        <span className="playlistItemDuration">{song.duration}</span>
                        <MoreVertIcon onClick={e => setOptionNumber(song.name)} className="playlistItemMoreIcon" />
                        <div style={{opacity: optionNumber == song.name ? 1 : 0, display: optionNumber == song.name ? 'block' : "none"}} className="playlistItemPopup">
                            <div onClick={e => deleteSongFromPlaylistCall(song, dispatch)} className="playlistItemPopupOption">
                                <span className="playlistItemPopupText">Delete</span>
                                <DeleteIcon className="playlistItemPopupIcon" />
                            </div>
                            {/* <div className="playlistItemPopupOption">
                                <span className="playlistItemPopupText">Download</span>
                                <DeleteIcon className="playlistItemPopupIcon" />
                            </div> */}
                        </div>
                    </div>
                
                )})
                }
            </div>
            <div className="playlistDeadArea"></div>
            
            
            {/* <Canvas>
                
                <PlaylistCard  />
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 4, 1]} intensity={3} />
                <Orbit />
                <CameraControls />
                <Suspense fallback={null}>
                    <Header hAlign="center" position={[-1, 2.2, 0]} children="PLAYLIST" />
                </Suspense>
                (
                    renderPlaylist
                )
            </Canvas> */}
        </div>
    )
}

export default Playlist
