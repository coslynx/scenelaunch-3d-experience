import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { use3DAnimation } from '../../hooks/use3DAnimation';
import { threeHelpersUtil } from '../../utils/three-helpers';
import { useTheme } from '../../context/ThemeContext';

interface ThreeSceneProps {
  cameraPosition?: [number, number, number];
  fogColor?: string;
  backgroundColor?: string;
  intensity?: number;
}

interface ThreeSceneContextType {
  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  quality: 'low' | 'medium' | 'high';
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
}

const ThreeSceneContext = React.createContext<ThreeSceneContextType | undefined>(undefined);

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  cameraPosition = [0, 0, 5],
  fogColor = '#cccccc',
  backgroundColor = '#ffffff',
  intensity = 0.5,
  children
}) => {
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const { gl } = useThree();
  const { isDarkMode } = useTheme();

  const setThreeJsConfig=useCallback(()=>{
    gl.physicallyCorrectLights = true;
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1;
  },[gl])

  useEffect(() => {
    setThreeJsConfig();
    if (sceneRef.current) {
      sceneRef.current.fog = new THREE.Fog(fogColor, 0, 10);
      sceneRef.current.background = new THREE.Color(backgroundColor);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, intensity);
    sceneRef.current.add(ambientLight);

    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
      if (cameraRef.current) {
        cameraRef.current.clear();
      }
    };
  }, [cameraPosition, fogColor, backgroundColor, intensity, isDarkMode, gl, setThreeJsConfig]);

  const contextValue = useMemo<ThreeSceneContextType>(() => ({
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: gl.domElement.getContext('webgl') as THREE.WebGLRenderer,
    quality,
    setQuality,
  }), [gl, quality]);

  return (
    <ThreeSceneContext.Provider value={contextValue}>
      {children}
    </ThreeSceneContext.Provider>
  );
};

export const useThreeScene = (): ThreeSceneContextType => {
  const context = React.useContext(ThreeSceneContext);
  if (!context) {
    throw new Error("useThreeScene must be used within a ThreeScene");
  }
  return context;
};

export default ThreeScene;