/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Model({ objects, playing }) {
  const {huizen, bomen, boten, vliegtuig, speed, wolken} = objects
  const group = useRef()
  const plane = useRef()
  const { nodes, materials } = useGLTF('../../../planet_eindversie.glb')

  useFrame(() => {
    if (playing) {
      group.current.rotation.y += parseFloat(speed)
    }

    if (vliegtuig) {
      plane.current.rotation.z += .01
    }
  })

  return (
    <group ref={group} dispose={null}>
      {/* boten */}
      { boten &&
        <>
          <group position={[-0.29, 0.64, 0.69]} rotation={[0.32, 0.94, 0.47]} scale={[-0.32, -0.08, -0.08]}>
            <mesh geometry={nodes.boat_1.geometry} material={materials.boat} />
            <mesh geometry={nodes.boat_2.geometry} material={materials.muren} />
          </group>
          <group position={[0.73, -0.66, 0.06]} rotation={[0.39, -0.36, -2.25]} scale={[-0.32, -0.08, -0.08]}>
            <mesh geometry={nodes.boat2.geometry} material={materials.boat} />
            <mesh geometry={nodes.boat2_1.geometry} material={materials.muren} />
          </group>
          <group position={[-0.45, 0.09, -0.87]} rotation={[-1.96, 0.74, 0.6]} scale={[-0.32, -0.08, -0.08]}>
            <mesh geometry={nodes.boat3.geometry} material={materials.boat} />
            <mesh geometry={nodes.boat3_1.geometry} material={materials.muren} />
          </group>
        </>
      }

      {/* huizen */}
      { huizen &&
        <>      
          <mesh geometry={nodes.houses_1.geometry} material={materials.muren} />
          <mesh geometry={nodes.houses_2.geometry} material={materials.dak} />
        </>
      }

      {/* bomen */}
      { bomen &&
        <group position={[-0.7, 0.08, 0.76]} rotation={[1.26, 0.2, 0.8]} scale={0.62}>
          <mesh geometry={nodes.trees_1.geometry} material={materials.wood} />
          <mesh geometry={nodes.trees_2.geometry} material={materials.leafs} />
        </group>
      }

      <mesh geometry={nodes.earth_1.geometry} material={materials.water} />
      <mesh geometry={nodes.earth_2.geometry} material={materials.land} />

      {/* viegtuig */}
      {vliegtuig &&
        <group ref={plane} rotation={[-2.99, -0.99, -2.87]} scale={[-0.33, -0.06, -0.06]}>
          <mesh geometry={nodes.airplane_1.geometry} material={materials.muren} />
          <mesh geometry={nodes.airplane_2.geometry} material={materials.dak} />
          <mesh geometry={nodes.airplane_3.geometry} material={materials.glass} />
        </group>
      }

      {/* wolken */}
      {wolken &&
        <mesh geometry={nodes.clouds.geometry} material={materials.cloud} rotation={[-3.1, -0.01, -1.21]} scale={0.22} />
      }

    </group>
  )
}

useGLTF.preload('../../../planet_eindversie.glb')
