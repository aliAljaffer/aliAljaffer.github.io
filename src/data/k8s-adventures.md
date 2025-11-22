---
k8s-adventures:
  name: The Kubernetes learning journey (so far)
  caseStudyId: k8s-adventures
  description: Sharing thoughts after getting into the administration side of K8s
  repo: ""
  url: ""
  images:
  show: true
  date: "2025-11-22"
  type: "blog"
---

Publish date: `2025-11-22`

# The Kubernetes learning journey (so far)

I've been getting in-depth with Kubernetes lately; from watching YouTube videos on real-life projects with it, to building a multi-node homelab with a K3s cluster. (And now another cluster using `kubeadm`)

Most recently, I started building clusters from scratch using `kubeadm` on 4 Virtual Machines (1 control plane, 3 workers), and this is what I learned so far:

## Ansible is your friend!

Along with Vagrant for easy VM provisioning, Ansible helps so much with running commands in parallel to make sure all the VMs are identically-configured 👌 Sure, you could run a pre-built image with `kubeadm`, `kubectl`, `kubelet`, and other configs pre-configured, but where's the fun in that? ;) Plus, configuring systems to be Kubernetes-ready is an extremely good skill to have for on-prem cluster administration!

## Backing up and restoring `etcd`

In managed environments like AKS (Azure), GKE (Google), or EKS (AWS), I didn't really focus on the inner workings of a cluster - I just wanted it to work. And that's actually one of the main benefits of using a managed service for K8s. But in a bare-metal environment, backing up `etcd` is essential. Think of it like the state file in Terraform - it stores information on what pods, deployments, services, etc are running in the cluster. Losing your `etcd` database means losing access to the core benefit of K8s: orchestration.

## Linux helps. A ton!!

Yes, knowing the `kubeadm` and `kubectl` commands makes your life easier. But do you know what makes this learning journey smoother? Knowing Linux! There's just so much file and directory manipulation, input redirections, piping, and Bash scripting that would improve your quality-of-life so much as a Kubernetes developer or administrator. Seriously, you can not skip straight to Kubernetes without first familiarizing yourself with Linux and the command line. It is night and day difference!

## "Cattle, not pets"

I learned this saying, which is a design philosophy where you treat your systems that you build as **cattle**: easily replaceable and disposable, and not **pets**: precious, unique and irreplaceable. As soon as cattle (server, cluster, whatever) is lost, be ready to immediately replace it with a new identical (Or nearly identical) one. Practice GitOps and Infrastructure as Code to achieve this!
