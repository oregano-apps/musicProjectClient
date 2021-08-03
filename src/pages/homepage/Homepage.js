import React from 'react'
import Topbar from './../../components/Topbar/Topbar'
import TitleSection from '../../components/titleSection/TitleSection'
import JoinSection from '../../components/joinSection/JoinSection'

function Homepage() {
    return (
        <div class="homepage">
            <Topbar />
            <TitleSection />
            <JoinSection />
        </div>
    )
}

export default Homepage
