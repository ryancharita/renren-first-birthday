import { Float, RoundedBox } from '@react-three/drei'
import { useMemo } from 'react'
import { CanvasTexture, DoubleSide, ExtrudeGeometry, RepeatWrapping, Shape, SRGBColorSpace } from 'three'

export const BLUE = '#1f6fe5'
const GOLD = '#f2c14e'
const BLACK = '#16181d'

type Props = { still: boolean; position: [number, number, number]; rotation?: [number, number, number] }

function extrude(shape: Shape, depth: number, bevel = 0.08) {
  const geo = new ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 4 })
  geo.center()
  return geo
}

// The glossy blue "1" from the invitation, wearing a little crown.
export function NumberOne({ still, ...props }: Props) {
  const geo = useMemo(() => {
    const s = new Shape()
    s.moveTo(-0.9, -1.5)
    s.lineTo(0.9, -1.5)
    s.lineTo(0.9, -1.05)
    s.lineTo(0.35, -1.05)
    s.lineTo(0.35, 1.5)
    s.lineTo(-0.15, 1.5)
    s.lineTo(-0.85, 0.95)
    s.lineTo(-0.85, 0.42)
    s.lineTo(-0.25, 0.8)
    s.lineTo(-0.25, -1.05)
    s.lineTo(-0.9, -1.05)
    s.closePath()
    return extrude(s, 0.55, 0.12)
  }, [])

  return (
    <Float speed={still ? 0 : 1.6} rotationIntensity={0.35} floatIntensity={0.6}>
      <group {...props}>
        <mesh geometry={geo}>
          <meshPhysicalMaterial color={BLUE} roughness={0.2} clearcoat={1} clearcoatRoughness={0.15} />
        </mesh>
        <Crown position={[0.05, 1.95, 0]} rotation={[0.15, 0, 0.2]} />
      </group>
    </Float>
  )
}

function Crown(props: { position: [number, number, number]; rotation: [number, number, number] }) {
  const mat = <meshStandardMaterial color={GOLD} metalness={0.25} roughness={0.3} />
  return (
    <group {...props} scale={0.75}>
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 0.32, 32, 1, true]} />
        <meshStandardMaterial color={GOLD} metalness={0.25} roughness={0.3} side={DoubleSide} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <group key={i} position={[Math.sin(a) * 0.56, 0.36, Math.cos(a) * 0.56]}>
            <mesh>
              <coneGeometry args={[0.16, 0.42, 12]} />
              {mat}
            </mesh>
            <mesh position={[0, 0.26, 0]}>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

