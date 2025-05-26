import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
/**
 * @file src/main.tsx
 * @description Entry point for the React application, rendering the App component into the DOM.
 */
try{
  /**
   * @const root
   * @description Gets the root element from the document where the React application will be mounted.
   * @type {HTMLElement | null}
   */
  const root=document.getElementById('root')
  /**
   * Renders the React application within React.StrictMode for enhanced debugging and performance profiling.
   * If the root element is not found in the document, it logs an error message to the console.
   *
   * @remarks
   * The React application is rendered using ReactDOM.createRoot for efficient updates and rendering performance.
   * React.StrictMode is enabled to apply additional checks and warnings during development, but it has no effect in production.
   *
   * @throws {Error} If the root element is not found in the document.
   */
  if(root){
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    )
  }else{
    console.error('Root element with id "root" not found in the document.')
  }
}catch(error){
  console.error('Failed to render the application',error)
}