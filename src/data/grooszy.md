---
grooszy:
  name: grooszy
  caseStudyId: grooszy
  repo: https://github.com/aliAljaffer/grooszy
  url: ""
  description: Private, self-hosted spending analysis for Alinma and Al Rajhi statements, with trends, suggestions, and an AI assistant that only sees aggregates. Go, Next.js, and Kubernetes.
  images:
    - caption: The overview in dark mode. Synthetic numbers, real chart
      alt-text: ""
      url: https://assets.alialjaffer.com/images/grooszy/overview-desktop-dark.png
    - caption: Same page in light mode
      alt-text: ""
      url: https://assets.alialjaffer.com/images/grooszy/overview-desktop-light.png
    - caption: The overview on a phone
      alt-text: ""
      url: https://assets.alialjaffer.com/images/grooszy/overview-phone-dark.png
    - caption: Import review. Every header figure has to reconcile before anything is saved
      alt-text: ""
      url: https://assets.alialjaffer.com/images/grooszy/import-review-desktop-light.png
  show: true
  date: "2026-10-30"
  type: "project"
  tags: ["Go", "Next.js", "Kubernetes", "Finance", "Homelab"]
---

## Overview

My two banks share no statement format and no view of my spending, so I couldn't answer a simple question: where am I leaking money?

**grooszy** is a private, self-hosted analysis tool for Alinma XLSX and Al Rajhi PDF exports. Support for other banks leans on the question "Do I have a bank account there or not?" 🤷🏽

## Demo

Visit the Github repo @ [github.com/aliAljaffer/grooszy](https://github.com/aliAljaffer/grooszy)

grooszy sits behind Keycloak and only allows one subject (me), so there is no public demo. Everything below is synthetic data.

![The suggestions page, with recurring payments and more](https://assets.alialjaffer.com/images/grooszy/suggestions-desktop-dark.png)

![The transactions list on a phone](https://assets.alialjaffer.com/images/grooszy/transactions-phone-light.png)

## The Name

`groszy` is Polish, the plural of a small coin. I kept the Arabic-flavored spellings `groosh` and `grooshi`. The assistant is called Gersz, from `gersh`.

## The Problem

I used to reconcile statements by hand.

My first PDF parsing pass captured about two thirds of the rows, and the totals were short by thousands of riyals. An app with numbers I can't trust is useless.

## Approach

### Part one: trust the numbers

Statements are parsed in memory, then checked:

- Check all six header figures against the parsed rows. Reject the file on any mismatch.
- Hash the file to catch exact duplicates.
- Score rows for duplicates and anomalies.
- Review, then commit in one database transaction.

The bank comes from the IBAN digits (`05` Alinma, `80` Al Rajhi), since statement body text mentions other banks constantly. Transfers between my own accounts get netted, even when a fee makes the two amounts differ. Al Rajhi PDFs over 120 pages are rejected.

### Part two: see the trend

Trends across two banks that never talk to each other are the point of the app. Privacy is a constraint on how I built it. The app shows:

- Monthly money in and out, plus a summary for the latest month.
- Spending by category and by time of day, with a date range and **merchant exclusion**.
- A daily debit chart on the transactions page. Transaction times are stored.

With two noisy merchants excluded, the time-of-day chart shows when I spend.

### Suggestions

Recurring payments, card coverage, BNPL trend and recurring-series charts, salary trend and credits from configured payers, and transfer matches. You can acknowledge or dismiss each one, and the decision is kept.

### Gersz through chat-gateway

Gersz only receives aggregates: no rows, merchant names, account numbers, or balances. Calls go through [chat-gateway](https://github.com/aliAljaffer/chat-gateway), which owns the system prompt, so the caller cannot change it. The gateway also denies tools.

I use a shared gateway instead of calling a provider from each app, so the prompt, the limits, and the "no tools" rule live in one place. fai uses the same gateway.

## How It Runs

grooszy shares fai's spine: Keycloak OIDC with one allowed subject, CNPG with daily volume snapshots, and Cilium default deny with per-namespace egress rules. The `grooszy-chat` secret holds the gateway key. A ServiceMonitor scrapes metrics from a separate port, and a monthly SMTP reminder nags me to upload fresh statements. The [homelab post](/case-study/homelab/) covers the shared pieces.

### Render gates

CI snapshots every screen in both themes at desktop and mobile width, and fails on document overflow. It caught a 280px table overflow.

## Key Outcomes

- One view of the month across two banks and two formats.
- Files that don't reconcile never reach the database.
- Time-of-day and merchant-exclusion charts that show where spending happens.
- An assistant that cannot leak row-level data, because it never receives any.
- 167 commits in six days, deployed.

## Challenges

- The upload race: two requests could delete each other's import.
- Dedupe: posting time is hashed for duplicate detection.
- PDF extraction: the first pass lost a third of the rows.
- Anomaly scoring: the scores produced false positives.
- Render gates: mobile overflow bugs only show up on a real viewport, so the gates run on one.

## Conclusion

I built grooszy to answer one question: where does the money go? It now runs next to [fai](/case-study/fai/), so read about it too!
