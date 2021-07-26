import React from "react";

function Light() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 3, 0]} intensity={2.5} />
    </>
  );
}

export default Light;
