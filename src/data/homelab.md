---
homelab:
  name: K3s Cluster Homelab
  caseStudyId: homelab
  description: Documenting my homelabbing journey! :)
  repo: ""
  url: ""
  images:
  show: true
  date: "2025-11-05"
  type: "blog"
---

Publish date: `2025-11-05`

# K3s Cluster Homelab

## Overview

This is a project I wanted to work on for some time now. Creating my own Kubernetes cluster, starting with `k3s` and moving onto `kubeadm` later! To start with my first node and control plane, I'm using a Macbook Pro Mid-2012 system with Ubuntu 24.04 installed. As of November 1st, 2025, it has 2GB RAM and a 500GB HDD.

The end-goal is to add a few more nodes and use this cluster to learn K8s networking, Persistent Volumes, and Cluster administration. And to also use Pi-Hole ;)

Why `k3s`? It's not as resource-heavy as other cluster managers. Lightweight enough to run on a Raspberry Pi. But as soon as I upgrade the RAM, I'll probably move to `MicroK8s`

## Nodes

- Control Plane: Macbook Pro, Mid-2012
  - OS: Ubuntu 24.04
  - RAM: 2GB ~Upgraded~> 16GB DDR3
  - Storage: 500GB HDD ~Upgraded~> 240GB SSD
  - CPU: Some Intel i5 2.5Ghz
- GPU Node: Custom-Built PC
  - OS: Fedora Workstation 43
  - RAM: 32GB
  - Storage: 3x 2TB NVMe
  - CPU: AMD Ryzen 7 7800x3D
  - GPU: RTX 4070 Ti Super

## Running Deployments

- [Pi-hole](https://pi-hole.net/)
- [Nvidia Runtime Class](https://developer.nvidia.com/container-runtime) for MLOps workloads, still needs testing
- [MetalLB](https://metallb.io/): To give LoadBalancer services a Private IP address on my network
- [Prometheus](https://prometheus.io/) + [Grafana](https://grafana.com/): Metrics and monitoring dashboards for the cluster
- Git Runners with [Action Runner Controller (ARC)](https://github.com/actions/actions-runner-controller): Now I can access private IPs on my network thanks to self-hosting the runners!

## Helm Charts Used

- [MetalLB](https://metallb.io/)

## Photo updates

### UPDATES Nov. 8, 2025

#### Self-hosted GitHub Action Runners!

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/homelab/runner.png)

Ran my first workflow to build and deploy THIS website on a Kubernetes pod! :)

#### RAM upgrade! 2GB -> 16GB

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/homelab/after-ram-upgrade.png)

### UPDATES Nov. 6, 2025

#### New node!

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/homelab/updated.png)

- New node specs:
  - `OS`: Fedora Workstation 43
  - `CPU`: AMD 7800x3D
  - `Memory`: 32GB
  - `GPU`: RTX 4070 Ti Super
  - Tainted with `gpu=nvidia` to run exclusively for ML workloads
- Prometheus + Grafana Monitoring stack with External IP using MetalLB for Grafana
- Pi-hole now runs its service as `NodePort`

#### Grafana Control Plane Monitoring

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/homelab/grafana.png)

### UPDATES Nov. 5, 2025

#### Pi-Hole

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/homelab/pihole.png)

#### Upgrades

##### Before SSD upgrade

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/homelab/pre.jpeg)

##### After: SSD upgraded, thermal paste changed

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/homelab/post.jpeg)

#### Cluster is ready! 😊

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/homelab/l.jpeg)

## Text Updates

`2025-11-08`: (`ram`) Ram arrived, works wonderfully!

`2025-11-07`: (`nodes`) Added new Node running Fedora, 32GB RAM, AMD 7800x3D, and RTX 4070 Ti Super for ML workloads (tainted)

`2025-11-06`: (`pihole`) Pi-Hole is running and blocking! :)

`2025-11-05`: (`os`) Purchased a Kingston 240GB SSD off Amazon, installed Ubuntu 24.04 LTS!

`2025-11-01`: (`ram`) Well. One of the RAM sticks is causing the system to crash on boot. Time for new ones. Ordered 2x8GB DDR3 sticks.

`2025-11-01`: (`start`) Journey starts! Acquired this old Macbook from my sister. i5 2.5Ghz, 4GB RAM, and a WD Blue 500GB HDD.
