import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { CatmullRomCurve3, MathUtils, PerspectiveCamera, Vector3 } from 'three'

// One keyframe per page: the whole office → the tie → the briefcase → the sunglasses → the big "1".
const path = new CatmullRomCurve3([
  new Vector3(0, 0.5, 44),
  new Vector3(-0.5, 1, 33),
  new Vector3(1.5, 0, 24.5),
  new Vector3(-1.5, 1.5, 16),
  new Vector3(0, 0.8, 9),
])
const look = new CatmullRomCurve3([
  new Vector3(0, 0, 0),
  new Vector3(-4, 0, 26),
  new Vector3(5, -1.5, 18),
  new Vector3(-5, 2, 10),
  new Vector3(0, 0.6, 0),
])

const pos = new Vector3()
const target = new Vector3()
const current = new Vector3()

// 0 at the top of the page, 1 at the bottom.
function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

export function CameraRig({ still }: { still: boolean }) {
  const { camera, size } = useThree()
  const wide = size.width > size.height

  // Phones are narrow, so widen the view to keep the props in frame.
  useEffect(() => {
    const cam = camera as PerspectiveCamera
    cam.fov = wide ? 50 : 62
    cam.updateProjectionMatrix()
  }, [camera, wide])

  useFrame(({ pointer }, dt) => {
    const t = scrollProgress()
    path.getPoint(t, pos)
    look.getPoint(t, target)

    // Keep props clear of the text cards: to the right on desktop's last page; on phones,
    // where cards sit at the bottom, lift everything after the opening page.
    const finale = MathUtils.smoothstep(t, 0.75, 1)
    if (wide) target.x -= 3 * finale
    else target.y -= 1.6 * MathUtils.smoothstep(t, 0.05, 0.25) + 0.6 * finale
    if (!still) {
      // Gentle parallax from the mouse / finger
      pos.x += pointer.x * 0.6
      pos.y += pointer.y * 0.4
    }

    const k = still ? 1 : 1 - Math.exp(-4 * dt)
    camera.position.lerp(pos, k)
    current.lerp(target, k)
    camera.lookAt(current)
  })

  return null
}