export function Briefcase({ still, ...props }: Props) {
  const gold = <meshStandardMaterial color={GOLD} metalness={0.3} roughness={0.3} />
  return (
    <Float speed={still ? 0 : 1.3} rotationIntensity={0.5} floatIntensity={1}>
      <group {...props}>
        <RoundedBox args={[2.6, 1.8, 0.7]} radius={0.14} smoothness={4}>
          <meshStandardMaterial color={BLACK} roughness={0.35} />
        </RoundedBox>
        {/* Lid seam */}
        <mesh position={[0, 0.45, 0.36]}>
          <boxGeometry args={[2.5, 0.04, 0.02]} />
          <meshStandardMaterial color="#2c3038" />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <torusGeometry args={[0.38, 0.08, 12, 32, Math.PI]} />
          <meshStandardMaterial color={BLACK} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.38, 0.38]}>
          <boxGeometry args={[0.42, 0.3, 0.08]} />
          {gold}
        </mesh>
        {[-0.7, 0.7].map((x) => (
          <mesh key={x} position={[x, 0.92, 0]}>
            <boxGeometry args={[0.22, 0.08, 0.5]} />
            {gold}
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Black-and-white striped tie, like the doodle on the invitation.
export function Necktie({ still, ...props }: Props) {
  const { knot, blade, stripes } = useMemo(() => {
    const k = new Shape()
    k.moveTo(-0.32, 0.3)
    k.lineTo(0.32, 0.3)
    k.lineTo(0.2, -0.25)
    k.lineTo(-0.2, -0.25)
    k.closePath()

    const b = new Shape()
    b.moveTo(-0.2, 0)
    b.lineTo(0.2, 0)
    b.lineTo(0.55, -2.6)
    b.lineTo(0, -3.2)
    b.lineTo(-0.55, -2.6)
    b.closePath()

    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, 64, 64)
    ctx.strokeStyle = BLACK
    ctx.lineWidth = 16
    for (let o = -64; o <= 128; o += 32) {
      ctx.beginPath()
      ctx.moveTo(o, 0)
      ctx.lineTo(o + 64, 64)
      ctx.stroke()
    }
    const tex = new CanvasTexture(c)
    tex.wrapS = tex.wrapT = RepeatWrapping
    tex.repeat.set(0.9, 0.9)
    tex.colorSpace = SRGBColorSpace

    return {
      knot: new ExtrudeGeometry(k, { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 }),
      blade: new ExtrudeGeometry(b, { depth: 0.12, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04 }),
      stripes: tex,
    }
  }, [])

  return (
    <Float speed={still ? 0 : 1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <group {...props}>
        <mesh geometry={knot} position={[0, 0, -0.1]}>
          <meshStandardMaterial color={BLACK} roughness={0.5} />
        </mesh>
        <mesh geometry={blade} position={[0, -0.25, 0]}>
          <meshStandardMaterial map={stripes} roughness={0.55} />
        </mesh>
      </group>
    </Float>
  )
}

// Renren's white sunglasses with amber lenses.
export function Sunglasses({ still, ...props }: Props) {
  const frame = <meshStandardMaterial color="#fffaf0" roughness={0.3} />
  return (
    <Float speed={still ? 0 : 1.5} rotationIntensity={0.4} floatIntensity={0.9}>
      <group {...props}>
        {[-0.62, 0.62].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh>
              <torusGeometry args={[0.46, 0.11, 16, 40]} />
              {frame}
            </mesh>
            <mesh>
              <circleGeometry args={[0.46, 40]} />
              <meshStandardMaterial color="#9a6a24" roughness={0.1} transparent opacity={0.88} />
            </mesh>
            <mesh position={[-0.12, 0.14, 0.02]}>
              <circleGeometry args={[0.1, 16]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.12, 0]}>
          <torusGeometry args={[0.18, 0.07, 10, 20, Math.PI]} />
          {frame}
        </mesh>
        {[-1.12, 1.12].map((x) => (
          <mesh key={x} position={[x, 0.1, -0.6]}>
            <boxGeometry args={[0.07, 0.09, 1.2]} />
            {frame}
          </mesh>
        ))}
      </group>
    </Float>
  )
}

const STAR_SPOTS: [number, number, number, number][] = [
  [-7, 4, 30, 0.6], [6, 3.5, 34, 0.45], [8, -3, 27, 0.55], [-8, -3.5, 22, 0.5],
  [3, 4.5, 20, 0.4], [-2.5, -4, 14, 0.5], [7, 1.5, 12, 0.45], [-6.5, 3, 6, 0.55],
  [4.5, -3.5, 4, 0.5], [-4, -2, 2, 0.4], [2.8, 3.8, 1, 0.35], [-9, 0.5, 36, 0.6],
]

// Little blue stars scattered along the camera's route.
export function BlueStars({ still }: { still: boolean }) {
  const geo = useMemo(() => {
    const s = new Shape()
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 0.45 : 1
      const a = (i / 10) * Math.PI * 2 + Math.PI / 2
      if (i) s.lineTo(Math.cos(a) * r, Math.sin(a) * r)
      else s.moveTo(Math.cos(a) * r, Math.sin(a) * r)
    }
    s.closePath()
    return extrude(s, 0.3, 0.08)
  }, [])

  return (
    <>
      {STAR_SPOTS.map(([x, y, z, scale], i) => (
        <Float key={i} speed={still ? 0 : 1 + (i % 3) * 0.4} rotationIntensity={1} floatIntensity={1}>
          <mesh geometry={geo} position={[x, y, z]} scale={scale} rotation={[0, 0, i]}>
            <meshPhysicalMaterial color={i % 4 ? '#2b7cff' : '#7fb2ff'} roughness={0.25} clearcoat={0.8} />
          </mesh>
        </Float>
      ))}
    </>
  )
}
