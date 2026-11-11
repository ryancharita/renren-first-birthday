import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// A full-screen page of the scroll story whose card drifts in as it comes into view.
export function Section({ side = 'center', children }: { side?: 'left' | 'right' | 'center'; children: ReactNode }) {
  return (
    <section className={`section section--${side}`}>
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
