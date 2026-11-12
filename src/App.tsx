import { useEffect, useState } from 'react'
import { Envelope } from './components/Envelope'
import { Experience } from './components/Experience'
import { MusicToggle } from './components/MusicToggle'
import { Details } from './components/sections/Details'
import { Hero } from './components/sections/Hero'
import { Location } from './components/sections/Location'
import { Rsvp } from './components/sections/Rsvp'
import { Story } from './components/sections/Story'
import { config } from './config'
import { useMusic } from './hooks/useMusic'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
history.scrollRestoration = 'manual'

export default function App() {
  const [opened, setOpened] = useState(false)
  const music = useMusic(config.musicUrl)

  // Keep the page from scrolling behind the envelope.
  useEffect(() => {
    document.documentElement.style.overflow = opened ? '' : 'hidden'
  }, [opened])

  return (
    <>
      <Experience still={reducedMotion} />
      <div className="stripes" aria-hidden="true" />
      <main>
        <Hero />
        <Story />
        <Details />
        <Location />
        <Rsvp />
      </main>
      <Envelope
        onOpen={() => {
          setOpened(true)
          music.start()
        }}
      />
      {opened && <MusicToggle playing={music.playing} onToggle={music.toggle} />}
    </>
  )
}
