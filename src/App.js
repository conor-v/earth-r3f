import './App.css';
import { Canvas } from "@react-three/fiber"
import { Environment, useGLTF, OrbitControls, Loader } from '@react-three/drei'
import React, { Suspense } from "react"

const Earth = () => {
  const { scene } = useGLTF('/planet.glb')
  return <primitive object={scene}/>
}

function App() {
  return (
    <>
      <Canvas camera={{ fov: 50 }}>
        <color attach="background" args={["#ffbf40"]} />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Suspense>
          <Environment preset='sunset' />
          <Earth/>
        </Suspense>
        <OrbitControls/>
      </Canvas>


      <Loader/>
    </>
  );
}

export default App;
