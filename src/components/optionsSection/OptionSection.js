import React from 'react'
import MiniSection from '../miniSection/MiniSection'
import SectionGap from '../sectionGap/SectionGap'

function OptionSection() {
    return (
        <div class="optionSection">
            <MiniSection text='Join section' />
            <SectionGap color="#000" width="100%" height="50vh"  />
            <MiniSection text='Create section' />
            <SectionGap color="#000" width="100%" height="50vh" /> 
            <MiniSection text='Hear Music' />
        </div>
    )
}

export default OptionSection
