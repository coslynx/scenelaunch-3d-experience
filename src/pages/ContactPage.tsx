import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import * as THREE from 'three';
import MinimalLayout from '../components/layout/MinimalLayout';
import {use3DAnimation} from '../hooks/use3DAnimation';
import {three3DHelpersUtil} from '../utils/three-helpers';
import {useTheme} from '../context/ThemeContext';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm:React.FC<ContactFormProps>=({onSubmit})=>{
  const [formData, setFormData] = useState<ContactFormData>({name: '',email: '',message: '',});
  const [errors, setErrors] = useState<FormErrors>({});
  const {isDarkMode} = useTheme();

  const validateForm = useCallback(():boolean => {
    let isValid = true;
    const newErrors:FormErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  },[formData]);

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({name: '',email: '',message: '',});
      setErrors({});
      alert('Form submitted successfully!');
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData,[name]: value,}));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md dark:bg-gray-800">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Message:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        {errors.message && <p className="text-red-500 text-xs italic">{errors.message}</p>}
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </div>
    </form>
  );
};

interface ContactPageProps {}
const ContactPage:React.FC<ContactPageProps>=()=>{
  const handleSubmit = (data: ContactFormData) => {
    console.log('Form Data:', data);
  };

  return (
    <MinimalLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-4 dark:text-white">Contact Us</h1>
        <div className="relative min-h-[400px]">
          <Canvas style={{position: 'absolute',top: 0,left: 0,width: '100%',height: '100%',zIndex: -1,}} camera={{position: [0, 0, 5],fov: 50}}>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[10, 10, 5]} intensity={0.7} castShadow/>
            <OrbitControls/>
          </Canvas>
          <ContactForm onSubmit={handleSubmit}/>
        </div>
      </div>
    </MinimalLayout>
  );
};

export default ContactPage;