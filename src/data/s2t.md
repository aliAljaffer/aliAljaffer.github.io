---
s2t:
  name: s2t - secret2text
  caseStudyId: s2t
  description: A small CLI that decodes Kubernetes Secrets and ConfigMaps into readable key/value pairs
  repo: https://github.com/aliAljaffer/s2t
  url: ""
  images:
  show: true
  date: "2026-07-15"
  type: "project"
---

# s2t - secret2text

Publish date: `2026-07-15`

## Overview

A CLI that decodes Kubernetes Secrets into readable key/value pairs. It reads a raw manifest (YAML or JSON), a custom `key: value` blob, or fetches a live secret via `kubectl`, base64-decodes every value, and prints the result in a few different shapes. `kubectl` is only required for live-fetching a resource by name - decoding a file or piped stdin doesn't need it installed at all.

## Demo

Github Repository: [aliAljaffer/s2t](https://github.com/aliAljaffer/s2t)

![Showing the many uses of s2t](/s2t.png)

## The Problem

`kubectl get secret my-secret -o yaml` gives you back a wall of base64. Every time I needed to actually read a value, it was `kubectl get secret ... -o jsonpath=...` followed by `base64 -d`, or copy-pasting into some throwaway script. Fine once, annoying every single time.

## Approach

Started as a small Go CLI, first written against the stdlib `flag` package, then rewritten on `cobra` for a proper comparison. It auto-detects the input format (YAML, JSON, or a plain `key: value` blob) whether it comes from a file, stdin, or a live `kubectl` fetch by name. Resource names support `kind/name` and `kind name`, matching `kubectl` itself, and `-n`/`--namespace` autocompletes just like `kubectl` too.

Output isn't limited to plain decode - `-o env`, `-o json`, `-o jsonc`, and `-o yaml` all produce a patch-ready payload, so `s2t -f secret.yaml -o jsonc` can be piped straight into `kubectl patch`. Added `-k configmap` to handle ConfigMaps (`data` + `binaryData`) the same way, `--mask` to redact values for screen-shares without leaking their length, and `s2t diff` to compare two manifests' decoded values key by key instead of a raw line diff. There's also client-side decryption for Sealed Secrets manifests, given the controller's private key.

## Key Outcomes

- One command replaces the `kubectl get -o jsonpath | base64 -d` dance
- Shell autocompletion on secret/configmap names, just like `kubectl`
- Output formats that plug directly into `kubectl patch` and `.env` workflows
- CI (`go vet` + `go test`) and prebuilt binaries for macOS, Windows, and Linux using Makefile
