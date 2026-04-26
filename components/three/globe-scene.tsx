"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber"
import { Sphere, Line, Html } from "@react-three/drei"
import * as THREE from "three"

// Markets (lat, lon)
const CITIES = [
  { name: "États-Unis", country: "US", lat: 35.23, lon: -80.84, color: "#3B82F6" },
  { name: "Royaume-Uni", country: "UK", lat: 52.49, lon: -1.89, color: "#3B82F6" },
  { name: "France", country: "FR", lat: 45.76, lon: 4.84, color: "#3B82F6" },
  { name: "Canada", country: "CA", lat: 43.65, lon: -79.38, color: "#3B82F6" },
  { name: "Bénin", country: "BJ", lat: 6.37, lon: 2.39, color: "#F59E0B", hub: true },
]

const R = 1.6 // globe radius

function latLonToVec3(lat: number, lon: number, radius = R): THREE.Vector3 {
  // GPS → Vec3 conversion (phi/theta convention)
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  return new THREE.Vector3(x, y, z)
}

function makeArcCurve(
  start: THREE.Vector3,
  end: THREE.Vector3,
  controlRadius = R * 1.3,
): THREE.CatmullRomCurve3 {
  const mid = start
    .clone()
    .add(end)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(controlRadius)
  return new THREE.CatmullRomCurve3([start, mid, end], false, "centripetal", 0.5)
}

/** Arc between two points along the globe (legacy, kept for reference) */
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
  name,
  hub = false,
  delay = 0,
}: {
  position: THREE.Vector3
  color: string
  name: string
  hub?: boolean
  delay?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshBasicMaterial>(null)
  const ringMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime() + delay
    const pulse = (Math.sin(t * 2) + 1) / 2
    if (ref.current) {
      const s = hub ? 1 + pulse * 0.35 : 0.9 + pulse * 0.25
      ref.current.scale.setScalar(s)
    }
    if (ringRef.current) {
      const s = 1 + (t % 2) * 1.8
      ringRef.current.scale.setScalar(s)
      if (ringMatRef.current) {
        ringMatRef.current.opacity = Math.max(0, 1 - (t % 2) / 2)
      }
    }

    // Visibility test (dot > 0 => front side)
    // worldPos = localPos transformed by globe matrixWorld (via getWorldPosition)
    if (ref.current) {
      const worldPos = new THREE.Vector3()
      ref.current.getWorldPosition(worldPos)
      const nodeDir = worldPos.clone().normalize()
      const cameraDir = camera.position.clone().normalize()
      const dot = nodeDir.dot(cameraDir)
      const isFront = dot > 0

      // Hide the node entirely when behind (per spec).
      ref.current.visible = isFront
      if (ringRef.current) ringRef.current.visible = isFront

      // Hide label when behind (HQ included).
      if (labelRef.current) {
        labelRef.current.style.display = isFront ? "block" : "none"
      }
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[hub ? 0.05 : 0.035, 16, 16]} />
        <meshBasicMaterial ref={matRef} color={color} toneMapped={false} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.06, 0.075, 32]} />
        <meshBasicMaterial
          ref={ringMatRef}
          color={color}
          transparent
          opacity={0.6}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Labels: HQ persistent, others on hover */}
      {(hub || hovered) && (
        <Html position={[0, 0.12, 0]} center distanceFactor={8} transform={false} occlude={false}>
          <div
            ref={labelRef}
            className={
              hub
                ? "pointer-events-none whitespace-nowrap rounded-md border border-accent/40 bg-background/80 px-2 py-0.5 font-mono text-[9px] tracking-wider text-accent backdrop-blur"
                : "pointer-events-none whitespace-nowrap rounded-md border border-primary/30 bg-background/75 px-2 py-0.5 font-mono text-[9px] tracking-wider text-primary backdrop-blur"
            }
          >
            {hub ? "COTONOU · HQ" : name}
          </div>
        </Html>
      )}
    </group>
  )
}

