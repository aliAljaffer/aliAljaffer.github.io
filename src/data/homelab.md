---
homelab:
  name: The Homelab, Ten Months In
  caseStudyId: homelab
  description: The k3s cluster grew up. Talos Linux, full GitOps, real disaster recovery, and three stacked firmware bugs on a 2012 MacBook.
  repo: "https://github.com/aliAljaffer/homelab"
  url: ""
  images: []
  show: true
  date: "2026-08-15"
  type: "blog"
  icon: "SiTalos"
  tags: ["Kubernetes", "Homelab", "Networking", "Automation", "Security"]
---

## Overview

If you read my [k3s homelab post](/case-study/k3s-homelab/), you met this cluster back when it was one secondhand MacBook Pro and a `k3s` install. That post is basically a baby photo at this point :) Ten months later it's a 5-node [Talos Linux](https://www.talos.dev/) cluster, ~33 [ArgoCD](https://argo-cd.readthedocs.io/en/stable/)-managed apps, disaster recovery split across two cloud providers, and a full observability stack. Barely resembles the old cluster anymore, so this gets its own post instead of an update to the old one.

The one rule that hasn't changed, straight from the repo's README: **"Everything is in this repo - if it's not here, it doesn't exist on the cluster."** ArgoCD reconciles `main` against the live cluster. The only thing applied by hand is the bootstrap step that installs ArgoCD itself. Chicken, egg, you know how it goes.

## Hardware

