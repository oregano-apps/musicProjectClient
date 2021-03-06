import React from 'react'

function Topbar() {

    

    return (
        <div class="topbar">
                <div className="topbar_left">
                    <img src="/images/noAvatar.png" alt="" className="topbar_user_image" />
                </div>
                <div className="topbar_middle">
                    <div className="topbar_left_circle">
                        <img src="/images/ogerano.png" alt="" className="topbar_logo" />
                    </div>
                    <h1 className="topbar_title">regano Music</h1>
                </div>
                <div className="topbar_right">
                    <button className="topbar_logout_button">Logout</button>
                </div>
        </div>
    )
}

export default Topbar
