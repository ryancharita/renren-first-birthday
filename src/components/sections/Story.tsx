import { config } from '../../config'
import { Section } from './Section'

export function Story() {
  return (
    <Section side="right">
      <p className="banner banner--blue">Big suits, small shoes, and a whole lot of attitude!</p>
      <p className="lead">
        Please join us as we celebrate the {config.occasion.replace('&', 'and')} of our Little Boss {config.nickname}
      </p>
      <p className="ribbon">{config.fullName}</p>
    </Section>
  )
}
