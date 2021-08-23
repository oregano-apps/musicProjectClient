import React, {useEffect, useRef, useState, useContext} from 'react'
import {io} from 'socket.io-client'
import EditIcon from '@material-ui/icons/Edit';
import {Context} from './../../context/Context'
import FirstButton from './../../components/firstButton/FirstButton'
import AlbumIcon from '@material-ui/icons/Album';
import DeleteIcon from '@material-ui/icons/Delete';
import { Avatar } from '@material-ui/core';

function OpenParty() {
    const socket = useRef();
    const {user} = useContext(Context)
    const [socketUser, setSocketUser] = useState({})
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState('Oregano Room')
    const [code, setCode] = useState('00000000')
    const [avatarSeed, setAvatarSeed] = useState('')
    const [connectedUser, setConnectedUsers] = useState([{name: 'almog674', seed: avatarSeed}, {name: 'roee90', seed: avatarSeed / 2}])

    const changeRoomName = () => {
        socket.current.emit('changeRoomName', {title, code})
        socket.current.on('newRoomData', newData => {
            setCode(newData.code)
            setTitle(newData.title)
        })
        setEdit(false)
    }

    useEffect(() => {
        setAvatarSeed(Math.floor(Math.random() * 5000))
    }, [])


    useEffect(() => {
        const openParty = async () => {
            socket.current = io("ws://localhost:8900");
            socket.current.emit('openParty', user.username)
            await socket.current.emit('requestForUserData', user.username)
            socket.current.on('getUserData', socketData => setSocketUser(socketData))
        }
        openParty()    
    }, [])


    useEffect(() => {
        if (!socketUser.room) return
        console.log(socketUser)
        setCode(socketUser.room.code)
    }, [socketUser])

    const startParty = () => {
        console.log('almog')
    }

    return (
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
                    {edit ? (
                        <>
                            <input value={title} maxLength="20" onChange={e => setTitle(e.target.value)} className="openPartyTitleInput"  />
                            <button onClick={e => changeRoomName()} className="openPartyTitleSubmit">Submit</button>
                        </>
                    ) : (
                        <>
                            <h2 className="openPartyTitle">{title}</h2>
                            <EditIcon onClick={e => setEdit(true)} className="openPartyIcon" />
                        </>
                    )}
                    
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
                                <Avatar src={`https://avatars.dicebear.com/api/human/${userInfo.seed}.svg`} alt="" className="openPartyItemImg" />
                                <span className="openPartyItemName">{userInfo.name}</span>
                                <DeleteIcon className="openPartyItemTrash" />
                            </div>
                        ))
                    }
                    
                </div>
            </div>
            <div className="openPartyBottom">
                <FirstButton color="#6F5BA7" colorTwo="#fff" text="Start Now!" func={startParty} icon={<AlbumIcon style={{color: "#6F5BA7", height: '2.2rem', width: '2.2rem'}} />}  />
            </div>
        </div>
    )
}

export default OpenParty
