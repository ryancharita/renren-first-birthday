import { Float, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'

const GOLD = '#ffd27a'

// Renren's planet: a pastel world circled by a ring, with a giant golden "1" floating beside it.
export function Planet({ still }: { still: boolean }) {
  const planet = useRef<Mesh>(null)
  const moons = useRef<Group>(null)

  useFrame((_, dt) => {
    if (still) return
    planet.current!.rotation.y += dt * 0.15
    moons.current!.rotation.y += dt * 0.4
  })

  return (
    <group>
      <mesh ref={planet}>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshStandardMaterial color="#b9a6ff" roughness={0.6} emissive="#5a3fb8" emissiveIntensity={0.25} />
      </mesh>
      {/* Stripes give the rotation something to show */}
      {[0.6, -0.5].map((y, i) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[Math.sqrt(2.2 ** 2 - y ** 2) + 0.01, 0.12, 12, 64]} />
          <meshStandardMaterial color={i ? '#ffc6d9' : '#a6f0dc'} roughness={0.7} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[3.4, 0.08, 8, 96]} />
        <meshStandardMaterial color="#ffd6b5" emissive="#ffb38a" emissiveIntensity={0.6} />
      </mesh>

      <group ref={moons} rotation={[0.3, 0, 0.15]}>
        {['#ffc6d9', '#a6f0dc', '#ffe8a3'].map((c, i) => {
          const a = (i / 3) * Math.PI * 2
          return (
            <mesh key={c} position={[Math.cos(a) * 4.3, 0, Math.sin(a) * 4.3]}>
              <sphereGeometry args={[0.28, 24, 24]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.3} />
            </mesh>
          )
        })}
      </group>

      <Float speed={still ? 0 : 2} rotationIntensity={0.4} floatIntensity={0.8}>
        <group position={[4.6, 1.2, 0.5]} rotation={[0, -0.4, 0]}>
          <NumberOne />
        </group>
      </Float>

      <Sparkles count={60} scale={10} size={3} speed={still ? 0 : 0.3} color="#fff3c4" />
    </group>
  )
}

function NumberOne() {
  const mat = <meshStandardMaterial color={GOLD} metalness={0.15} roughness={0.35} emissive="#e0a43a" emissiveIntensity={0.45} />
  return (
    <group scale={0.9}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.55, 2.6, 0.45]} />
        {mat}
      </mesh>
      <mesh position={[-0.38, 1.0, 0]} rotation={[0, 0, -0.75]}>
        <boxGeometry args={[0.45, 0.9, 0.45]} />
        {mat}
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[1.4, 0.4, 0.45]} />
        {mat}
      </mesh>
    </group>
  )
}
