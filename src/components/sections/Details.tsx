import { config } from '../../config'
import { Section } from './Section'

export function Details() {
  return (
    <Section side="left">
      <p className="eyebrow">Mission details</p>
      <h2 className="heading">Launch schedule</h2>
      <dl className="details">
        <dt>Date</dt>
        <dd>{config.dateLabel}</dd>
        <dt>Time</dt>
        <dd>{config.timeLabel}</dd>
        <dt>Venue</dt>
        <dd>{config.venueName}</dd>
        <dt>Dress code</dt>
        <dd>{config.dressCode}</dd>
      </dl>
    </Section>
  )
}
