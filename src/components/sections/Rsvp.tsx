import { config } from '../../config'
import { Section } from './Section'

export function Rsvp() {
  return (
    <Section side="left">
      <p className="eyebrow">Will you join the crew?</p>
      <h2 className="heading">RSVP</h2>
      <p>Kindly let us know by {config.rsvpDeadline}.</p>
      <a className="button button--gold" href={config.rsvpUrl} target="_blank" rel="noreferrer">
        {config.rsvpLabel}
      </a>
      <p className="signoff">
        With love,
        <br />
        {config.hosts}
      </p>
    </Section>
  )
}
