"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber"
import { Sphere, Line, Html } from "@react-three/drei"
import * as THREE from "three"

// Cities (lat, lon) — Charlotte NC, Birmingham UK, Lyon FR, Cotonou BJ
const CITIES = [
  { name: "Charlotte", country: "US", lat: 35.23, lon: -80.84, color: "#3B82F6" },
  { name: "Birmingham", country: "UK", lat: 52.49, lon: -1.89, color: "#3B82F6" },
  { name: "Lyon", country: "FR", lat: 45.76, lon: 4.84, color: "#3B82F6" },
  { name: "Cotonou", country: "BJ", lat: 6.37, lon: 2.39, color: "#F59E0B", hub: true },
]

const R = 1.6 // globe radius

function latLonToVec3(lat: number, lon: number, radius = R): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

/** Arc between two points along the globe */
function getArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments = 64,
  lift = 0.6,
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const p = new THREE.Vector3().lerpVectors(start, end, t)
    const liftFactor = Math.sin(Math.PI * t) * lift
    p.normalize().multiplyScalar(R + liftFactor)
    pts.push(p)
  }
  return pts
}

function CityNode({
  position,
  color,
  hub = false,
  delay = 0,
}: {
  position: THREE.Vector3
  color: string
  hub?: boolean
  delay?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay
    const pulse = (Math.sin(t * 2) + 1) / 2
    if (ref.current) {
      const s = hub ? 1 + pulse * 0.35 : 0.9 + pulse * 0.25
      ref.current.scale.setScalar(s)
    }
    if (ringRef.current) {
      const s = 1 + (t % 2) * 1.8
      ringRef.current.scale.setScalar(s)
      ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0,
        1 - (t % 2) / 2,
      )
    }
  })

  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[hub ? 0.05 : 0.035, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.075, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function PulsingArc({ points, color }: { points: THREE.Vector3[]; color: string }) {
  const lineRef = useRef<THREE.Line>(null)
  const headRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.35) % 1
    const idx = Math.floor(t * (points.length - 1))
    if (headRef.current && points[idx]) {
      headRef.current.position.copy(points[idx])
    }
  })

  return (
    <group>
      <Line points={points} color={color} lineWidth={1.2} transparent opacity={0.45} />
      <mesh ref={headRef}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Slow constant rotation
    groupRef.current.rotation.y += delta * 0.08

    // Mouse parallax
    const mx = state.mouse.x
    const my = state.mouse.y
    targetRotation.current.x = my * 0.18
    targetRotation.current.y += 0 // keep y flowing
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      0.05,
    )
    // Add subtle horizontal parallax on top of autorotate
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mx * 0.1, 0.05)
  })

  const hub = CITIES.find((c) => c.hub)!
  const hubPos = useMemo(() => latLonToVec3(hub.lat, hub.lon), [hub.lat, hub.lon])

  const arcs = useMemo(() => {
    return CITIES.filter((c) => !c.hub).map((c) => {
      const end = latLonToVec3(c.lat, c.lon)
      return {
        points: getArcPoints(hubPos, end, 64, 0.55),
        color: "#3B82F6",
        key: c.name,
      }
    })
  }, [hubPos])

  // Low-poly sphere: icosahedron
  return (
    <group ref={groupRef}>
      {/* Solid inner sphere */}
      <Sphere args={[R * 0.995, 48, 48]}>
        <meshStandardMaterial
          color="#0b1530"
          metalness={0.4}
          roughness={0.6}
          emissive="#0a0f1e"
          emissiveIntensity={0.4}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[R, 4]} />
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Outer atmospheric glow */}
      <mesh>
        <sphereGeometry args={[R * 1.08, 48, 48]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 1.18, 48, 48]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Cities */}
      {CITIES.map((c, i) => (
        <CityNode
          key={c.name}
          position={latLonToVec3(c.lat, c.lon)}
          color={c.color}
          hub={c.hub}
          delay={i * 0.4}
        />
      ))}

      {/* Connection arcs from hub to every other city */}
      {arcs.map((a) => (
        <PulsingArc key={a.key} points={a.points} color={a.color} />
      ))}

      {/* Hub label */}
      <Html position={hubPos.clone().multiplyScalar(1.22)} center distanceFactor={8} transform={false} occlude={false}>
        <div className="pointer-events-none whitespace-nowrap rounded-md border border-accent/40 bg-background/80 px-2 py-0.5 font-mono text-[9px] tracking-wider text-accent backdrop-blur">
          COTONOU · HQ
        </div>
      </Html>
    </group>
  )
}

function Stars() {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(400 * 3)
    for (let i = 0; i < 400; i++) {
      const r = 8 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.01
  })

  const pointsProps: ThreeElements["points"] = { ref: ref as never }

  return (
    <points {...pointsProps}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.02} sizeAttenuation transparent opacity={0.55} />
    </points>
  )
}

export function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      style={{ 
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "block"
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 3, 5]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, -2, -2]} intensity={0.4} color="#3B82F6" />
      <Stars />
      <Globe />
    </Canvas>
  )
}
