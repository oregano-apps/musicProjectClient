import React, { useRef } from "react";
import { Suspense } from "react";
import { unmountComponentAtNode, useFrame } from "@react-three/fiber";
import Model from "./Model";
import ReactDOM from "react-dom";

function MusicNote(props) {
  console.log(props);
  const note = useRef();

  useFrame((state) => {
    if (note.current) {
      if (note.current.position.y > 5) {
        note.current.position.y = -7;
      }
      note.current.position.y += 0.05;
    }
  });
  return (
    <>
      <Suspense fallback={null}>
        <Model
          refrence={note}
          path={props.path}
          position={props.position}
          //   scale={new Array(3).fill(0.01)}
        />
      </Suspense>
    </>
  );
}

export default MusicNote;
