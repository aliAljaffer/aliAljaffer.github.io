---
fai:
  name: fai
  caseStudyId: fai
  repo: https://github.com/aliAljaffer/fai
  url: ""
  description: A personal task tracker with a Kanban board, notes, reminders, and a Telegram assistant. Go, React, Electron, and Kubernetes, built in six days.
  images:
    - caption: The board in dark mode, with reminders pinned on the left
      alt-text: ""
      url: https://assets.alialjaffer.com/images/fai/board-desktop-dark.png
    - caption: Same board, light mode. Yes, I tested both. Twice.
      alt-text: ""
      url: https://assets.alialjaffer.com/images/fai/board-desktop-light.png
    - caption: The board on a phone, because that's where tasks actually show up
      alt-text: ""
      url: https://assets.alialjaffer.com/images/fai/board-phone-light.png
    - caption: A task open on the phone, in dark mode
      alt-text: ""
      url: https://assets.alialjaffer.com/images/fai/task-phone-dark.png
  show: true
  date: "2026-10-30"
  type: "project"
  tags: ["Go", "React", "Kubernetes", "Productivity", "Homelab"]
---

## Overview

**fai** keeps tasks, notes, calendars, reminders, and time tracking in one place. I wanted to capture a task in three seconds on any device and see every reminder in one place. It has three clients:

- A web app, in any browser.
- An Electron desktop app for Windows, macOS, and Linux (Homebrew cask and installers).
- Telegram, on the phone.

Its sibling, [grooszy](/case-study/grooszy/), was built the same week on the same infrastructure.

## Demo

fai sits behind Keycloak on my homelab, so there is no public demo. The screenshots will have to do.

Here are the stats page, with a year of (randomized, synthetic) activity, and the calendar:

![Stats page with the completion heatmap for the past year](https://assets.alialjaffer.com/images/fai/stats-desktop-dark.png)

![Calendar showing tasks by due date](https://assets.alialjaffer.com/images/fai/calendar-desktop-light.png)

## The Problem

My tasks were scattered. Work tasks lived in Jira, personal tasks in notes, and reminders in my head, usually at 11 PM. Nothing worked well on both my Windows machine and my phone.

I wanted one board, one capture box, and a bot I can talk to, without adapting my habits to another app.

## Approach

The backend is Go with `chi`, `sqlc`, and `goose`. One `Store` interface sits over two databases: SQLite for the desktop app, Postgres for the cluster. The frontend is React + Vite, and the desktop app is an Electron shell around the same thing.

The desktop app has to run alone on a laptop with no database server, and the cluster deserves a real one, so the same code runs on two backends.

Work is structured as **Arcs**, **Tasks**, and **Steps**. An Arc groups tasks, a Task is a unit of work, and a Step breaks a task down. Every task gets a reference like `FAI-42`, so I can type it anywhere and it resolves.

### The same board on every screen

`GET /api/events` is a server-sent events stream. Every mutation is broadcast to every open client. Drag a card on the desktop and the phone updates!

### Talk to it

The Telegram assistant uses `getUpdates` long polling, so it needs no public route and nothing on the internet can reach it. A few rules keep it tight:

- Allowlist by user and chat, private chats only.
- Voice notes go through ElevenLabs `scribe_v2`. If OGG/Opus is rejected, the backend converts to mono MP3 with `ffmpeg` and retries. Format names get normalized too.
- The last 10 messages per chat stay in memory (lost on restart, on purpose).
- Message IDs are remembered for 10 minutes, so a transport retry never creates a duplicate task.

### AI that writes structure

The chat can create a task with steps, or an Arc with nested tasks. A meeting summary becomes an Arc with steps plus calendar links. The provider is set in the database or the environment: `anthropic`, `openai`, or `openai-compat` (also called opencode-zen).

### Jira, both ways

Epic -> Arc, Sub-task -> Step, everything else -> Task. Jira statuses map to board columns. Imports run in the background, with progress shown app-wide.

Two gotchas. The old `/search` endpoint returns `410 Gone`, so I use `/rest/api/3/search/jql`. And company-managed projects need `JIRA_EPIC_LINK_FIELD` (`customfield_10014` on mine).

### Backups

`GET /api/backup` dumps a zip with the database and attachments. `POST /api/backup/restore` puts it back. There's also an ICS feed with a token, one line in settings, for the calendar nerds. ;)

## How It Runs

fai shares grooszy's spine. Keycloak OIDC with direct JWT validation (no `oauth2-proxy`). `AUTH_MODE` splits Compose (`proxy-header` behind Caddy) from Kubernetes (`oidc`). Postgres runs on a CNPG cluster with scheduled backups, attachments sit on a Longhorn RWX PVC, and `TELEGRAM_STATE_FILE` lives on that same PVC. A ServiceMonitor feeds a Grafana dashboard. Images are built on ARC runners and pushed to ghcr plus Harbor, and AI goes through `chat-gateway`. The [homelab post](/case-study/homelab/) covers the shared plumbing.

## Key Outcomes

- From empty repo to deployed in six days, now at 128 commits.
- One board across web, desktop, and Telegram, updating live through SSE.
- Capture by voice note: talk to the phone, get a task.
- Jira import and export, so work tasks stop living somewhere else.
- A zip backup with a tested restore path.

## Challenges

- `AUTH_MODE`: Compose and Kubernetes authenticate differently, and the backend refuses to start if the chosen mode lacks its config. A half-configured auth setup should never boot.
- Jira comment IDs: imports hit a decode failure on numeric comment IDs.
- Linux build: it needed a `procfs` fix before it would compile.
- Electron signing: the app is ad-hoc signed, so Windows shows the SmartScreen warning.
- Voice notes: the transcription service rejected Telegram's OGG/Opus, which led to the `ffmpeg` fallback.

## Conclusion

I built fai because tasks kept slipping through the gaps between my apps. It gives me one board across three clients, and a bot I can talk to.
