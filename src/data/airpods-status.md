---
airpods-status:
  name: AirPods Status
  caseStudyId: airpods-status
  description: A GNOME Shell extension that shows your AirPods battery percentage in the top bar, colored by charge level.
  repo: "https://github.com/aliAljaffer/airpods-status-gnome"
  url: ""
  images:
    - caption: "Healthy battery, 54%, green"
      alt-text: "AirPods Status extension in the GNOME top bar showing 54 percent in green"
      url: https://assets.alialjaffer.com/images/airpods-status/top-bar-healthy.png
    - caption: "Getting low, 41%, amber"
      alt-text: "AirPods Status extension in the GNOME top bar showing 41 percent in amber"
      url: https://assets.alialjaffer.com/images/airpods-status/top-bar-warning.png
  show: true
  date: "2026-08-22"
  type: "project"
  icon: "BiHeadphone"
  tags: ["Linux", "Automation"]
---

## Overview

Small GNOME Shell extension that puts your AirPods battery percentage right in the top bar. No clicking, no waiting, just glance up and you know. The label changes color with the charge: green above 50%, amber between 21-50%, red at 20% or below.

## The Problem

I run Linux on the daily driver, and AirPods obviously don't play nice with it out of the box. [airpods-tui](https://github.com/annoyedmilk/airpods-tui) already solves the hard part (talking to the AirPods over Bluetooth and reporting battery), but I didn't want to open a terminal every time I wanted to check. I wanted it in the top bar, always visible, like it would be on macOS.

## Approach

`airpods-tui` ships a `--waybar-watch` flag that streams JSON battery updates on every change, built for `waybar` on wlroots compositors. GNOME doesn't use `waybar`, but that same JSON stream is exactly what I needed.

The extension spawns `airpods-tui --waybar-watch` as a subprocess with `Gio.Subprocess`, reads its stdout line by line with `Gio.DataInputStream`, and parses each line as JSON. Each line looks like this:

```json
{"class":"connected","percentage":54,"text":"54%","tooltip":"AirPods Max\n54%"}
```

That's it. No polling, no temp files, no daemon to babysit. If the subprocess dies, the extension notices the stream closing and respawns it after 5 seconds.

An earlier version of this polled a `.env` file written by `airpods-tui --daemon`, which turned out to update inconsistently. Reading `--waybar-watch` directly is simpler and never goes stale.

## Key Outcomes

- Live battery percentage in the GNOME top bar, no manual checks.
- Color-coded label: green, amber, red by charge level.
- No file polling. Reads the tool's own live JSON stream directly.
- Self-healing: respawns `airpods-tui` if it exits unexpectedly.

## Challenges

First version crashed on enable with `TypeError: can't access property "MIDDLE"` because `y_align` needs a `Clutter.ActorAlign` enum value, not a raw number. Small mistake, and GNOME Shell caches extension JS per session on Wayland, so every code fix needed a full logout/login to verify. No live reload during development.

## Conclusion

Nothing fancy here, just a small extension that scratches a real itch. Credit to [annoyedmilk](https://github.com/annoyedmilk) for `airpods-tui`, this project is really just a thin GNOME-shaped wrapper around it.
