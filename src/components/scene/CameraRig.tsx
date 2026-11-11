import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { CatmullRomCurve3, MathUtils, PerspectiveCamera, Vector3 } from 'three'

// One keyframe per page: deep space → past the moon → by the rocket → arriving at Renren's planet.
const path = new CatmullRomCurve3([
  new Vector3(0, 1, 42),
  new Vector3(5, 2.5, 30),
  new Vector3(-3, -0.5, 21),
  new Vector3(3.5, 1.5, 13),
  new Vector3(1, 1.5, 15),
])
const look = new CatmullRomCurve3([
  new Vector3(0, 0, 0),
  new Vector3(-6, 2, 22),
  new Vector3(-7, -1.5, 15),
  new Vector3(1, 0.5, 0),
  new Vector3(1, 0.5, 0),
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

  // Phones are narrow, so widen the view to keep the planet and its "1" in frame.
  useEffect(() => {
    const cam = camera as PerspectiveCamera
    cam.fov = wide ? 50 : 62
    cam.updateProjectionMatrix()
  }, [camera, wide])

  useFrame(({ pointer }, dt) => {
    const t = scrollProgress()
    path.getPoint(t, pos)
    look.getPoint(t, target)

    // On the last page, nudge the planet clear of the RSVP card: to the right on desktop, up on phones.
    const finale = MathUtils.smoothstep(t, 0.75, 1)
    if (wide) target.x -= 4 * finale
    else {
      target.y -= 2.5 * finale
      target.x += 1 * finale
    }
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
