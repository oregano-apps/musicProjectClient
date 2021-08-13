import React, {useRef, useEffect} from 'react'
import * as THREE from 'three'

function PlaylistCardButton({position, args, scale}) {
    const ring = useRef()

    useEffect(() => {
        console.log(ring.current)
    })
    return (
        <>
            <mesh rotation={[1.5,0,0]} ref={ring} scale={scale}  position={position}>
                <cylinderBufferGeometry args={args} attach='geometry' />
                <meshStandardMaterial attach='material' color = 'red' />
            </mesh>
        </>
    )
}

export default PlaylistCardButton
