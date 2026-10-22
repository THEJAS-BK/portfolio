import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const ACCENT = '#8b7cff'

function Sculpture({ simple, still }: { simple: boolean; still: boolean }) {
  const group = useRef<THREE.Group>(null!)
  const shell = useRef<THREE.Mesh>(null!)
  const ring = useRef<THREE.Mesh>(null!)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  useFrame((_, dt) => {
    const { x, y } = pointer.current
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.7, 3, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, y * 0.35, 3, dt)
    if (!still) {
      shell.current.rotation.y -= dt * 0.12
      shell.current.rotation.x += dt * 0.05
      ring.current.rotation.z += dt * 0.08
    }
  })

  return (
    <Float speed={still ? 0 : 1.2} rotationIntensity={0.15} floatIntensity={0.7}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshStandardMaterial color="#c7c7d0" metalness={1} roughness={0.2} flatShading />
        </mesh>
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.8, simple ? 1 : 2]} />
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[2.45, 0.006, 8, 160]} />
          <meshBasicMaterial color={ACCENT} />
        </mesh>
      </group>
    </Float>
  )
}

export default function Scene({ simple, still }: { simple: boolean; still: boolean }) {
  return (
    <Canvas
      dpr={simple ? 1 : [1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 38 }}
      gl={{ antialias: !simple, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      {/* Procedural studio lighting: no HDR download needed */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[-4, 3, 3]} scale={[6, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color={ACCENT} position={[4, -1, 2]} scale={[3, 5, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 4, -3]} scale={4} />
      </Environment>
      <pointLight position={[3, 2, 3]} intensity={12} color={ACCENT} />
      <Sculpture simple={simple} still={still} />
      {!simple && (
        <ContactShadows position={[0, -2.9, 0]} opacity={0.4} scale={9} blur={2.8} far={4} color="#000" />
      )}
    </Canvas>
  )
}
