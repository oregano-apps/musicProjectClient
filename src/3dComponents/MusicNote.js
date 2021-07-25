import React from "react";
import { Suspense } from "react";
import Model from "./Model";

function MusicNote() {
  return (
    <>
      <Suspense fallback={null}>
        {/* position={[0, 4, 0]}
        dims={[3, 2, 6]}
        offset={[0, -0.4, 0.8]} */}
        <Model
          path="/3dmodels/test.glb"
          //   scale={new Array(3).fill(0.01)}
        />
      </Suspense>
      {/* <group rotation={[0, Math.PI, 0]}>
        <Model path="mech_drone/scene.gltf" scale={new Array(3).fill(0.01)} />
      </group> */}
    </>
  );
}

export default MusicNote;
