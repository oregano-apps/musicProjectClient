import { useFrame } from '@react-three/fiber'
import state from './PlaylistCard/state'

const CameraControls = ({ }) => {

    useFrame(({ camera, scene }) => {
        scene.orbitControls.enableZoom = false
        scene.orbitControls.maxAzimuthAngle = 1
        scene.orbitControls.minAzimuthAngle = -1
        if (state.activeMesh.name !== state.activeMeshName) {
            state.activeMesh = scene.getObjectByName(
                state.activeMeshName
            ) || {}
        }
        if (state.shouldUpdate) {
            camera.position.lerp(state.cameraPos,0.1)
            scene.orbitControls.target.lerp(state.target,0.1)
            scene.orbitControls.update()
            const diff = 
                camera.position.clone()
                .sub(state.cameraPos).length()
            if (diff < 0.1) state.shouldUpdate = false
        }
    })
    return (
        null
    )
}

export default CameraControls