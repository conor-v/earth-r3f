import './App.css';
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Loader } from '@react-three/drei'
import React, { Suspense, useEffect, useState } from "react"
import Model from "./comps/Planet2"

// const Earth = () => {
//   const { scene } = useGLTF('/planet.glb')
//   return <primitive object={scene}/>
// }

const defaultObjects =  {
  huizen: false,
  bomen: false,
  boten: false,
  vliegtuig: false
}

function App() {
  const [objects, setObjects] = useState(defaultObjects)
  const [playing, setPlaying] = useState(false)
  const [bgColor, setBgColor] = useState('#ffbf40')
  const [audio] = useState(new Audio("/music.mp3"))
  const {huizen, bomen, boten, vliegtuig, } = objects

  audio.volume = 0.2;

  const handleDisplay = (name, value) => {
    setObjects({ ...objects, [name]: !value });
  };

  const handleBgColor = (event) => {
    const {value} = event.target
    setBgColor(value)
  }

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
      <Canvas camera={{ fov: 50 }} shadows>
        <color attach="background" args={[bgColor]} />
        <spotLight position={[10, 10, 10]} intensity={1}/>
        <directionalLight
  intensity={0.5}
  castShadow  shadow-mapSize-height={512}
  shadow-mapSize-width={512}
/>
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

        <div>
          <p>BG COLOR</p>
          <input type='color' onChange={handleBgColor}/>
        </div>
      </div>
    </>
  );
}

export default App;
