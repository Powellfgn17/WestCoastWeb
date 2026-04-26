"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Particles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = pos.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * 0.05
      if (arr[i * 3 + 1] > 3) arr[i * 3 + 1] = -3
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.025} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function FloatingPlane({
  position,
  accent,
  delay,
}: {
  position: [number, number, number]
  accent: string
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() + delay
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15

    const targetRotX = hovered ? -mouse.y * 0.35 : Math.sin(t * 0.4) * 0.08
    const targetRotY = hovered ? mouse.x * 0.35 : Math.cos(t * 0.5) * 0.1
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetRotX, 0.08)
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.08)
    const targetScale = hovered ? 1.05 : 1
    const cur = ref.current.scale.x
    const next = THREE.MathUtils.lerp(cur, targetScale, 0.08)
    ref.current.scale.setScalar(next)
  })

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.6, 2.2, 0.04]} />
      <meshStandardMaterial
        color={accent}
        transparent
        opacity={0.18}
        roughness={0.1}
        metalness={0.6}
        emissive={accent}
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

export function ServiceCards3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 2, 4]} intensity={1.2} color="#3B82F6" />
      <pointLight position={[3, -1, 2]} intensity={0.6} color="#F59E0B" />
      <Particles />
      <FloatingPlane position={[-2.2, 0, 0]} accent="#3B82F6" delay={0} />
      <FloatingPlane position={[0, 0.1, 0]} accent="#F59E0B" delay={0.9} />
      <FloatingPlane position={[2.2, 0, 0]} accent="#3B82F6" delay={1.8} />
    </Canvas>
  )
}
