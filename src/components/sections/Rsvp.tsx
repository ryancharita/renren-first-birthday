import { config } from '../../config'
import { Section } from './Section'

export function Rsvp() {
  return (
    <Section side="left">
      <p className="banner banner--black">attendance is mandatory… because the Boss said so!</p>
      <p>Kindly confirm by {config.rsvpDeadline}.</p>
      <a className="button" href={config.rsvpUrl} target="_blank" rel="noreferrer">
        {config.rsvpLabel}
      </a>
      <p className="script script--signoff">See you in the boardroom.</p>
      <p className="signoff">— {config.hosts}</p>
    </Section>
  )
}
