import { Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { CameraRig } from './scene/CameraRig'
import { Moon } from './scene/Moon'
import { Planet } from './scene/Planet'
import { Rocket } from './scene/Rocket'

// The 3D backdrop. It sits fixed behind the page; the camera follows the page's scroll position.
export function Experience({ still }: { still: boolean }) {
  return (
    <div className="scene">
      <Canvas camera={{ position: [0, 1, 42], fov: 50 }} dpr={[1, 2]} eventSource={document.getElementById('root')!}>
        <color attach="background" args={['#0b1033']} />
        <fog attach="fog" args={['#0b1033', 30, 90]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 10]} intensity={1.6} color="#fff1dc" />
        <pointLight position={[-8, -2, 6]} intensity={40} color="#b49bff" />

        <CameraRig still={still} />
        <Stars radius={90} depth={60} count={4000} factor={4} saturation={0.4} fade speed={still ? 0 : 0.6} />
        <Planet still={still} />
        <Moon still={still} position={[-6, 2, 22]} />
        <Rocket still={still} position={[-7, -1.5, 15]} />
      </Canvas>
    </div>
  )
}
