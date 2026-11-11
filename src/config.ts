// Everything guests read lives here. Edit these values, push to main, and the site redeploys.
export const config = {
  childName: 'Renren',
  initial: 'R',

  // Party start, in local time (YYYY-MM-DDTHH:MM). Drives the countdown.
  partyStart: '2026-11-27T15:00',
  dateLabel: 'Friday, November 27, 2026',
  timeLabel: '3:00 PM – 6:00 PM',

  venueName: 'Venue name goes here',
  venueAddress: 'Street address, City',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Venue+name+City',

  dressCode: 'Cosmic colors — navy, silver, or pastels',
  hosts: 'Mommy & Daddy',

  rsvpDeadline: 'November 20, 2026',
  rsvpUrl: 'https://m.me/your.username',
  rsvpLabel: 'RSVP on Messenger',

  // Put your song at public/music.mp3. Without it, a soft "Twinkle Twinkle" music box plays instead.
  musicUrl: `${import.meta.env.BASE_URL}music.mp3`,
}
