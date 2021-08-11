import React, {useState, useContext} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import {PlaylistContext} from './../../context/playlistContext'
import { addSongToPlaylistCall } from '../../utils/apiCalls';

function SearchSong() {
    const [searchResults, setSearchResults] = useState([])
    const [searchType, setSearchType] = useState('Song')
    const [searchValue, setSearchValue] = useState('')
    const [resultCursor, setResultCursor] = useState(0)
    const {playlist, dispatch} = useContext(PlaylistContext)

    const search = () => {
        if (!searchValue) return
        if (searchType == "Song") {
            searchSong()
        } else {
            searchPlaylist()
        }
    }

    const searchPlaylist = async () => {
        console.log('searching playlist')
    }

    const searchSong = async () => {
        try {
            const res = await axios(`http://localhost:8800/api/songs/song/${searchValue}`)
            if (res.data.song.length == 0) {
                console.log('there is no songs')
            } else {
                setSearchResults(res.data.song)
            }
        } catch(err) {
            console.log(err)
        }
    }

    const resetSearching = () => {
        setSearchResults([])
        setSearchValue('')
    }

    const nextSearch = () => {
        if (!searchResults[resultCursor + 1]) {
            console.log('this is the last one')
            return
        }
        setResultCursor(resultCursor + 1)
    }

    const addToPlaylist = () => {
        if (playlist.filter(song => song.name === searchResults[resultCursor].name).length > 0) {
            console.log('the song is already in the playlist')
            return
        }
        addSongToPlaylistCall(searchResults[resultCursor], dispatch)
        resetSearching()
    }

    return (
        <div className="searchSong">
            <div className="searchSongCard">
                <div className="searchSongTop">
                    <div className="searchSongSearchContainer">
                        <input value={searchValue} onChange={e => {setSearchValue(e.target.value)}} type="text" placeholder="Song Name..." className="searchSongSearch" />
                        <div className="searchSongSearchIconPart">
                            <SearchIcon onClick={search} className="searchSongSearchIcon" />
                        </div>
                    </div>
                    <div className="searchSongRadioContainer">
                        <label htmlFor="" className="searchSongRadioItem">
                            <input value="Song" onClick={e => setSearchType(e.target.value)} defaultChecked="true" type="radio" name="selectType" className="searchSongRadio" />
                            <div className="searchSongRadioButton"></div>
                            <span className="searchSongRadioLabel">Song</span>
                        </label>
                        <label htmlFor="" className="searchSongRadioItem">
                            <input value="Playlist" onClick={e => setSearchType(e.target.value)} type="radio" name="selectType" className="searchSongRadio" />
                            <div className="searchSongRadioButton"></div>
                            <span className="searchSongRadioLabel">Playlist</span>
                        </label>
                    </div>
                    
                </div>
                <div className="searchSongBottom">
                    {searchResults.length > 0 ?  (
                        <>
                            <div class="searchSongResultTop">
                                <img src={searchResults[resultCursor]?.backgroundPicture} alt="" className="searchSongResultImage" />
                                <div className="searchSongResultInfo">
                                    <h2 className="searchSongResultName">{searchResults[resultCursor]?.name}</h2>
                                    <h3 className="searchSongResultArtist">{searchResults[resultCursor]?.artist}</h3>
                                </div>
                            </div>
                            <div class="searchSongResultBottom">
                                <div onClick={addToPlaylist} className="searchSongResultButton">
                                    <span className="searchSongResultText">Add</span>
                                    <AddIcon className="searchSongResultIcon"></AddIcon>
                                </div>
                                <div onClick={nextSearch} className="searchSongResultButton">
                                    <span className="searchSongResultText">Next</span>
                                    <ArrowForwardIcon className="searchSongResultIcon"></ArrowForwardIcon>
                                </div>
                                <div onClick={resetSearching} className="searchSongResultButton">
                                    <span className="searchSongResultText">Reset</span>
                                    <AutorenewIcon className="searchSongResultIcon"></AutorenewIcon>
                                </div>
                            </div>
                        </>
                    ): null}
                </div>
            </div>
        </div>
    )
}

export default SearchSong
