import React, {Suspense, useRef, useEffect, useState, useMemo} from 'react'
import {useLoader, useThree} from '@react-three/fiber'
import {GLTF, DRACOLoader, KTX2Loader, useGLTF} from '@react-three/drei'
import * as THREE from 'three'
import {threeHelpersUtil} from '../../utils/three-helpers'
import {modelManager} from '../../utils/modelManager'
import {useMediaQuery} from 'react-responsive'
import {useAdaptiveDpr} from '@react-three/drei'

interface ModelLoaderProps {
  modelPath: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  castShadow?: boolean
  receiveShadow?: boolean
}

const ModelLoader: React.FC<ModelLoaderProps> = ({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = false,
}) => {
  const meshRef = useRef<THREE.Group>(null)
  const [model, setModel] = useState<THREE.Group | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const isMobile = useMediaQuery({maxWidth: 768})
  const isTablet = useMediaQuery({minWidth: 769, maxWidth: 1024})
  const {scene} = useThree()
  useAdaptiveDpr({dpr: [1, 2]})

  useEffect(() => {
    let objectURL:string|null = null;
    const loadModel = async () => {
      try {
        setLoading(true)
        const gltf = await modelManager.loadModel(modelPath)
        if (gltf) {
          setModel(gltf.scene)
          if (meshRef.current) {
            meshRef.current.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                child.castShadow = castShadow
                child.receiveShadow = receiveShadow
              }
            })
          }
        } else {
          setError(new Error(`Model not found at ${modelPath}`))
        }
      } catch (err:any) {
        setError(new Error(`Error loading model from ${modelPath}: ${err.message}`))
      } finally {
        setLoading(false)
      }
    }
    loadModel()
    return () => {
      if (meshRef.current) {
        threeHelpersUtil.disposeObject(meshRef.current)
      }
    }
  }, [modelPath, castShadow, receiveShadow])
  const lodDistances = useMemo(() => {
    if (isMobile) {
      return [5, 15, 30]
    } else if (isTablet) {
      return [10, 30, 60]
    } else {
      return [20, 60, 120]
    }
  }, [isMobile, isTablet])
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {error && (
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshBasicMaterial color="red"/>
        </mesh>
      )}
      {model ? (
        <primitive object={model} ref={meshRef} dispose={null}/>
      ) : loading ? (
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.5, 32, 32]}/>
          <meshStandardMaterial color="gray" transparent opacity={0.5}/>
        </mesh>
      ) : null}
    </group>
  )
}
export default ModelLoader