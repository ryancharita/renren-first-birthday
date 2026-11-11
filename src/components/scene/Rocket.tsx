import { Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

export function Rocket({ still, ...props }: { still: boolean; position: [number, number, number] }) {
  const flame = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (still) return
    const s = 1 + Math.sin(clock.elapsedTime * 30) * 0.15
    flame.current!.scale.set(s, 1 + Math.sin(clock.elapsedTime * 23) * 0.25, s)
  })

  return (
    <Float speed={still ? 0 : 1.5} floatIntensity={1.5} rotationIntensity={0.3}>
      <group {...props} rotation={[0.3, 0, -0.6]}>
        <mesh>
          <cylinderGeometry args={[0.45, 0.5, 1.8, 24]} />
          <meshStandardMaterial color="#fdfbff" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <coneGeometry args={[0.45, 0.9, 24]} />
          <meshStandardMaterial color="#ff9fbf" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.3, 0.44]}>
          <circleGeometry args={[0.2, 24]} />
          <meshStandardMaterial color="#8fd8ff" emissive="#8fd8ff" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, 0.3, 0.43]}>
          <torusGeometry args={[0.22, 0.04, 8, 24]} />
          <meshStandardMaterial color="#ffd27a" metalness={0.5} roughness={0.3} />
        </mesh>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.sin(a) * 0.55, -0.75, Math.cos(a) * 0.55]} rotation={[0, a, 0]}>
              <boxGeometry args={[0.06, 0.6, 0.45]} />
              <meshStandardMaterial color="#a6f0dc" />
            </mesh>
          )
        })}
        <mesh ref={flame} position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.3, 0.8, 16]} />
          <meshBasicMaterial color="#ffb347" toneMapped={false} />
        </mesh>
      </group>
    </Float>
  )
}
