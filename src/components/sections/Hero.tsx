import { config } from '../../config'
import { useCountdown } from '../../hooks/useCountdown'
import { Section } from './Section'

export function Hero() {
  const { days, hours, minutes, seconds, done } = useCountdown(config.partyStart)

  return (
    <Section>
      <p className="memo-pill">Memorandum</p>
      <h1 className="title">
        The boss baby is
        <span className="title__row">
          <span className="script">turning</span>
          <span className="big-one">1</span>
        </span>
      </h1>
      <img className="photo" src={config.photo} alt={`${config.nickname} in a cap and sunglasses`} />

      {done ? (
        <p className="subtitle">The meeting is in session! 🎉</p>
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
      <p className="hint">Scroll for the full memo ↓</p>
    </Section>
  )
}
