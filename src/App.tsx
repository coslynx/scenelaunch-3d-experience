import React,{Suspense,useCallback} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import {ThemeContext,ThemeProvider} from './context/ThemeContext'
import {Toaster} from 'sonner'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ExperiencePage from './pages/ExperiencePage'
import ModelShowcasePage from './pages/ModelShowcasePage'
import ContactPage from './pages/ContactPage'
import MinimalLayout from './components/layout/MinimalLayout'
import'./src/styles/index.css'
interface PageLayoutProps{children:React.ReactNode}
const PageLayout:React.FC<PageLayoutProps>=({children})=><MinimalLayout>{children}</MinimalLayout>
function App(){const renderRoute=useCallback((path:string,Component:React.FC)=>{return(<Route path={path} element={<Suspense fallback={<div>Loading...</div>}><PageLayout><Component/></PageLayout>}/>)},[])
return(<ThemeProvider><BrowserRouter><Header/><main><Routes>{renderRoute("/",HomePage)}{renderRoute("/about",AboutPage)}{renderRoute("/experience",ExperiencePage)}{renderRoute("/model-showcase",ModelShowcasePage)}{renderRoute("/contact",ContactPage)}</Routes></main><Footer/><Toaster/></BrowserRouter></ThemeProvider>)}
export default App