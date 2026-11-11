import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

const CRATERS: [number, number, number, number][] = [
  [0.6, 0.5, 1.05, 0.28],
  [-0.4, -0.3, 1.15, 0.2],
  [0.1, -0.8, 0.95, 0.16],
  [-0.8, 0.5, 0.85, 0.22],
  [0.9, -0.3, 0.75, 0.14],
]

export function Moon({ still, ...props }: { still: boolean; position: [number, number, number] }) {
  const ref = useRef<Group>(null)
  useFrame((_, dt) => {
    if (!still) ref.current!.rotation.y += dt * 0.08
  })

  return (
    <group ref={ref} {...props}>
      <mesh>
        <sphereGeometry args={[1.4, 40, 40]} />
        <meshStandardMaterial color="#f3eee2" roughness={0.9} emissive="#fff6dc" emissiveIntensity={0.15} />
      </mesh>
      {CRATERS.map(([x, y, z, r]) => (
        <mesh key={`${x}${y}`} position={[x, y, z]}>
          <sphereGeometry args={[r, 16, 16]} />
          <meshStandardMaterial color="#d8d0bf" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}
