import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {OrbitControls} from '@react-three/drei';
import {useGLTF} from '@react-three/drei';
import {EffectComposer, Bloom, SSAO} from '@react-three/postprocessing';
import {FXAA} from 'three-stdlib';
import {use3DAnimation} from '../../hooks/use3DAnimation';
import {use3DInteraction} from '../../hooks/use3DInteraction';
import {threeHelpersUtil} from '../../utils/three-helpers';
import {useTheme} from '../../context/ThemeContext';
import {ModelLoader} from './ModelLoader';
import {useScrollAnimation} from '../../hooks/useScrollAnimation';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';

interface AdvancedSceneProps {
modelPath: string;
}

const AdvancedScene: React.FC<AdvancedSceneProps> = ({modelPath}) => {
const groupRef = useRef<THREE.Group>(null);
const {scene, camera, gl, size} = useThree();
const {createTimeline} = use3DAnimation();
const {handleClick, handlePointerOver, handlePointerOut} = use3DInteraction();
const {isDarkMode} = useTheme();
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);
const [enableBloom, setEnableBloom] = useState(true);
const [enableSSAO, setEnableSSAO] = useState(true);
const [lightIntensity, setLightIntensity] = useState(0.7);
const stats = useRef<any>(null);

useEffect(() => {
if (gl) {
stats.current = new (require('three/examples/jsm/libs/stats.module'))().default();
document.body.appendChild(stats.current.dom);
stats.current.dom.style.cssText = 'position:absolute;top:0;left:0;';
gl.domElement.parentNode?.appendChild(stats.current.dom);
setTimeout(() => {
stats.current.dom.remove();
stats.current = null;
}, 10000);
}
}, [gl]);

const animateScene = useCallback(() => {
if (groupRef.current) {
gsap.to(groupRef.current.rotation, {
duration: 2,
y: Math.PI * 2,
repeat: -1,
ease: 'linear'
});
}
}, []);

const {nodes, materials, animations} = useGLTF(modelPath) as any;
useEffect(() => {
if (nodes && materials) {
setLoading(false);
animateScene();
}
}, [nodes, materials, animateScene]);

useFrame(() => {
stats.current?.update();
});

return (
<group>
<ambientLight intensity={0.3}/>
<directionalLight
position={[5, 5, 5]}
intensity={lightIntensity}
castShadow
shadow-mapSize-width={1024}
shadow-mapSize-height={1024}
/>
<Bloom
intensity={enableBloom ? 0.8 : 0}
luminanceThreshold={0.9}
luminanceSmoothing={0.9}
/>
<SSAO
intensity={enableSSAO ? 0.4 : 0}
radius={0.1}
aoOnly={false}
kernelSize={16}
distanceAttenuation={true}
/>
<mesh castShadow position={[0, -1, 0]}>
<planeGeometry args={[10, 10]}/>
<meshStandardMaterial color="white"/>
</mesh>
<ModelLoader modelPath={modelPath}/>
<KeyboardControls setEnableBloom={setEnableBloom} setEnableSSAO={setEnableSSAO} setLightIntensity={setLightIntensity}/>
</group>
);
};

const KeyboardControls = ({setEnableBloom, setEnableSSAO, setLightIntensity}) => {
const [gui, setGui] = useState<GUI|null>(null);
useEffect(() => {
const newGui = new GUI();
newGui.domElement.style.cssText = 'position:absolute;top:0;left:0;';
document.body.appendChild(newGui.domElement);

setGui(newGui);
return () => {
document.body.removeChild(newGui.domElement);
};
}, []);

useEffect(() => {
if (!gui) return;

const config = {
bloom: true,
ssao: true,
light: 0.7
};

const bloomFolder = gui.addFolder('Bloom');
bloomFolder.add(config, 'bloom').onChange((value) => {
setEnableBloom(value);
});
bloomFolder.open();

const ssaoFolder = gui.addFolder('SSAO');
ssaoFolder.add(config, 'ssao').onChange((value) => {
setEnableSSAO(value);
});
ssaoFolder.open();

const lightFolder = gui.addFolder('Light');
lightFolder.add(config, 'light', 0, 1).onChange((value) => {
setLightIntensity(value);
});
lightFolder.open();

return () => {
gui.destroy();
};
}, [setEnableBloom, setEnableSSAO, setLightIntensity, gui]);
return null;
};

export default AdvancedScene;