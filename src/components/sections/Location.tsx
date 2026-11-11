import { config } from '../../config'
import { Section } from './Section'

export function Location() {
  return (
    <Section side="right">
      <p className="eyebrow">Landing site</p>
      <h2 className="heading">{config.venueName}</h2>
      <p>{config.venueAddress}</p>
      <a className="button" href={config.mapUrl} target="_blank" rel="noreferrer">
        Open in Google Maps
      </a>
    </Section>
  )
}
