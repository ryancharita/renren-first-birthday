import { Sparkles } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { BlueStars, Briefcase, Necktie, NumberOne, Sunglasses } from './scene/BossProps'
import { CameraRig } from './scene/CameraRig'

// The 3D backdrop. It sits fixed behind the page; the camera follows the page's scroll position.
// The canvas is transparent so the light-blue page gradient shows through.
export function Experience({ still }: { still: boolean }) {
  return (
    <div className="scene">
      <Canvas camera={{ position: [0, 0.5, 44], fov: 50 }} dpr={[1, 2]} eventSource={document.getElementById('root')!}>
        <fog attach="fog" args={['#e3eeff', 28, 70]} />
        <ambientLight intensity={0.9} />
        <hemisphereLight args={['#ffffff', '#9fc2ff', 0.8]} />
        <directionalLight position={[5, 8, 12]} intensity={2.2} />

        <CameraRig still={still} />
        <Necktie still={still} position={[-4, 1.2, 26]} rotation={[0, 0.3, -0.25]} />
        <Briefcase still={still} position={[5, -1.5, 18]} rotation={[0.1, -0.5, 0.05]} />
        <Sunglasses still={still} position={[-5, 2, 10]} rotation={[0.1, 0.5, 0.1]} />
        <NumberOne still={still} position={[0, 0, 0]} rotation={[0, -0.25, 0]} />
        <BlueStars still={still} />
        <Sparkles count={80} scale={[18, 10, 40]} position={[0, 0, 18]} size={4} speed={still ? 0 : 0.3} color="#4f8fff" />
      </Canvas>
    </div>
  )
}
