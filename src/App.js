import './App.css';
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Loader } from '@react-three/drei'
import React, { Suspense, useEffect, useState } from "react"
import Model from "./comps/Planet"

// const Earth = () => {
//   const { scene } = useGLTF('/planet.glb')
//   return <primitive object={scene}/>
// }

const defaultObjects =  {
  huizen: false,
  bomen: false,
  boten: false,
  vliegtuig: false,
}

function App() {
  const [objects, setObjects] = useState(defaultObjects)
  const [playing, setPlaying] = useState(false)
  const [audio] = useState(new Audio("/music.mp3"))
  const {huizen, bomen, boten, vliegtuig, } = objects

  audio.volume = 0.2;

  const handleDisplay = (name, value) => {
    setObjects({ ...objects, [name]: !value });
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing])

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [])

  return (
    <>
      <Canvas camera={{ fov: 50 }}>
        <color attach="background" args={["#ffbf40"]} />
        <spotLight position={[10, 10, 10]} intensity={1} />
        <Suspense>
          <Environment preset='sunset' />
          <Model objects={objects} playing={playing}/>
        </Suspense>
        <OrbitControls/>
      </Canvas>


      <Loader/>

    <div style={{position: 'absolute'}}>
        <div>
          <p>DISPLAY</p>
          <button onClick={() => handleDisplay('huizen', huizen)}>huizen</button>
          <button onClick={() => handleDisplay('bomen', bomen)}>bomen</button>
          <button onClick={() => handleDisplay('boten', boten)}>boten</button>
          <button onClick={() => handleDisplay('vliegtuig', vliegtuig)}>vliegtuig</button>
        </div>

        <div>
          <p>AUDIO</p>
          <button onClick={() => setPlaying(!playing)}>{playing ? 'pauze' : 'play'}</button>
        </div>
      </div>
    </>
  );
}

export default App;
