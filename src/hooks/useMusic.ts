import { useCallback, useRef, useState } from 'react'

type Player = { play(): void; pause(): void }

// Plays the mp3 at `url`; if it is missing or fails, falls back to a synthesized music-box lullaby.
export function useMusic(url: string) {
  const player = useRef<Player | null>(null)
  const [playing, setPlaying] = useState(false)

  // Must be called from a tap/click so the browser allows audio.
  const start = useCallback(() => {
    if (player.current) {
      player.current.play()
      setPlaying(true)
      return
    }
    const audio = new Audio(url)
    audio.loop = true
    audio.volume = 0.6
    player.current = { play: () => void audio.play(), pause: () => audio.pause() }
    setPlaying(true)
    audio.play().catch(() => {
      player.current = createMusicBox()
      player.current.play()
    })
  }, [url])

  const toggle = useCallback(() => {
    if (!player.current) return start()
    if (playing) player.current.pause()
    else player.current.play()
    setPlaying(!playing)
  }, [playing, start])

  return { playing, start, toggle }
}

const NOTE: Record<string, number> = { C: 523.25, D: 587.33, E: 659.25, F: 698.46, G: 783.99, A: 880 }
const MELODY = 'CCGGAAG- FFEEDDC- GGFFEED- GGFFEED- CCGGAAG- FFEEDDC-'.replace(/ /g, '')
const BEAT = 0.42

function createMusicBox(): Player {
  const ctx = new AudioContext()
  const master = ctx.createGain()
  master.gain.value = 0.16
  master.connect(ctx.destination)

  const chime = (freq: number, at: number) => {
    for (const [mult, level, decay] of [[1, 1, 1.4], [4, 0.12, 0.3]]) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = freq * mult
      gain.gain.setValueAtTime(0, at)
      gain.gain.linearRampToValueAtTime(level, at + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, at + decay)
      osc.connect(gain).connect(master)
      osc.start(at)
      osc.stop(at + decay)
    }
  }

  // Look-ahead scheduler: suspending the context pauses currentTime, so this pauses cleanly too.
  let i = 0
  let next = ctx.currentTime + 0.1
  setInterval(() => {
    while (next < ctx.currentTime + 0.6) {
      const ch = MELODY[i % MELODY.length]
      if (ch !== '-') chime(NOTE[ch], next)
      next += i % MELODY.length === MELODY.length - 1 ? BEAT * 3 : BEAT
      i++
    }
  }, 150)

  return { play: () => void ctx.resume(), pause: () => void ctx.suspend() }
}
