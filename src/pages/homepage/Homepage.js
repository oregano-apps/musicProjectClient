import React, {useEffect, useContext} from 'react'
import Topbar from './../../components/Topbar/Topbar'
import TitleSection from '../../components/titleSection/TitleSection'
import OptionSection from '../../components/optionsSection/OptionSection'
import SectionGap from '../../components/sectionGap/SectionGap'
import AddSection from '../../components/addSection/AddSection'
import useAuth from '../../utils/useAuth'
import {spotifyLoginCall} from './../../utils/apiCalls'
import {SpotifyContext} from './../../context/spotifyContext'

function Homepage({code}) {
    const [spotifyToken, refreshToken] = useAuth(code)
    const { dispatch } = useContext(SpotifyContext);

    useEffect(() => {
        if (!spotifyToken) return
        spotifyLoginCall(spotifyToken, refreshToken, code,  dispatch)
    }, [spotifyToken, refreshToken])

    return (
        <div class="homepage">
            <Topbar />
            <TitleSection />
            <SectionGap color="#000" width="100%" height="50vh" />
            <OptionSection />
            <AddSection />
        </div>
    )
}

export default Homepage
