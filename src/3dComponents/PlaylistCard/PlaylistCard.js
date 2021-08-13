import React, {useRef, useEffect} from 'react'
import PlaylistCardButton from './PlaylistCardButton'


function PlaylistCard() {

    let playlistRef= useRef()

    useEffect(() => {
        console.log(playlistRef.current)
    }, [])
    return (
        <>
            <mesh name="playlistCard" scale={[2.5,4.5, 0.2]} position={[0,0.4,0]} ref={playlistRef}>
                <boxBufferGeometry attach='geometry' />
                <meshStandardMaterial attach='material' color = '#303439' />
            </mesh>
            <PlaylistCardButton args={[0.2, 0.2, 0.05, 40]} position={[0.9, 2.3, 0.1]}/>
        </>  
    )
}

export default PlaylistCard