function DataPackets({
  curve,
  color,
  count = 3,
  speed = 0.22,
  seed = 0,
}: {
  curve: THREE.CatmullRomCurve3
  color: string
  count?: number
  speed?: number
  seed?: number
}) {
  const refs = useRef<THREE.Mesh[]>([])
  const offsets = useMemo(() => {
    const arr = Array.from({ length: count }, (_, i) => (i / count + seed * 0.137) % 1)
    return arr
  }, [count, seed])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    for (let i = 0; i < offsets.length; i++) {
      const tt = (t * speed + offsets[i]) % 1
      const m = refs.current[i]
      if (m) m.position.copy(curve.getPointAt(tt))
    }
  })

  return (
    <group>
      {offsets.map((_, i) => (
        <mesh
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el
          }}
        >
          <sphereGeometry args={[0.022, 10, 10]} />
          <meshBasicMaterial color={color} toneMapped={false} depthTest depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function PulsingArc({
  curve,
  color,
  seed,
}: {
  curve: THREE.CatmullRomCurve3
  color: string
  seed: number
}) {
  const lineRef = useRef<THREE.Line>(null)
  const points = useMemo(() => curve.getPoints(96), [curve])

  return (
    <group>
      <Line
        ref={lineRef as never}
        points={points}
        color={color}
        lineWidth={1.2}
        transparent
        opacity={0.45}
        depthTest
        depthWrite={false}
      />
      <DataPackets curve={curve} color={color} count={3} speed={0.28} seed={seed} />
    </group>
  )
}

function LatLonGrid({ radius = R, color = "#3B82F6" }: { radius?: number; color?: string }) {
  const lines = useMemo(() => {
    const group = new THREE.Group()
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.22 })

    const mkLine = (pts: THREE.Vector3[]) => {
      const geo = new THREE.BufferGeometry().setFromPoints(pts)
      const line = new THREE.Line(geo, material)
      group.add(line)
    }

    // Longitudes
    for (let lon = -180; lon < 180; lon += 20) {
      const pts: THREE.Vector3[] = []
      for (let lat = -90; lat <= 90; lat += 3) {
        pts.push(latLonToVec3(lat, lon, radius))
      }
      mkLine(pts)
    }
    // Latitudes
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = []
      for (let lon = -180; lon <= 180; lon += 3) {
        pts.push(latLonToVec3(lat, lon, radius))
      }
      mkLine(pts)
    }

    return group
  }, [radius, color])

  // @react-three/fiber can render a prebuilt Object3D via <primitive />
  return <primitive object={lines} />
}

function RadarRings({ radius = R }: { radius?: number }) {
  const rings = useMemo(() => [radius * 1.25, radius * 1.45, radius * 1.68], [radius])
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {rings.map((r, i) => (
        <mesh key={r} position={[0, 0, 0]} renderOrder={2}>
          <ringGeometry args={[r - 0.01, r + 0.01, 128]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.08 - i * 0.02} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Slow constant rotation
    groupRef.current.rotation.y += delta * 0.08 // west → east with our lon convention

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
    // Horizontal parallax: rotate slightly instead of translating (keeps globe centered in its canvas)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      groupRef.current.rotation.y + mx * 0.06,
      0.02,
    )
  })

  const hub = CITIES.find((c) => c.hub)!
  const hubPos = useMemo(() => latLonToVec3(hub.lat, hub.lon), [hub.lat, hub.lon])

  const arcs = useMemo(() => {
    const nodes = CITIES.map((c) => ({ ...c, pos: latLonToVec3(c.lat, c.lon) }))
    const res: { curve: THREE.CatmullRomCurve3; color: string; key: string }[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i]
        const b = nodes[j]
        res.push({
          curve: makeArcCurve(a.pos, b.pos, R * 1.3),
          color: "#3B82F6",
          key: `${a.name}-${b.name}`,
        })
      }
    }
    return res
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

      {/* Latitude/longitude wireframe grid */}
      <LatLonGrid />

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

      {/* Radar-style rings around the globe */}
      <RadarRings />

      {/* Cities */}
      {CITIES.map((c, i) => (
        <CityNode
          key={c.name}
          position={latLonToVec3(c.lat, c.lon)}
          color={c.color}
          name={c.hub ? "COTONOU · HQ" : c.name}
          hub={c.hub}
          delay={i * 0.4}
        />
      ))}

      {/* Connection arcs between every pair of nodes */}
      {arcs.map((a, idx) => (
        <PulsingArc key={a.key} curve={a.curve} color={a.color} seed={idx} />
      ))}
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
      // Move camera back to keep the full globe + rings visible.
      camera={{ position: [0, 0, 7.5], fov: 45, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      onCreated={({ camera }) => {
        camera.lookAt(0, 0, 0)
      }}
      style={{ 
        background: "transparent",
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        inset: 0
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
