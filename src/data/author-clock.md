---
author-clock:
  name: Author Clock/Entertainment System
  caseStudyId: author-clock
  description: Author Clock replica built on Raspberry Pi with YouTube, Spotify, and Kodi integration
  repo: "https://github.com/no-repo"
  url: https://no-url.com/
  images:
    - caption: "The Pi is laid bare. But working. Floss for size reference."
      alt-text: ""
      url: https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/author-clock/IMG_4943.jpg
    - caption: "Raspberry Pi case has arrived! (and 800 ISO film)"
      alt-text: "Raspberry Pi case has arrived! (and 800 ISO film)"
      url: https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/author-clock/IMG_4996.jpg
    - caption: "The system housing - not a fan initially. Mom saw it and thought it was a Saher camera."
      alt-text: ""
      url: https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/author-clock/IMG_5232.jpg
    - caption: "The inside of the box"
      alt-text: "Inside of the box showing raspberry pi, 7-inch screen, and speakers"
      url: https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/author-clock/IMG_5245.jpg
  show: true
---

# Author Clock

## Overview

The Author Clock is inspired by the original [Author Clock](https://www.authorclock.com/shop), adding the core function of displaying quotes and expanding its feature set by adding Kodi, an multimedia entertainment system, and extra functionalities like [Spotify Connect](https://support.spotify.com/us/article/spotify-connect/) and [YouTube TV casting](https://support.google.com/youtubetv/answer/7353493?hl=en&co=GENIE.Platform%3DAndroid) running on Raspberry Pi OS.

## Demo

[ Arabic ] demo on YouTube: [raspberry pi project - author clock inspired clock/entertainment system](https://www.youtube.com/watch?v=prxKZgmRL6U)

Just showcasing the three main core functionalities:

1. **Clock app**, with quotes displayed according to the time
2. **Spotify Connect**, using Raspotify to turn the device to a connectable Speaker system for Spotify Premium users
3. **YouTube TV casting**, using Kodi and the TubeCast add-on.

## The Problem

I found out about the original author clock early this year (2025), and honestly thought the price was too steep for what it did. It used some type of E-Ink screen (just basic black/white) and Internet connectivity to perform OTA (Over-the-Air) updates to the clock. The 12.5cm-wide version was `209 USD`, and the 20cm-wide version was `369 USD`. Way too expensive!

## Approach

I decided to recreate the idea as a React application and ran it on a Raspberry Pi 5 on `Node.js`. Further enhancements like streaming and media playing came on later, but my main concern was that the core functionality is correctly implemented.

For Spotify Connect capabilities, I used [dtcooper](https://github.com/dtcooper)'s [raspotify](https://github.com/dtcooper/raspotify) client.

For media streaming, I used [Kodi](https://kodi.tv/) with add-ons like [TubeCast](https://kodi.wiki/view/Add-on:TubeCast) and Fen Lite.

![Screenshot of the Author Clock app showing the time, date, and matching quote.](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/author-clock/localhost_5173_.png)

## Tools Used and Cost (SAR & €)

- **clock app**: react, vite, tailwindcss (cost: 0 SAR)
- **clock app version control**: GitHub private repo (cost: 0 SAR)
- **casting to youtube**: Kodi, TubeCast addon (cost: 0 SAR)
- **movies/tv shows/anime player**: Kodi, Fen Light + RealDebrid subscription (cost: 16 SAR/~3 Euro per month for RealDebrid)
- **spotify**: raspotify to enable the pi to be used as a Spotify Connect device (cost: 0 SAR but only premium Spotify users can connect to the pi)
- **screen**: 7" GeeekPi on Amazon (cost: 225 SAR/51 Euro)
- **speakers**: some USB speakers on Amazon (cost: 45SAR/10 Euro)
- **microcontroller**: Raspberry Pi 5 (cost: 400 SAR/57 Euro)

## Key Outcomes

Honestly, was super proud of the outcome. Achieved all the goals I set initially, and the further improvements both to the UI and functionalities added were above my expectations! Really enjoyed working on it.

- Spotify-connectable device that is broadcasted to my home network - I'm not limited to Bluetooth when I need to switch to the device for music streaming.

- TubeCast enables YouTube video casting seamlessly

- Since I needed Kodi for TubeCast, I also decided to integrate Fen Lite which enabled me to browse a huge library of visual media like movies, tv shows, etc.

- And of course, the clock app which I can update features for with ease, since it's hosted on GitHub.

## Challenges

- `raspotify` was crashing continuously on song change. Had to manually change the configuration file on `/etc/raspotify/conf` to manually select the audio device rather than let it automatically decide what to play on.

- The box that houses the system and the screen was custom-made, and the measurements for the screen window do not allow for ease of pressing on the edges of the screen. Had to move the UI elements of the clock app to be in the bottom-middle of the screen.

- The screen comes with two small speakers attached to the back, and are okay-ish in regards to volume and sound quality. Opted to go with an external USB speakers and attach it to the back of the box (inside) using double-sided tape. Works fine. See screenshots!

## Conclusion

As mentioned before, I did not expect this outcome the way it did. I would have loved if the box was better-suited to the screen and device, but in the end I decorated it to make it less hideous. Overall, super happy with this!
