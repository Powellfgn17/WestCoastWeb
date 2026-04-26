"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springConfig = { damping: 22, stiffness: 260, mass: 0.4 }
  const sx = useSpring(x, springConfig)
  const sy = useSpring(y, springConfig)

  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 6)
      y.set(e.clientY - 6)
      if (!visible) setVisible(true)
    }

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']")
      setHovering(!!interactive)
    }

    const leave = () => setVisible(false)

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    window.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
      window.removeEventListener("mouseleave", leave)
    }
  }, [x, y, visible])

  return (
    <motion.div
      aria-hidden
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{
          scale: hovering ? 2.4 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="h-3 w-3 rounded-full bg-accent shadow-[0_0_20px_rgba(245,158,11,0.6)]"
      />
    </motion.div>
  )
}
