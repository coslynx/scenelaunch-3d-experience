import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { use3DAnimation } from '../../hooks/use3DAnimation';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { use3DInteraction } from '../../hooks/use3DInteraction';
import { threeHelpersUtil } from '../../utils/three-helpers';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing';
import { useTheme } from '../../context/ThemeContext';

interface ScrollSceneProps {
  modelPath: string;
  animationConfig?: any;
  onModelLoad?: (model: THREE.Group) => void;
  environmentMap?: string;
  cameraPosition?: [number, number, number];
  cameraRotation?: [number, number, number];
  intensity?: number;
}

const ScrollScene: React.FC<ScrollSceneProps> = ({
  modelPath,
  animationConfig,
  onModelLoad,
  environmentMap,
  cameraPosition = [0, 0, 5],
  cameraRotation = [0, 0, 0],
  intensity = 0.5,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, camera, gl } = useThree();
  const { createTimeline } = use3DAnimation();
  const { scrollY } = useScrollAnimation(groupRef);
  const { handleClick, handlePointerOver, handlePointerOut } = use3DInteraction();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (groupRef.current) {
      scene.add(groupRef.current);
    }
    return () => {
      if (groupRef.current) {
        scene.remove(groupRef.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scene]);

  const { nodes, materials, animations } = useGLTF(modelPath) as any;

  useEffect(() => {
    if (nodes && materials) {
      setLoading(false);
      onModelLoad?.(groupRef.current as any);
    }
  }, [nodes, materials, onModelLoad]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
    camera.position.z = 5 + scrollY * 0.05;
  });

  const handleModelClick = useCallback(
    (event: THREE.Intersection & { nativeEvent: MouseEvent }) => {
      event.stopPropagation();
      handleClick(event);
    },
    [handleClick]
  );

  const handleModelPointerOver = useCallback(
    (event: THREE.Intersection) => {
      event.stopPropagation();
      setHovered(true);
      document.body.style.cursor = 'pointer';
      handlePointerOver(event);
    },
    [handlePointerOver]
  );

  const handleModelPointerOut = useCallback(
    (event: THREE.Intersection) => {
      event.stopPropagation();
      setHovered(false);
      document.body.style.cursor = 'auto';
      handlePointerOut(event);
    },
    [handlePointerOut]
  );

  return (
    <section className="relative w-full h-screen bg-gray-100 overflow-hidden">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, rotation: cameraRotation, fov: 50 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.7} castShadow />
        <group ref={groupRef} onClick={handleModelClick} onPointerOver={handleModelPointerOver} onPointerOut={handleModelPointerOut}>
          <ModelLoader modelPath={modelPath} />
        </group>
        <OrbitControls />
      </Canvas>
    </section>
  );
};

export default ScrollScene;