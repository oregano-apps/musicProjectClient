import React from 'react'

function MiniSection({text}) {
    return (
        <div class="miniSection">
            <div className="miniSection_right"></div>
            <div className="miniSection_left">
                <h2 className="miniSection_title">{text}</h2>
            </div>
            
        </div>
    )
}

export default MiniSection 
