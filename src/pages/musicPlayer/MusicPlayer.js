import React from 'react'
import BackspaceIcon from '@material-ui/icons/Backspace';
import ControlPanel from '../../components/controlPanel/ControlPanel';
import SearchSong from '../../components/searchSong/SearchSong';
import Playlist from '../../components/playlist/Playlist';

function MusicPlayer() {
    return (
        <div className="musicPlayer">
            <section className="musicPlayerTitleSection">
                <BackspaceIcon className="musicPlayerBackButton" />
                <div className="musicPlayerTitleTop">
                    <img src="https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/38/04/dc/3804dc77-f2d7-1d6e-a99f-8b5dccfe4389/artwork.jpg/400x400cc.jpg" alt="" className="musicPlayerSongImage" />
                    <div className="musicPlayerTitleSongInfo">
                        <h1 className="musicPlayerTitleSongName">Song Name</h1>
                        <h2 className="musicPlayerTitleArtistName">Artist Name</h2>
                    </div>
                </div>
                    <div className="musicPlayerProgressBarContainer">
                        <span className="musicPlayerProgressBarText">1:23</span>
                        <div className="musicPlayerProgressBar"></div>
                        <span className="musicPlayerProgressBarText">3:23</span>
                    </div>
                
            </section>
            <ControlPanel height="12vh" backgroundColor="#b3d9ff" />
            <SearchSong />
            <Playlist />
        </div>
    )
}

export default MusicPlayer
