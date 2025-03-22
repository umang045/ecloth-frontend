import { Children, useCallback, useEffect, useMemo, useRef } from "react"
import { motion, useAnimate, useAnimationFrame } from "framer-motion";
import { v4 as uuidv4 } from "uuid"
import { useMouseVector } from "@/hooks/use-mouse-vector";

// import { useMouseVector } from "@/components/hooks/use-mouse-vector"


const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,

  animationSequence = [
    [{ scale: 1.2 }, { duration: 0.1, ease: "circOut" }],
    [{ scale: 0 }, { duration: 0.5, ease: "circIn" }],
  ],

  interval = 100
}) => {
  const trailRef = useRef([])

  const lastAddedTimeRef = useRef(0)
  const { position: mousePosition, vector: mouseVector } =
    useMouseVector(containerRef)
  const lastMousePosRef = useRef(mousePosition)
  const currentIndexRef = useRef(0)
  // Convert children to array for random selection
  const childrenArray = useMemo(() => Children.toArray(children), [children])

  // Batch updates using useCallback
  const addToTrail = useCallback((mousePos) => {
    const newItem = {
      id: uuidv4(),
      x: mousePos.x,
      y: mousePos.y,
      rotation: (Math.random() - 0.5) * rotationRange * 2,
      animationSequence,
      scale: 1,
      child: childrenArray[currentIndexRef.current],
    }

    // Increment index and wrap around if needed
    currentIndexRef.current =
      (currentIndexRef.current + 1) % childrenArray.length

    if (newOnTop) {
      trailRef.current.push(newItem)
    } else {
      trailRef.current.unshift(newItem)
    }
  }, [childrenArray, rotationRange, animationSequence, newOnTop])

  const removeFromTrail = useCallback((itemId) => {
    const index = trailRef.current.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      trailRef.current.splice(index, 1)
    }
  }, [])

  useAnimationFrame((time, delta) => {
    // Skip if mouse hasn't moved
    if (
      lastMousePosRef.current.x === mousePosition.x &&
      lastMousePosRef.current.y === mousePosition.y
    ) {
      return
    }
    lastMousePosRef.current = mousePosition

    const currentTime = time

    if (currentTime - lastAddedTimeRef.current < interval) {
      return
    }

    lastAddedTimeRef.current = currentTime

    addToTrail(mousePosition)
  })

  return (
    (<div className="relative w-full h-full pointer-events-none">
      {trailRef.current.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>)
  );
}

const TrailItem = ({
  item,
  onComplete
}) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence = item.animationSequence.map((segment) => [
      scope.current,
      ...segment,
    ])

    animate(sequence).then(() => {
      onComplete(item.id)
    })
  }, [])

  return (
    (<motion.div
      ref={scope}
      key={item.id}
      className="absolute"
      style={{
        left: item.x,
        top: item.y,
        rotate: item.rotation,
      }}>
      {item.child}
    </motion.div>)
  );
}

export { ImageTrail }