![The homelab in its 9U rack, looking a lot more legit than a laptop balanced on a shelf](https://assets.alialjaffer.com/images/homelab/homelab.jpg)

- **Control plane (`cp0`)**: still the same 2012 MacBook Pro! 13", Intel i5, upgraded to 16GB DDR3, 256GB SATA SSD. New RAM after a crash-on-boot, an SSD swap with a thermal paste redo, and it has survived two full cluster rebuilds (`k3s` -> a `kubeadm` detour -> Talos). This laptop will not quit.
- **Workers (`wrk0`-`wrk3`)**: four Lenovo M920q Tiny boxes, Intel i5/i7, 16-32GB DDR4, NVMe. Each exposes its iGPU via Talos's `i915` extension for hardware transcoding, used by the media server.
- **GPU node**: a separate gaming PC, Ryzen 7 7800X3D, RTX 4070 Ti Super. Joins the cluster on-demand, tainted `gpu=nvidia`, for ML workloads. Way too expensive to leave running 24/7 for nothing.

![kubectl get nodes -owide, all 5 Ready, and kubectl get httproutes -A because I like proof](https://assets.alialjaffer.com/images/homelab/kubectl.png)

## The stack

- **OS/K8s**: Talos Linux, Kubernetes v1.36.2
- **Networking**: [Cilium](https://cilium.io/) as the CNI, Gateway API, no NGINX Ingress needed
- **Storage/DB**: [Longhorn](https://longhorn.io/) for storage, [CloudNativePG](https://cloudnative-pg.io/) for Postgres
- **GitOps**: ArgoCD, obviously
- **Secrets**: [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) + [SOPS](https://github.com/getsops/sops) for anything sensitive
- **Policy**: [Kyverno](https://kyverno.io/)
- **Metrics/logs**: kube-prometheus-stack + [Thanos](https://thanos.io/) + [Loki](https://grafana.com/oss/loki/)
- **DR**: [Velero](https://velero.io/) + Longhorn's own backup target
- **Power**: [Kepler](https://sustainable-computing.io/) feeds a power-cost panel in Grafana, priced in SAR since that's where this cluster lives

Why Talos instead of a regular distro plus `kubeadm`? No SSH surface to harden, API-managed end to end, fits the "everything through the repo" idea all the way down to the OS. It also, as it turns out, does not fit an EFI Mac out of the box. Which brings me to the best story in this whole project.

## The MacBook Pro vs. Talos Linux saga

Fully written up in [`docs/talos-intel-mac.md`](https://github.com/aliAljaffer/homelab/blob/main/docs/talos-intel-mac.md) in the repo, but here's the short version: three separate, unrelated firmware bugs, stacked on top of each other, on the same 14-year-old laptop. Seriously.

**Bug 1:** Talos 1.13+ switched their kernel build to Clang+LLD, and Apple's EFI firmware just rejects the resulting binary outright. Machine hangs at the boot logo, ZERO kernel output. Credit to GitHub user [virtualm2000](https://github.com/virtualm2000) for narrowing this down on [`siderolabs/talos` issue #13231](https://github.com/siderolabs/talos/issues/13231), since I built on their findings. For the workers, the fix was easy: just use Talos v1.12.7 instead, still within the supported version skew. Not an option for `cp0` though, since control-plane nodes all need the same Kubernetes version. So for the control plane I rebuilt the Talos kernel from source, stripping `LLVM: 1` out of the build config so it compiles with GNU `ld` instead. Cloned `siderolabs/pkgs`, stood up a local Docker registry and BuildKit builder, rebuilt the kernel, installer, and imager myself. About 1-2 hours, mostly compile time.

**Bug 2:** with a byte-for-byte correct kernel and a full install, the machine froze at the exact same screen anyway. This time it was `systemd-stub`'s status line, not the Talos logo, so the firmware clearly could run the binary fine. The freeze was happening inside `systemd-boot` itself, before the kernel even got a chance to run. Fix: swap `systemd-boot` for GRUB. Talos only lets you pick GRUB through the imager's disk-image build mode though, not through machine config, since the real installer hardcodes the choice on UEFI hardware. So I had to build a GRUB image separately and `dd` it straight onto the disk from rescue media.

**Bug 3, a bonus** found while fixing bug 2: Talos's GRUB build hardcodes `(hd0,gpt3)/grub`, assuming the boot disk is always disk 0. Once the installer USB came out, this Mac's firmware enumerated the internal disk as `hd1` instead. Of course it did. GRUB dropped to a rescue prompt on every cold boot, useless for a node that needs to survive an unattended reboot. Fixed by rebuilding just the GRUB binary with an embedded config that finds the boot partition by filesystem UUID instead of a disk number.

End result: a fully custom Talos image running as the control plane of a Kubernetes cluster, on a 14-year-old laptop, and it survives unattended reboots now. Still super proud of this one, I have to say.

## Disaster recovery, for real this time

I went auditing my backups a while back and found Velero had been silently failing 100% of the time, thanks to a bug in `velero-plugin-for-gcp:v1.13.0`'s backup-exists check. Not great! Fixed by bumping the version, and this time I actually verified it end-to-end instead of trusting a green checkmark.

![Velero's actual backup objects sitting in the GCS bucket, proof beats a green checkmark](https://assets.alialjaffer.com/images/homelab/velero.png)

Same audit, second surprise: Longhorn's own native backup target, completely separate from Velero, was pointing at nothing. Rather than fight GCS credentials into a shape Longhorn could use, I stood up a whole new AWS account and bucket just for this. Why a whole separate cloud account? So the two backups can't die together. **NOTE:** setting Longhorn's backup target through Helm values does _not_ update it once it already exists, only on first creation. Had to manage it directly as a Kustomize resource instead. A daily job now backs up every volume with 14-day retention, and I actually tested a restore instead of trusting the status field. Once bitten, twice shy!

![Longhorn's dashboard: 14 volumes, all healthy, nothing degraded](https://assets.alialjaffer.com/images/homelab/longhorn.png)

## Observability and networking

![The Cluster Health dashboard in Grafana, Kepler's power numbers and all](https://assets.alialjaffer.com/images/homelab/grafana.png)

kube-prometheus-stack, Thanos, Loki, and Grafana Alloy cover metrics and logs now, with Kepler thrown in for power draw. Getting every piece of infrastructure actually scraped was mostly grunt work, going chart by chart turning on `ServiceMonitor`s, since almost none of them expose metrics by default. A couple fought back and needed hand-written PodMonitors instead (looking at you, [`frr-k8s`](https://github.com/metallb/frr-k8s) and [ARC](https://github.com/actions/actions-runner-controller)). Worth it though: two real bugs only surfaced because the dashboards existed, including a GCS key that got rotated out from under Thanos and quietly broke it for a while before I noticed.

For networking, public traffic now goes through a dedicated Cloudflare Tunnel Gateway instead of per-app tunnel configs, and remote `kubectl`/`talosctl` access moved from an old SSH bastion to Cloudflare Zero Trust. Before writing any `NetworkPolicy`, I mapped real namespace-to-namespace traffic first using [Hubble](https://github.com/cilium/hubble) plus a grep across the whole repo, since I'd rather find the surprises before enforcement than after. Good thing too: Cilium enforces on the pod's real post-DNAT port, not the Service's declared port, and a couple of my services would've silently broken under a naive policy. The default-deny rollout still wasn't perfectly smooth either. I pushed it, it broke something, I reverted it, then it came back clean a bit later. Revert first, debug after.

## Conclusion

Going from a 2GB MacBook running `k3s` to a fully GitOps'd, disaster-recovered, actually-observable cluster took about ten months and a genuinely stupid amount of firmware debugging. The MacBook saga is still my favorite part of this whole project. Three unrelated bugs stacked on 14-year-old Apple hardware, and somehow it survives unattended reboots now. INSANE.

But honestly, what sticks with me is that the boring stuff mattered most: verifying backups actually restore, mapping traffic before writing a deny policy, rotating a credential the second I know it leaked instead of leaving myself a note. None of that is exciting to write about. But it's the difference between a homelab and a homelab you can actually trust.

Next up: getting ArgoCD's own metrics actually wired in, and finding out why the tunnel's metrics endpoint just won't respond. Onwards :)
