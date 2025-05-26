import React, { Suspense, useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, AdaptiveDpr, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery } from 'react-responsive';
import { ModelLoader } from '../3d/ModelLoader';
import { modelManager } from '../utils/modelManager';
import { three3DHelpersUtil } from '../utils/three-helpers';
import MinimalLayout from '../layout/MinimalLayout';
import './src/styles/pages/model-showcase.css';

interface ModelShowcasePageProps {
}

interface ModelData {
  title: string;
  description: string;
  modelPath: string;
  variants?: { name: string; thumbnail: string; cameraPosition: [number, number, number] }[];
  specifications?: { [key: string]: string };
}

const ModelShowcasePage: React.FC<ModelShowcasePageProps> = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const [modelData, setModelData] = useState<ModelData | null>(null);
  const [activeVariant, setActiveVariant] = useState<string | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5]);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        // TODO replace fake fetch with actual API
        const fakeFetch = (id:string):Promise<ModelData>=>{
          return new Promise((resolve,reject)=>{
            setTimeout(()=>
            {
              const hardCodedValue:ModelData =   {
                title: `Amazing 3D Model ${id}`,
                description: 'Explore the stunning details of this interactive 3D model.',
                modelPath: '/models/default.glb',
                variants: [
                  { name: 'Default View', thumbnail: '/images/thumb1.png', cameraPosition: [0, 0, 5] },
                  { name: 'Side View', thumbnail: '/images/thumb2.png', cameraPosition: [5, 0, 0] },
                  { name: 'Top View', thumbnail: '/images/thumb3.png', cameraPosition: [0, 5, 0] },
                ],
                specifications: {
                  'Geometry': '10k triangles',
                  'Textures': '2048x2048',
                  'Materials': 'PBR'
                }
              }
              resolve(hardCodedValue)
            },500)
          })
        }
        const data = await fakeFetch(modelId)
        setModelData(data);
      } catch (error) {
        console.error('Failed to fetch model data', error);
      }
    };

    fetchModelData();
  }, [modelId]);

  useEffect(() => {
    if (modelData?.variants && modelData.variants.length > 0) {
      setActiveVariant(modelData.variants[0].name);
      setCameraPosition(modelData.variants[0].cameraPosition);
    }
  }, [modelData]);

  useEffect(() => {
    if (camera) {
      camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    }
  }, [camera, cameraPosition]);

  const handleVariantSelect = (variantName: string, cameraPos: [number, number, number]) => {
    setActiveVariant(variantName);
    setCameraPosition(cameraPos);
  };

  const renderVariantThumbnails = () => {
    return modelData?.variants?.map((variant) => (
      <div
        key={variant.name}
        className={`thumbnail ${activeVariant === variant.name ? 'active' : ''}`}
        onClick={() => handleVariantSelect(variant.name, variant.cameraPosition)}
        aria-label={`Select ${variant.name}`}
        role="button"
        tabIndex={0}
      >
        <img src={variant.thumbnail} alt={variant.name} />
        <p>{variant.name}</p>
      </div>
    ))
  }

  return (
    <MinimalLayout>
      <div className="model-showcase-container">
        {modelData ? (
          <>
            <section className="model-viewer">
              <Canvas shadows dpr={[1, 2]} camera={{ position: cameraPosition, fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={0.7} castShadow />
                <group ref={groupRef}>
                  <ModelLoader modelPath={modelData.modelPath} castShadow receiveShadow />
                  <OrbitControls/>
                </group>
              </Canvas>
            </section>

            <section className="model-info">
              <h2 className="text-2xl font-bold">{modelData.title}</h2>
              <p className="description">{modelData.description}</p>
              
              {modelData.specifications && (
                <div className="specifications">
                  <h3>Specifications</h3>
                  <ul>
                    {Object.entries(modelData.specifications).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            <section className="model-customization">
              <h3>View Variants</h3>
              <div className="variant-gallery">
                {renderVariantThumbnails()}
              </div>
            </section>

            <section className="call-to-action">
              <a href="#" className="download-link" aria-label={`Download ${modelData.title}`}>
                Download Model
              </a>
            </section>
          </>
        ) : (
          <div className="loading-message">Loading model...</div>
        )}
      </div>
    </MinimalLayout>
  );
};

export default ModelShowcasePage;