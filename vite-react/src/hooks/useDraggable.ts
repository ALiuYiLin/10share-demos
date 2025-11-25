import type React from "react";
import { useEffect, useRef, useState } from "react";

export function useDraggable(ref: React.RefObject<HTMLElement | null>){
  const dragging = useRef(false)
  const offset = useRef({x: 0, y: 0})
  const [clicked, setClicked] = useState(false)

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    if(!ref.current) return;
    dragging.current = true
    setClicked(false)

    const rect = ref.current.getBoundingClientRect()
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    ref.current.addEventListener('mousemove',onMouseMove)
    ref.current.addEventListener('mouseup',onMouseUp)
  }

  const onMouseUp = () => {
    dragging.current = false
    setClicked(true)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if(!dragging.current || !ref.current) return;
    const el = ref.current
    el.style.left = `${e.clientX - offset.current.y}px`
    el.style.top = `${e.clientY - offset.current.y}px`
  }

  useEffect(()=>{
    return ()=>{
      document.removeEventListener('mousemove',onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return {
    onMouseDown,
    clicked
  }

}