import { config } from '../../config'
import { Section } from './Section'

export function Story() {
  return (
    <Section side="right">
      <p className="eyebrow">365 days ago</p>
      <h2 className="heading">A little star landed</h2>
      <p>
        One year, countless giggles, and a whole lot of firsts later, our little astronaut {config.childName} has
        completed a first full orbit around the sun.
      </p>
      <p>Come celebrate this out-of-this-world milestone with us!</p>
    </Section>
  )
}
