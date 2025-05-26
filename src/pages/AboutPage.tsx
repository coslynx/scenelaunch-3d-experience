import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Html} from '@react-three/drei';
import * as THREE from 'three';
import {gsap} from 'gsap';
import {useInView} from 'react-intersection-observer';
import {useMediaQuery} from 'react-responsive';
import MinimalLayout from '../components/layout/MinimalLayout';
import {ModelLoader} from '../3d/ModelLoader';
import {use3DAnimation} from '../hooks/use3DAnimation';
import {three3DHelpersUtil} from '../utils/three-helpers';
import {useTheme} from '../context/ThemeContext';
import './src/styles/pages/about.css';

interface AboutPageProps {}

interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
}

const AboutPage:React.FC<AboutPageProps>=()=>{
  const {isDarkMode} = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group>(null);
  const teamRef=useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {name: 'John Doe',title: 'CEO',imageUrl: '/images/team/john.jpg',},
    {name: 'Jane Smith',title: 'CTO',imageUrl: '/images/team/jane.jpg',},
    {name: 'Mike Johnson',title: 'Lead Designer',imageUrl: '/images/team/mike.jpg',},
  ]);
  const isMobile = useMediaQuery({maxWidth: 768});
  const backgroundColor = isDarkMode ? '#1a1a1a' : '#f0f0f0';

  const {inView, ref: heroRef} = useInView({threshold: 0.2});
  const {inView: missionInView, ref: missionRef} = useInView({threshold: 0.2});
  const {inView: teamInView, ref: teamSectionRef} = useInView({threshold: 0.2});

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const teamMember = (member:TeamMember, idx:number)=>{\n      return(<div key={idx} className=\"team-member\">\n          <img src={member.imageUrl} alt={member.name}/>\n          <h3>{member.name}</h3>\n          <p>{member.title}</p>\n        </div>)\n  }
  return (
    <MinimalLayout>\n      <div className=\"container mx-auto py-8\" ref={containerRef} style={{backgroundColor}}>\n\n        <section className=\"hero-section\" ref={heroRef}>\n          <h1 className=\"text-3xl font-bold text-center mb-4 dark:text-white\">About Us</h1>\n          <Canvas style={{height: '500px',background: 'transparent'}} camera={{position: [0, 0, 5],fov: 50}}>\n            <ambientLight intensity={isDarkMode ? 0.3 : 0.5}/>\n            <directionalLight position={[10, 10, 5]} intensity={isDarkMode ? 0.5 : 0.7} castShadow/>\n            <group ref={modelRef}>\n              <ModelLoader modelPath=\"/models/about-us.glb\"/>\n              <OrbitControls enableZoom={false} autoRotate/>\n            </group>\n          </Canvas>\n        </section>\n\n        <section className=\"mission-section\" ref={missionRef}>\n          <div className=\"max-w-3xl mx-auto\">\n            <h2 className=\"text-2xl font-semibold mb-2 dark:text-gray-200\">Our Mission</h2>\n            <p className=\"text-gray-700 dark:text-gray-300\">\n              Our mission is to revolutionize the way businesses interact with their customers by providing\n              innovative 3D solutions. We strive to empower our clients with tools that enhance engagement,\n              foster creativity, and drive success in an increasingly digital world.\n            </p>\n          </div>\n        </section>\n\n        <section className=\"team-section\" ref={teamSectionRef}>\n          <h2 className=\"text-2xl font-semibold text-center mb-4 dark:text-gray-200\">Meet Our Team</h2>\n          <div className=\"team-members-container\">\n            {teamMembers.map((member, idx)=>teamMember(member, idx))}\n          </div>\n        </section>\n      </div>\n    </MinimalLayout>\n  );\n};

export default AboutPage;