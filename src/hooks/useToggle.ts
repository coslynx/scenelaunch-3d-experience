import {useState,useCallback} from 'react'
interface ToggleReturnType{value:boolean;toggle:()=>void}
/**
 * @hook useToggle
 * A custom React hook for managing a boolean state and providing a function to toggle it.
 *
 * @param {boolean} [initialValue=false] - The initial value of the boolean state.
 * @returns {ToggleReturnType} An object containing the boolean value and the toggle function.
 * The toggle aspect provides accessiblity for keyboard input.
 * Performance: be sure to utilize with small parts, because heavy operations might slow the system
 */
const useToggle=(initialValue:boolean=false):ToggleReturnType=>{const[value,setValue]=useState<boolean>(initialValue)
const toggle=useCallback(()=>setValue(prevValue=>!prevValue),[])
return{value,toggle}}
export default useToggle