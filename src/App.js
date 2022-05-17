import * as THREE from 'three';
import React, { Suspense, useRef, useState } from 'react';
import { extend, Canvas, useFrame, useResource } from 'react-three-fiber';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, DotScreen, Pixelation, BrightnessContrast } from 'react-postprocessing';
import { Html, Text, Icosahedron, useTextureLoader, useCubeTextureLoader, MeshDistortMaterial } from 'drei';
import fonts from './fonts';

const text = "test text";

const opts = {
  font: "Roboto Slab",
  fontSize: 6,
  maxWidth: 300,
};

function MainSphere() {
  const main = useRef()
  // main sphere rotates following the mouse position
  useFrame(({ clock, mouse }) => {
    main.current.rotation.z = clock.getElapsedTime()
    main.current.rotation.y = THREE.MathUtils.lerp(main.current.rotation.y, mouse.x * Math.PI, 0.1)
    main.current.rotation.x = THREE.MathUtils.lerp(main.current.rotation.x, mouse.y * Math.PI, 0.1)
    main.current.position.set(mouse.x, mouse.y, 0);
  })
  return <Icosahedron args={[1, 4]} ref={main} position={[0,0,0]}> 
      <MeshDistortMaterial
        color="#000000"
        radius={1}
        distort={0.4}
        opacity={0.5}
        transparent={true}
        blending={THREE.SubtractiveBlending}
      />
      {/*
      
        blending={THREE.CustomBlending}
        blendEquation={THREE.AddEquation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.OneMinusSrcAlphaFactor}
      */}
  </Icosahedron>
}

function SceneText() {
  return (
    <>
      <Text
        position-z={-18}
        {...opts}
        font={fonts[opts.font]}
        anchorX="center"
        anchorY="middle"
      >
        wieauchimmer
        <MeshBasicMaterial
          color="#ff0000"
          opacity={0.5}
          transparent={true}
          blending={THREE.SubtractiveBlending}
          />
      </Text>
      <MainSphere/>
    </>
  )
}

export default function App() {
    return (
    <Canvas
      camera={{ position: [0, 0, 3] }}>
      <color attach="background" args={['#050505']} />
      {/*<fog color="#161616" attach="fog" near={8} far={30} />*/}
      <ambientLight />
      <Suspense fallback={<Html center>Loading.</Html>}>
        <SceneText />
        <EffectComposer multisampling={0}>
          {/*<DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.2} />
          <Noise opacity={0.03} />
          <Vignette darkness={0.5} />*/}
          <Pixelation />
          {/*<BrightnessContrast contrast={1} />*/}
        </EffectComposer>
        
      </Suspense>
    </Canvas>
  )
}
