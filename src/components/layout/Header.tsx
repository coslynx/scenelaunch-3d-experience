import React from 'react';
import {Link} from 'react-router-dom';
import {XIcon} from 'lucide-react';
import './src/styles/layout/header.css';

const Header=()=>{
  return(
    <header className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          3D Landing
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
            </li>
            <li>
              <Link to="/experience" className="text-gray-600 hover:text-gray-800">
                Experience
              </Link>
            </li>
            <li>
              <Link to="/model-showcase" className="text-gray-600 hover:text-gray-800">
                Showcase
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-gray-800">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;