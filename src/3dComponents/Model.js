import React from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

function Model(props) {
  const model = useLoader(GLTFLoader, props.path);
  console.log(props)

  let mixer;
  if (model.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.recieveShadow = true;
      child.material.side = THREE.FrontSide;
    }
  });

  useFrame((scene, delta) => {
    mixer?.update(delta);
  });
  return <primitive ref={props.refrence} object={model.scene} position={props.position} scale={props.scale}></primitive>;
}

export default Model;
