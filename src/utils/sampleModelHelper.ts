/*!
 * Provides utility functions for generating and demonstrating sample 3D models, streamlining the process of creating placeholder or example content for the landing page.
 * Primarily used for visual testing and demonstration purposes.
 * @module utils/sampleModelHelper
 * @description Utility functions for creating and manipulating 3D models in Three.js.
 */
import * as THREE from 'three';
import {useFrame} from '@react-three/fiber';
/**
 * Creates a THREE.Mesh representing a box.
 * @param width The width of the box.
 * @param height The height of the box.
 * @param depth The depth of the box.
 * @param color The color of the box material.
 * @returns A THREE.Mesh representing the box.
 */
const createBox=(width:number,height:number,depth:number,color:string):THREE.Mesh=>{const geometry=new THREE.BoxGeometry(width,height,depth);const material=new THREE.MeshStandardMaterial({color,roughness:0.7,metalness:0.2});const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;return mesh;};
/**
 * Creates a THREE.Mesh representing a sphere.
 * @param radius The radius of the sphere.
 * @param color The color of the sphere material.
 * @returns A THREE.Mesh representing the sphere.
 */
const createSphere=(radius:number,color:string):THREE.Mesh=>{const geometry=new THREE.SphereGeometry(radius,32,32);const material=new THREE.MeshStandardMaterial({color,roughness:0.5,metalness:0.3});const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;return mesh;};
/**
 * Asynchronously loads a 3D model from a given URL using THREE.GLTFLoader.
 * @param url The URL of the 3D model (GLTF format).
 * @param onProgress Optional callback to report loading progress.
 * @returns A promise that resolves to a THREE.Group containing the loaded scene.
 */
const loadModel=async(url:string,onProgress?:(event:ProgressEvent)=>void):Promise<THREE.Group>=>{return new Promise((resolve,reject)=>{const loader=new THREE.GLTFLoader();const dracoLoader=new THREE.DRACOLoader();dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');loader.setDRACOLoader(dracoLoader);const ktx2Loader=new THREE.KTX2Loader();loader.setKTX2Loader(ktx2Loader.setTranscoderPath('https://threejs.org/examples/jsm/libs/basis/'););loader.load(url,(gltf)=>{gltf.scene.traverse(function(node){if((node as THREE.Mesh).isMesh){node.castShadow=true;node.receiveShadow=true;}});resolve(gltf.scene);},(xhr)=>{onProgress?.(xhr);},(error)=>{console.error('An error happened',error);reject(error);});});};
/**
 * Recursively disposes of all resources associated with a given Three.js object, including geometries, materials, and textures.
 * @param object The Three.js object to dispose of.
 */
const disposeObject=(object:THREE.Object3D):void=>{if(object.geometry&&typeof(object.geometry.dispose)==='function'){object.geometry.dispose();}
if(object.material){if(Array.isArray(object.material)){object.material.forEach(material=>{if(material.map)material.map.dispose();material.dispose();});}else{if(object.material.map)object.material.map.dispose();object.material.dispose();}}};
export{createBox,createSphere,loadModel,disposeObject};