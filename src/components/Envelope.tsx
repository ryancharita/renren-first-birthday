import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { config } from '../config'

// Opening screen: a confidential memo envelope. The tap that opens it is also what lets the browser start the music.
export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false)
  const [gone, setGone] = useState(false)

  const open = () => {
    if (opening) return
    setOpening(true)
    onOpen()
    setTimeout(() => setGone(true), 1100)
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="envelope-screen" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <p className="memo-pill">Memorandum</p>
          <p className="envelope-screen__from">A message from the Boss</p>
          <motion.button
            className="envelope"
            onClick={open}
            aria-label="Open the invitation"
            animate={opening ? { y: -40, scale: 1.05 } : { y: [0, -8, 0] }}
            transition={opening ? { delay: 0.5, duration: 0.6 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="envelope__body" />
            <span className="envelope__stamp">Confidential</span>
            <motion.span
              className="envelope__flap"
              animate={{ rotateX: opening ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.span className="envelope__seal" animate={{ opacity: opening ? 0 : 1 }}>
              {config.initial}
            </motion.span>
          </motion.button>
          <motion.p className="hint" animate={{ opacity: opening ? 0 : 1 }}>
            Tap to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
