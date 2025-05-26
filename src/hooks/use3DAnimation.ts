import {useState,useRef,useCallback,useEffect,useMemo} from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
interface AnimationOptions{duration?:number;ease?:string;delay?:number;repeat?:number}
interface TimelineOptions{onComplete?:()=>void;onUpdate?:()=>void;onStart?:()=>void}
interface Use3DAnimationResult{createTimeline:(options?:TimelineOptions)=>gsap.core.Timeline;play:()=>void;pause:()=>void;stop:()=>void;seek:(time:number)=>void;reverse:()=>void;restart:()=>void}
export const use3DAnimation=():Use3DAnimationResult=>{const[timeline,setTimeline]=useState<gsap.core.Timeline|null>(null)
const[isPlaying,setIsPlaying]=useState(false)
const createTimeline=useCallback((options?:TimelineOptions)=>{const tl=gsap.timeline({paused:true,...options})
setTimeline(tl)
return tl
},[])
const play=useCallback(()=>{if(timeline){timeline.play();setIsPlaying(true)}
},[timeline])
const pause=useCallback(()=>{if(timeline){timeline.pause();setIsPlaying(false)}
},[timeline])
const stop=useCallback(()=>{if(timeline){timeline.pause(0,false).kill();setIsPlaying(false);setTimeline(null)}
},[timeline])
const seek=useCallback((time:number)=>{if(timeline){timeline.seek(time)}
},[timeline])
const reverse=useCallback(()=>{if(timeline){timeline.reverse()}
},[timeline])
const restart=useCallback(()=>{if(timeline){timeline.restart()}
},[timeline])
return{createTimeline,play,pause,stop,seek,reverse,restart}}