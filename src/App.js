import './App.css';
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Loader } from '@react-three/drei'
import React, { Suspense, useEffect, useState } from "react"
import Model from "./comps/Planet_eindversie"

// const Earth = () => {
//   const { scene } = useGLTF('/planet.glb')
//   return <primitive object={scene}/>
// }

const defaultObjects =  {
  huizen: false,
  bomen: false,
  boten: false,
  vliegtuig: false,
  wolken: false,
  speed: 0.01
}

function App() {
  const [objects, setObjects] = useState(defaultObjects)
  const [playing, setPlaying] = useState(false)
  const [bgColor, setBgColor] = useState('#ffbf40')
  const [audio] = useState(new Audio("/music.mp3"))
  const {huizen, bomen, boten, vliegtuig, speed, wolken } = objects

  audio.volume = 0.2;

  const handleDisplay = (name, value) => {
    setObjects({ ...objects, [name]: !value });
  };

  const handleBgColor = (event) => {
    const {value} = event.target
    setBgColor(value)
  }

  const handleSpeed = (event) => {
    const {name, value} = event.target
    setObjects({ ...objects, [name]: value });
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
    <section className='content_container'>
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

      <div>
        <div>
          <p>DISPLAY</p>
          <button onClick={() => handleDisplay('huizen', huizen)}>huizen</button>
          <button onClick={() => handleDisplay('bomen', bomen)}>bomen</button>
          <button onClick={() => handleDisplay('boten', boten)}>boten</button>
          <button onClick={() => handleDisplay('vliegtuig', vliegtuig)}>vliegtuig</button>
          <button onClick={() => handleDisplay('wolken', wolken)}>wolken</button>
        </div>

        <div>
          <p>AUDIO</p>
          <button onClick={() => setPlaying(!playing)}>{playing ? 'pauze' : 'play'}</button>
          {playing &&
          <div>
            <p>Rotation speed world:</p>
            <input type="range" min={0} max={.1} step={.01} onChange={handleSpeed} name="speed" value={speed} />
            <p>{speed}</p>
          </div>
          }
        </div>

        <div>
          <p>BG COLOR</p>
          <input type='color' onChange={handleBgColor}/>
        </div>
      </div>
    </section>
  );
}

export default App;
