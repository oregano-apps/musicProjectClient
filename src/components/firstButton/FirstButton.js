import React from 'react'

function FirstButton({color, colorTwo, text, icon, func}) {
    return (
        <div onClick={func ? func : null}>
             <button style={{backgroundColor: color, color: colorTwo}} type="submit" className="firstButton_button">
                <div style={{backgroundColor: colorTwo, color: color}} className="firstButton_buttonLeft">
                    {icon}
                </div>
                <div className="firstButton_buttonRight" >
                    <p className="firstButton_buttonRightText">{text}</p>
                </div>
            </button>
        </div>
    )
}

export default FirstButton
