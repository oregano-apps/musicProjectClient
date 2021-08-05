import React, {useEffect, useContext} from 'react'
import Topbar from './../../components/Topbar/Topbar'
import TitleSection from '../../components/titleSection/TitleSection'
import OptionSection from '../../components/optionsSection/OptionSection'
import SectionGap from '../../components/sectionGap/SectionGap'
import AddSection from '../../components/addSection/AddSection'
import useAuth from '../../utils/useAuth'
import {spotifyLoginCall} from './../../utils/apiCalls'
import {Context} from './../../context/Context'

function Homepage({code}) {
    const spotifyToken = useAuth(code)
    const { dispatch, user, token } = useContext(Context);

    useEffect(() => {
        if (!spotifyToken) return
        spotifyLoginCall(spotifyToken,user, token,  dispatch)
    }, [spotifyToken])

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
