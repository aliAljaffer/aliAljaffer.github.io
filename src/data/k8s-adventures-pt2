---
k8s-adventures-pt2:
  name: The end (?) of the Kubernetes learning journey
  caseStudyId: k8s-adventures-pt2
  description: After achieving Kubestronaut, am I done with Kubernetes?
  repo: ""
  url: ""
  images:
  show: true
  date: "2026-02-15"
  type: "blog"
---

Publish date: `2026-02-15`

# The end (?) of the Kubernetes learning journey

As a follow-up to [The Kubernetes learning journey (so far)
](https://alialjaffer.com/case-study/k8s-adventures/), I've actually gone and achieved Kubestronaut status, by passing all five Kubernetes exams from the Cloud-Native Computing Foundation (CNCF): **CKAD** (Dec. 13, 2025) -> **CKA** (Dec. 19, 2025) -> **KCNA + KCSA** (Jan. 31, 2026) -> **CKS** (Feb. 8, 2026).

Now let's go through what I learned working on each one! But before we do, here general tips that apply to all the exams:

## Tips

- The exam is online-only. And the exam environment and experience is absolutely horrible. There is so much lag, your commands are slow, the keystrokes don't go through sometimes. If latency is high, you can contact support for a re-take. So just be prepared for a less-than-ideal experience. If you do the Killer.sh exam sessions, it's basically the same or worse.
- Never pay full price. Seriously, CNCF offers discounts very frequently. The good ones are 40%-60%. For this, I used [Kube Promo](https://kube.promo) to check any current promotions running.
- Get used to `kubectl`, and set it as `k` with an alias. You can do this via running the Linux command: `alias k='kubectl'`. It may seem like a small change, but trust me, most of your exam you'll be writing `kubectl` ALOT. The exam environment already comes with the alias set-up for you!
- Get used to a text editor. I used `vim` on daily basis and memorized some of its keyboard shortcuts. Things like highlighting a block, then indenting it one tab ahead will come in HANDY.
- For most resources, do not write the YAML from scratch!! Utilize `--dry-run=client -o yaml` flags after a `k get` or `k create` commands.
- Know your way around the documentation. In every exam, I ran into one or two questions where I had no idea what it was asking of me, because I didn't cover that part in my studies, or it's something that's newly added I didn't pay attention to. Knowing how to search and navigate the documentation is so useful.
- On the topic of documentation, on each question you'll have documentation links to whatever the question is asking you for. Asked to change the number of replicas on a deployment? A link to the "Deployment" page will be provided to you. Make sure to always check the links section because it might contain hints on what method you should take to approach the question!
- Always check [killercoda](https://killercoda.com/)'s scenarios for fun practices on various topics for each exam. For me, I've done the scenarios twice before attempting the real exam.
- When you purchase an exam voucher, you get access to simulated environments that show you how the exam looks and feels like. Go through it (or "them", in the case of CKA and CKS because you get two different environments) and make sure you time yourself.
- Use [https://kubespec.dev/](https://kubespec.dev/) to familiarize yourself with every possible field on the YAML manifests for the current patch.
- `kubectl explain` is your in-terminal documentation. Very valuable!
- Use the [Network Policy Editor](https://editor.networkpolicy.io/) for both native K8s policies and Cilium policies.

## CKAD: Certified Kubernetes Application Developer

Here, you learn how to configure compute workloads such as deployments, pods, statefulsets, jobs, and cronjobs for your application. Then you mix in services and their different types to choose how to expose your application. Also, you'll need to know how to inject configurations (ConfigMaps) and sensitive information like passwords (Secrets).

### CKAD-Specific Tips

- Run a Minikube cluster on your local machine and play around.
- If you want to test connectivity to a deployment or pod, but it's using a `ClusterIP` service, make use of the `kubectl port-forward` command
- Know and use the short names of the resources. `ConfigMap` can be replaced with `cm`, `StatefulSet` can be replaced with `sts`, etc. Use `kubectl api-resources` to view the short version for each resource, if available.
- Remember that you can create Secrets or ConfigMaps straight from a file using `kubectl create cm --from-file=path/to/file`

## CKA: Certified Kubernetes Administrator

You've leveled up to an Administrator! Now, you're responsible of not only the applications running, but the entire cluster! From making backups of `etcd`, to working with RBAC for users, to then upgrading the cluster and its nodes - the cluster is your baby that needs care. This exam is tougher than the CKAD - the tasks are lengthy but the exam time is the same, 2 hours. Though you are not required to have completed the CKAD here, there might be some questions where you need to edit some deployment or secret. So knowledge of CKAD topics is important, as well.

### CKA-Specific Tips

- Get to know NetworkPolicy and how to create and test them. Run scenarios where you want to restrict an entire namespace, and others where you just target some pods.
- Learn the combinations of `Roles`, `ClusterRoles`, `RoleBindings`, and `ClusterRolebindings` and when to use each.
- Learn the steps to backup and restore an ETCD. It honestly didn't show up for me in my exam, but it did show up in both my simulator sessions on `killer.sh`
- Get familiar with Gateway API - I think starting from `CKA 1.34`, Ingress was changed to Gateway API.
- Know where the ServiceAccount tokens are stored and how to disable automounting them.

### Code Snippets

#### ETCD Backup Steps

```bash
# Describe the etcd pod for information used in Restore step
k describe -n kube-system pod etcd-controlplane

# Save snapshot of ETCD to /opt/cluster_backup.db
ETCDCTL_API=3 etcdctl snapshot save \
/opt/cluster_backup.db \
--endpoints=https://localhost:2379 \
--cacert=/etc/kubernetes/pki/etcd/ca.crt \
--cert=/etc/kubernetes/pki/etcd/cert.crt \
--key=/etc/kubernetes/pki/etcd/cert.key
```

#### ETCD Restore Steps

```bash
# Stop the API Server
mv /etc/kubernetes/manifests/kube-apiserver.yaml /tmp
# Restore snapshot of ETCD from /opt/cluster_backup.db to /opt/new-dir
ETCDCTL_API=3 etcdctl snapshot restore \
/opt/cluster_backup.db \
--data-dir=/opt/new-dir \
--initial-cluster=<from-describe> \
--initial-advertise-peer-urls=<from-describe> \
--name=controlplane
# Update the etcd manifest volume path to /opt/new-dir

# Undo step 1, move the API server back to the manifests folder and wait for the API to go live
mv /tmp/kube-apiserver.yaml /etc/kubernetes/manifests
```

## CKS: Certified Kubernetes Security Specialist

The big guy. The scary exam. And it was. This exam requires that you have passed the CKA - so it already assumes you have a certain level of knowledge on Kubernetes. And it's tough. It tests your security awareness. Whether you can apply security best practices on Kubernetes or not. You will be tested on: Threat Modeling, Host Security, Securing Dockerfiles, `securityContext`s, TLS Termination, User creation and RBAC, writing Falco policies, and much more.

The tasks are tedious, you're given broken clusters with unfinished configurations to try and fix, and more. The PSI environment was horrible to me here, more than usual. It started out fine, but gradually as the exam progressed, it was unbearable that I just left the session with 14 minutes to spare.

The main difficulty comes from the number of new tools you need to be familiar with: Falco, OPA Gatekeeper, Trivy, SBOM, BOM, Cilium, Istio, and even more..

### CKS-Specific Tips

- In addition to knowing NetworkPolicies, now you need to familiarize yourself with Cilium Network Policies!
- Use all the tools and know how to extract information using them, the tools I encountered in my CKS exam were: `bom`, `trivy`, `falco`, `kube-bench`, and enabling `istio` on a namespace.
- Practice creating new users using `openssl`, along with signing certificates both manually and via the Kubernetes API
- On the topic of `openssl`, know how to: Create a key, create a certificate signing request, and creating a certificate.
- Learn how to create a default deny Network Policy, and how to restrict access to the metadata server.
- Study the contents of the directory `/etc/kubernetes` along with inspecting the manifests. It's crucial!
- In worker nodes, another useful directory to know is `/var/lib/kubelet` it contains the Kubelet configurations
- To view pod logs when the API server is down, go to `/val/log/pods` where you'll find directories for each pod and inside you'll have the `.log` files.
- Learn how to enable Audit Logging and the four logging levels: `None`, `Metadata`, `Request`, `RequestResponse`
- Give Kubernetes Goat (Found in Links below) a try - it's an intentionally vulnerable Kubernetes cluster that has many security holes that you'll fix.

### CKS Links

- [Issue a Certificate for a Kubernetes API Client Using A CertificateSigningRequest](https://kubernetes.io/docs/tasks/tls/certificate-issue-client-csr/)
- [Upgrading kubeadm clusters](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/)
- [Auditing](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/)
- [Kubernetes Goat](https://madhuakula.com/kubernetes-goat/)

## KCNA: Kubernetes and Cloud-Native Associate, KCSA: Kubernetes and Cloud Native Security Associate

These are multiple choice quizzes. THese should be a breeze after finishing the CK\* exams. If you're going for Kubestronaut, always do these last. I say this because CKS is TOUGH and lots of people got discouraged by it - so doing the KCNA and KCSA AFTER you cleared the CKS saves you money in the sense that these two are not really that important, and you won't feel pressured or stressed when doing the CKS if you haven't done these two yet.

No tips, just these two cool websites: [KCNA Practice Exams](https://kcsa.purutuladhar.com/) and [KCSA Practice Exams](https://kcna.purutuladhar.com/), both by [Puru Tuladhar](https://www.purutuladhar.com/).

## Conclusion - Is it the end?

No, it's not. Kubernetes is an ever-evolving platform that you don't really stop learning. Since it's open-source, more and more plugins and additions are released that solve some problem your company has so you start learning it - like recently when I discovered [KEDA: Kubernetes Event-Driven Architecture](https://keda.sh), which offers Scalers that scale your application workload based on the number of jobs or messages in a specific queue. It supports MySQL, PostgreSQL, Redis, and so much more.

In truth, I feel like the journey is just beginning with Kubernetes! 🚀🚀🚀
