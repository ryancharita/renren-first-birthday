# Renren's 1st Birthday & Dedication 💼

A "Little Boss" 3D online invitation for Reien Arthur Fiel Taneo (Renren), November 27, 2026, built with React Three Fiber.

**Live:** https://ryancharita.github.io/renren-first-birthday/

Guests tap a confidential memo envelope to open the invitation, which also starts the music. As they scroll, the camera glides past a striped tie, a briefcase and Renren's sunglasses to a glossy blue "1" wearing a crown. Memo-style cards along the way show the photos and countdown, the welcome message, meeting details, venue and RSVP.

## Editing the details

Everything guests read is in **`src/config.ts`**: names, occasion, photo, date and time, venue, Google Maps link, dress code, hosts, RSVP deadline and RSVP link. Edit it, commit, and push to `main`. GitHub Actions redeploys in about a minute.

- **Countdown:** `partyStart` is in the guest's local time (`YYYY-MM-DDTHH:MM`).
- **Maps link:** in Google Maps, tap *Share* on the venue and paste the link into `mapUrl`.
- **RSVP link:** `https://m.me/<your-facebook-username>` opens Messenger. `sms:+63XXXXXXXXXX` opens a text message instead.

Also update the preview text in `index.html` (`og:` tags) if the date changes. That text is what Messenger and Facebook show when the link is shared.

## Photo

The hero photo is `public/renren.jpg`. Replace it with any wide photo (about 900×400 works well).

## Music

Put an mp3 at **`public/music.mp3`** and it loops after the envelope opens. Without it, a synthesized "Twinkle Twinkle Little Star" music box plays. Guests can mute it with the ♪ button.

## Run locally

```sh
npm install
npm run dev
```

## How it's built

| Piece | Where |
| --- | --- |
| Envelope / music button | `src/components/Envelope.tsx`, `MusicToggle.tsx` |
| 3D scene (tie, briefcase, sunglasses, "1" with crown, stars) | `src/components/Experience.tsx`, `src/components/scene/BossProps.tsx` |
| Camera path that follows the scroll | `src/components/scene/CameraRig.tsx` |
| Text cards | `src/components/sections/` |
| Countdown and music hooks | `src/hooks/` |

Guests who turn on *Reduce motion* on their device get a still scene with no camera flight.

## Adding RSVP storage later

The RSVP button currently just opens a link. To collect responses in a Google Sheet:

1. Create a Sheet, then open **Extensions → Apps Script** and add a `doPost(e)` that calls `appendRow` with the submitted fields.
2. Deploy it as a **Web app** that anyone can access, and copy its URL.
3. Replace the button in `src/components/sections/Rsvp.tsx` with a small form that `fetch`es that URL (`mode: 'no-cors'`, form-encoded body).
