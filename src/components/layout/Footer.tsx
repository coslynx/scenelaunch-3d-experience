import React from 'react';
import {Link} from 'react-router-dom';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import * as THREE from 'three';
import './src/styles/layout/footer.css';

interface FooterProps{}

const Footer:React.FC<FooterProps>=()=>{
  return(
    <footer className="relative bg-white shadow-md">
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-25">
        <Canvas className="w-full h-full">
          <ambientLight intensity={0.1}/>
          <directionalLight position={[5,3,5]} intensity={0.3}/>
          <OrbitControls autoRotate enableZoom={false} enablePan={false} enabled={false}  />
          <mesh>
            <sphereGeometry args={[3,32,32]}/>
            <meshStandardMaterial color="#2E9AFE" transparent opacity={0.4}/>
          </mesh>
        </Canvas>
      </div>
      <div className="container mx-auto py-4 px-6 relative flex items-center justify-between">
        <p className="text-gray-500 text-sm" data-testid="copyright">
          &copy; {new Date().getFullYear()} 3D Landing
        </p>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-700" aria-label="Privacy Policy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-gray-700" aria-label="Terms of Service">
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;