import React, {Suspense, useContext } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import PlaylistCard from '../../3dComponents/PlaylistCard/PlaylistCard'
import Orbit from './../../3dComponents/OrbitControls'
import CameraControls from '../../3dComponents/CameraControls';
import Header from '../../3dComponents/Header'
import {PlaylistContext} from './../../context/playlistContext' 
function Playlist() {

    const {playlist, dispatch} = useContext(PlaylistContext)

    const renderPlaylist = () => {
        return (
            <>
                
            </>
        )
    }

    return (
        <div className="playlist">
            <Canvas>
                
                <PlaylistCard  />
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 4, 1]} intensity={3} />
                <Orbit />
                <CameraControls />
                <Suspense fallback={null}>
                    <Header hAlign="center" position={[-1, 2.2, 0]} children="PLAYLIST" />
                </Suspense>
                (
                    renderPlaylist
                )
            </Canvas>
        </div>
    )
}

export default Playlist
