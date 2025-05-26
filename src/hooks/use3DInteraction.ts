import { useState, useRef, useCallback, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { threeHelpersUtil } from '../utils/three-helpers'
interface Use3DInteractionProps {
  enabled?: boolean
  hoveredObjectColor?: THREE.ColorRepresentation
  selectedObjectColor?: THREE.ColorRepresentation
}
interface Use3DInteractionResult {
  handleClick: (event: THREE.Intersection) => void
  handlePointerOver: (event: THREE.Intersection) => void
  handlePointerOut: (event: THREE.Intersection) => void
  dragState: {
    isDragging: boolean
    draggedObject: THREE.Object3D | null
  }
}
/**
 * @hook use3DInteraction
 * A custom React hook for managing 3D object interactions in a Three.js scene,
 * providing handlers for click, hover, and drag events.
 *
 * @param {Use3DInteractionProps} [props={}] - Configuration options for the hook.
 * @param {boolean} [props.enabled=true] - Whether interactions are enabled.
 * @param {THREE.ColorRepresentation} [props.hoveredObjectColor=0x00ff00] - The color to apply to hovered objects.
 * @param {THREE.ColorRepresentation} [props.selectedObjectColor=0xff0000] - The color to apply to selected objects.
 *
 * @returns {Use3DInteractionResult} An object containing interaction handlers and drag state.
 */
export const use3DInteraction = (props: Use3DInteractionProps = {}): Use3DInteractionResult => {
  const { enabled = true, hoveredObjectColor = 0x00ff00, selectedObjectColor = 0xff0000 } = props
  const { scene, camera, gl } = useThree()
  const raycaster = useRef(new THREE.Raycaster())
  const pointer = useRef(new THREE.Vector2())
  const [dragState, setDragState] = useState({ isDragging: false, draggedObject: null as THREE.Object3D | null })
  const [selectedObject, setSelectedObject] = useState<THREE.Object3D | null>(null)
  const [hoveredObject, setHoveredObject] = useState<THREE.Object3D | null>(null)
  const handlePointerOver = useCallback(
    (event: THREE.Intersection) => {
      if (!enabled) return
      document.body.style.cursor = 'pointer'
      const object = event.object
      if (object) {
        setHoveredObject(object)
        if ((object as any).material) {
          try {
            if (Array.isArray((object as any).material)) {
              (object as any).material.forEach((material: any) => {
                if (material.emissive) {
                  material.emissive.setHex(hoveredObjectColor as number)
                }
              })
            } else {
              if ((object as any).material.emissive) {
                (object as any).material.emissive.setHex(hoveredObjectColor as number)
              }
            }
          } catch (e) {
            console.log('Failed over', e)
          }
        }
      }
    },
    [enabled, hoveredObjectColor]
  )
  const handlePointerOut = useCallback((event: THREE.Intersection) => {
    if (!enabled) return
    document.body.style.cursor = 'auto'
    if (hoveredObject) {
      try {
        if ((hoveredObject as any).material) {
          if (Array.isArray((hoveredObject as any).material)) {
            (hoveredObject as any).material.forEach((material: any) => {
              if (material.emissive) {
                material.emissive.setHex(0)
              }
            })
          } else {
            if ((hoveredObject as any).material.emissive) {
              (hoveredObject as any).material.emissive.setHex(0)
            }
          }
        }
      } catch (e) {
        console.log('Failed out', e)
      }
      setHoveredObject(null)
    }
  }, [enabled, hoveredObject])
  const handleClick = useCallback(
    (event: THREE.Intersection) => {
      if (!enabled) return
      const object = event.object
      if (object === selectedObject) {
        if ((object as any).material) {
          if (Array.isArray((object as any).material)) {
            (object as any).material.forEach((material: any) => {
              if (material.emissive) {
                material.emissive.setHex(0)
              }
            })
          } else {
            if ((object as any).material.emissive) {
              (object as any).material.emissive.setHex(0)
            }
          }
        }
        setSelectedObject(null)
        return
      }
      if (selectedObject) {
        if ((selectedObject as any).material) {
          if (Array.isArray((selectedObject as any).material)) {
            (selectedObject as any).material.forEach((material: any) => {
              if (material.emissive) {
                material.emissive.setHex(0)
              }
            })
          } else {
            if ((selectedObject as any).material.emissive) {
              (selectedObject as any).material.emissive.setHex(0)
            }
          }
        }
      }
      setSelectedObject(object)
      if ((object as any).material) {
        try {
          if (Array.isArray((object as any).material)) {
            (object as any).material.forEach((material: any) => {
              if (material.emissive) {
                material.emissive.setHex(selectedObjectColor as number)
              }
            })
          } else {
            if ((object as any).material.emissive) {
              (object as any).material.emissive.setHex(selectedObjectColor as number)
            }
          }
        } catch (e) {
          console.log('Failed onClick', e)
        }
      }
    },
    [enabled, selectedObject, selectedObjectColor]
  )
  useEffect(() => {
    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      pointer.current.x = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(event instanceof MouseEvent ? event.clientY : event.touches[0].clientY / window.innerHeight) * 2 + 1
      raycaster.current.setFromCamera(pointer.current, camera)
      const intersects = raycaster.current.intersectObjects(scene.children, true)
      if (dragState.isDragging && dragState.draggedObject) {
        if (intersects.length > 0) {
          const intersectionPoint = intersects[0].point
          dragState.draggedObject.position.copy(intersectionPoint)
        }
      }
    }
    const onMouseDown = (event: MouseEvent | TouchEvent) => {
      if (!enabled) return
      pointer.current.x = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -(event instanceof MouseEvent ? event.clientY : event.touches[0].clientY / window.innerHeight) * 2 + 1
      raycaster.current.setFromCamera(pointer.current, camera)
      const intersects = raycaster.current.intersectObjects(scene.children, true)
      if (intersects.length > 0) {
        setDragState({ isDragging: true, draggedObject: intersects[0].object })
      }
    }
    const onMouseUp = () => {
      setDragState({ isDragging: false, draggedObject: null })
    }
    if (enabled) {
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mouseup', onMouseUp)
    }
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [enabled, scene, camera, dragState])
  return { handleClick, handlePointerOver, handlePointerOut, dragState }
}