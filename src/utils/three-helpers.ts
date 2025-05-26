/*!
 * Provides utility functions for common Three.js operations, geometry creation, material setup, and transformations.
 * @module utils/three-helpers
 */
import * as THREE from 'three';
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
 * Performs a raycast from the camera to detect intersections with 3D objects.
 * @param event The React mouse event.
 * @param camera The Three.js camera.
 * @param objects An array of Three.js objects to check for intersections.
 * @returns An array of THREE.Intersection objects.
 */
const raycast=(event:React.MouseEvent<HTMLCanvasElement>,camera:THREE.Camera,objects:THREE.Object3D[]):THREE.Intersection[]=>{const pointer=new THREE.Vector2();pointer.x=(event.clientX/window.innerWidth)*2-1;pointer.y=-(event.clientY/window.innerHeight)*2+1;const raycaster=new THREE.Raycaster();raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(objects);};
/**
 * Converts degrees to radians.
 * @param degrees The degree to convert
 * @returns The number that converts to radians.
 */
const degreesToRadians=(degrees:number):number=>degrees*(Math.PI/180);
/**
 * Recursively disposes of all resources associated with a given Three.js object, including geometries, materials, and textures.
 * @param object The Three.js object to dispose of.
 */
const disposeObject=(object:THREE.Object3D):void=>{if(object.geometry&&typeof(object.geometry.dispose)==='function'){object.geometry.dispose();}if(object.material){if(Array.isArray(object.material)){object.material.forEach(material=>{if(material&&material.map)material.map.dispose();if(material)material.dispose();});}else{if(object.material.map)object.material.map.dispose();object.material.dispose();}}};
/**
 * Creates a physically based rendering (PBR) material with theme-aware color adjustments.
 * @param color The CSS color value.
 * @param roughness The material roughness.
 * @param metalness The material metalness.
 * @param theme  current theme.
 * @returns The created THREE.MeshStandardMaterial.
 */
const createPBRMaterial=(color:string,roughness:number,metalness:number,theme:'light'|'dark'):THREE.MeshStandardMaterial=>{const baseColor=new THREE.Color(color);if(theme==='dark'){baseColor.multiplyScalar(0.7);}return new THREE.MeshStandardMaterial({color:baseColor,roughness,metalness});};
/**
 * Utility function for creating a mock GLTF model. Used for testing, and to not have network access.\
 * Returns:  {Object} a Mocked Three group and model
 */
const createMockGLTFModel=():THREE.Group=>{const geometry=new THREE.BoxGeometry(1,1,1);const material=new THREE.MeshStandardMaterial({color:0xff0000});const mesh=new THREE.Mesh(geometry,material);const group=new THREE.Group();group.add(mesh);return group;};
export{createBox,createSphere,raycast,degreesToRadians,disposeObject,createPBRMaterial,createMockGLTFModel};