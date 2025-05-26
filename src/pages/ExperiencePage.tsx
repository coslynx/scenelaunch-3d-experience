import React, {Suspense, useRef, useEffect, useState, useCallback, useMemo} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {OrbitControls, AdaptiveDpr, Html} from '@react-three/drei';
import {useMediaQuery} from 'react-responsive';
import {AdvancedScene} from '../3d/AdvancedScene';
import MinimalLayout from '../layout/MinimalLayout';

interface ExperiencePageProps {}

const ExperiencePage:React.FC<ExperiencePageProps>=()=>{
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);

return(
<MinimalLayout>
<div className="experience-container">
<section className="immersive-experience">
<Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
<Suspense fallback={<Html center><p>Loading Experience...</p></Html>}>
<AdvancedScene modelPath="/models/scene.glb" />
<OrbitControls/>
</Suspense>
</Canvas>
</section>
</div>
</MinimalLayout>
);
};

export default ExperiencePage;