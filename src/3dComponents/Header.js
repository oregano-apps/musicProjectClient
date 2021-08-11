import * as THREE from 'three'
import React, { useMemo, useRef, useLayoutEffect} from 'react'
import { useLoader } from '@react-three/fiber'

export default function HEADER({ children, vAlign = 'center', hAlign = 'center', size = 1.5, color = '#000000', ...props }) {
  const font = useLoader(THREE.FontLoader, '/3dmodels/bold.blob')
  const config = useMemo(
    () => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
    [font]
  )
  const textRef = useRef()
  useLayoutEffect(() => {
    const size = new THREE.Vector3()
    textRef.current.geometry.computeBoundingBox()
    textRef.current.geometry.boundingBox.getSize(size)
  }, [children])
  return (
    <group {...props} scale={[0.005,0.005,0.005]}>
      
        <mesh ref={textRef}>
          <textGeometry args={[children, config]} />
          <meshNormalMaterial />
        </mesh>
    </group>
  )
}