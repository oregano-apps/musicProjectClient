import React, {useEffect, useRef, useState, useContext} from 'react'
import {Context} from './../../context/Context'
import FirstButton from './../../components/firstButton/FirstButton'
import AlbumIcon from '@material-ui/icons/Album';
import socketFunctions from './../../utils/socketFunctions'
import Popup from '../../components/popup/Popup';
import { Avatar } from '@material-ui/core';
import {io} from 'socket.io-client'
import {delay} from '../../utils/wait'

const JoinParty = () => {
  const socket = useRef();
  const {user} = useContext(Context)
  const [connected, setConnected] = useState(0)
  const avatarSeed = useRef(null)
  const [title, setTitle] = useState('Oregano Room')
  const [connectedUser, setConnectedUsers] = useState([])

  const [code, setCode] = useState("")
  const [popupConfig, setPopupConfig] = useState({display: false, message: '', type: ''})


  const getAvatarSeed = () => {
    avatarSeed.current = (Math.floor(Math.random() * 5000))
  }

  const handle_join_party_response = (response) => {
        setConnected(1)
        socketFunctions.getNewRoomData(response, setCode, setTitle)
        setConnectedUsers(response.users)
        set_popup_active("success", `You have joined the party at ${response.roomName}`)

  }

  const set_popup_active = async (type, message) => {
    setPopupConfig({display: true, message: message, type: type})
    await delay(1500)
    setPopupConfig({display: false, message: message, type: type})
  }

  const join_to_party = () => {
    socket.current = io("ws://localhost:8900");

    // When open the party
    getAvatarSeed()
    socket.current.emit('joinParty', {userData: user, code: code})

    socket.current.on("error", async (error_message) => await set_popup_active("error", error_message))

    // await for the response
    socket.current.on('joinPartyResponse', response => handle_join_party_response(response))
  
    // Listen to the start of a party
    socket.current.on('startParty', response => {setConnected(2)
    console.log("STATTTTTTTTTTTTTTTTTTTTTT")})

}

  return (
    <div class="join_party">
         <Popup classes={popupConfig.display ? "popup popupActive" : 'popup'} type={popupConfig.type} message={popupConfig.message} />
         <div class="openPartyContainer-fluid">
            <div class="openPartyBackground">
                <div class="openPartyCube"></div>
                <div class="openPartyCube"></div>
                <div class="openPartyCube"></div>
                <div class="openPartyCube"></div>
                <div class="openPartyCube"></div>
            </div>
        </div>
       
        
        {connected == 2 ? (
            <h1>Hello</h1>
        
        ) : connected == 0 ?(
            <div className="join_party_container">
            <div className="join_party_container_top">
                <h1 className="join_party_title">Join to party</h1>
            </div>
            <div className="join_party_container_middle">
                <input type="text" onChange={(e) => {setCode(e.target.value)}} value={code} className="join_party_code_input" />        
            </div>
            <div className="join_party_container_bottom">
                <FirstButton func={join_to_party} color="#6F5BA7" colorTwo="#fff" text="Join now!" icon={<AlbumIcon style={{color: "#6F5BA7", height: '2.2rem', width: '2.2rem'}} />}  />
            </div>
        </div>
        ) : (

            <div class="openParty">
            <div class="openPartyContainer-fluid">
                <div class="openPartyBackground">
                <div class="openPartyCube"></div>
                <div class="openPartyCube"></div>
                <div class="openPartyCube"></div>
                <div class="openPartyCube"></div>
                <div class="openPartyCube"></div>
                </div>
            </div>

            <div className="openPartyTop">
                <div className="openPartyTitleContainer">
                    <h2 className="openPartyTitle">{title}</h2>
                </div>
                <div className="openPartyTitleContainer">
                    <h2 className="openPartyCode">{code}</h2>
                </div>
            </div>
            <div className="openPartyMiddle">
                <h2 className="openPartyMiddleTitle">{connectedUser.length} users connected</h2>
                <div className="openPartyUsers">
                    {
                        connectedUser.map(userInfo => (
                                <div className="openPartyItemContainer">
                                <Avatar src={`https://avatars.dicebear.com/api/human/${userInfo.avatarSeed}.svg`} alt="" className="openPartyItemImg" />
                                <span className="openPartyItemName">{userInfo.username}</span>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
            </div>


        )
        }

    </div>
  )
}

export default JoinParty