import { config } from '../../config'
import { useCountdown } from '../../hooks/useCountdown'
import { Section } from './Section'

export function Hero() {
  const { days, hours, minutes, seconds, done } = useCountdown(config.partyStart)

  return (
    <Section>
      <p className="eyebrow">You're invited to</p>
      <h1 className="title">
        {config.childName}'s <span className="gold">First</span> Trip Around the Sun
      </h1>
      <p className="subtitle">{config.childName} is turning ONE!</p>

      {done ? (
        <p className="subtitle gold">It's party day! 🎉</p>
      ) : (
        <div className="countdown" aria-label="Countdown to the party">
          {[
            [days, 'days'],
            [hours, 'hrs'],
            [minutes, 'min'],
            [seconds, 'sec'],
          ].map(([value, label]) => (
            <div key={label} className="countdown__cell">
              <span className="countdown__num">{String(value).padStart(2, '0')}</span>
              <span className="countdown__label">{label}</span>
            </div>
          ))}
        </div>
      )}
      <p className="hint">Scroll to blast off ↓</p>
    </Section>
  )
}
