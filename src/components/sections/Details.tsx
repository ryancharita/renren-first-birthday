import { config } from '../../config'
import { Section } from './Section'

export function Details() {
  return (
    <Section side="left">
      <p className="eyebrow">Official memo</p>
      <h2 className="heading">Board meeting</h2>
      <dl className="details">
        <dt>To</dt>
        <dd>All our favorite people</dd>
        <dt>From</dt>
        <dd>The Little Boss, {config.nickname}</dd>
        <dt>Re</dt>
        <dd>{config.occasion}</dd>
        <dt>Date</dt>
        <dd>{config.dateLabel}</dd>
        <dt>Time</dt>
        <dd>{config.timeLabel}</dd>
        <dt>Venue</dt>
        <dd>{config.venueName}</dd>
        <dt>Attire</dt>
        <dd>{config.dressCode}</dd>
      </dl>
    </Section>
  )
}
