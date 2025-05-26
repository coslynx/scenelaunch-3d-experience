import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { use3DAnimation } from '../../hooks/use3DAnimation';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ModelLoader } from '../3d/ModelLoader';
import { three3DHelpersUtil } from '../../utils/three-helpers';
import { AdaptiveToneMappingPass } from 'three-stdlib';
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing';
import { useTheme } from '../../context/ThemeContext';

interface LandingHeroProps {
  modelUrl: string;
  headline: string;
  subheadline: string;
}

const LandingHero: React.FC<LandingHeroProps> = ({
  modelUrl,
  headline,
  subheadline,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, camera, gl } = useThree();
  const { animate } = use3DAnimation();
  const { scrollY } = useScrollAnimation(groupRef);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (groupRef.current) {
      scene.add(groupRef.current);
    }
    return () => {
      if (groupRef.current) {
        scene.remove(groupRef.current);
      }
    };
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(Date.now() / 1000) * 0.1;
    }
    camera.position.z = 5 + scrollY * 0.05;
  });

  return (
    <section className="relative w-full h-screen bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold mb-4">{headline}</h1>
        <p className="text-lg">{subheadline}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Start Free Trial
        </button>
      </div>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.7} castShadow />
        <group ref={groupRef}>
          <ModelLoader modelPath="MODEL_URL_HERE" />
        </group>
      </Canvas>
    </section>
  );
};

export default LandingHero;