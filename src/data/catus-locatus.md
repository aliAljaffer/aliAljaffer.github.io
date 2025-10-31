---
catus-locatus:
  name: Catus Locatus
  caseStudyId: catus-locatus
  repo: https://github.com/aliAljaffer/catus-locatus
  url: https://cl.alialjaffer.com/
  description:
    Location-based pet recovery web app using React and Leaflet maps to
    report and view lost pets.
  images:
    - caption: ""
      alt-text: ""
      url: ""
  show: true
  date: "2025-10-30"
---

# Catus Locatus

Publish date: `2025-07-01`

## Work In Progress

I'm working on redeploying this project using a different database and hosting provider! It's currently using Supabase for DB and is hosted on Vercel.

You can check out the current version here: [Catus Locatus](https://cl.alialjaffer.com/)

Github repositroy: [aliAljaffer/catus-locatus](https://github.com/aliAljaffer/catus-locatus)

## Major Update: Deploying to Kubernetes

I was sponsored by Saudi Digital Academy (SDA) to attend a 3-month DevOps Bootcamp conducted by IronHack. In it, I improved my skills in Bash scripting, Linux, GitOps, Azure, Ansible, Terraform, Kubernetes, and more. As part of the final project, we were given the task of deploying a three-tier application onto a Kubernetes Cluster (Azure Kubernetes Service). The application code was provided to us, but I chose to deploy this app instead.

You can find the source code of the Kubernetes-deployed version here: [aliAljaffer/catus-locatus-k8s](https://github.com/aliAljaffer/catus-locatus-k8s)

## Demo

Soon! Recorded, just need to upload.

## Overview

**Catus Locatus** is a lost pet finding app. Announce a pet you lost by showing others where it was lost. Other people can contact you if they find your pet! All pets are drawn on top of a Leaflet map, with dog/cat emojis for easier searching. The website only accepts coordinates of your current location, to reduce the number of false reports.

## My Role

My role in this project was more of a leading role than a developer. I still worked and developed alongside the team, but I was the one handling meetings and deadlines. I was also the repo owner so I set the main branch protections and on-PR checks using GitHub Actions. I took care of the more complex tasks, as well as designing the system architecture and the Kubernetes cluster.

## Approach

NOTE: I mentioned that we worked on this as a team, but the preceding week I worked on the entire project from scratch, just because I knew I was going to lead it so it was nice knowing what we were up against early on so I can prepare. So here when I mention I "wrote/built/developed/verbed" something, I'm referring to my early implementation of the project.

I began on creating a backend, because in my original project I was using `supabase`, which is a platform that provides you with a database and an API to go alongside it. Their free tier was generous, so I had no issues with that. But for this implementation, I needed a decoupled backend to work alongside the frontend. After building the backend in `expressjs`, I began writing the Dockerfiles.

### Containerization

Nothing fancy here, just a multi-stage build of a containerized app. The frontend image was a React app, so I simply built it and used an Nginx base image with an `nginx.conf`. Final image size was 58MB. Cool. The backend was Express.js, with the usual middleware. The image ended up being 140MB. A bit high for my liking but not too bad.

### Kubernetes

For Kubernetes, we had a choice on how to deliver the resources for it, because we were also going to use Terraform, and it has a Kubernetes provider already. I decided that if a resource makes more sense to create via Terraform, then we'd do it there. Otherwise, just write the YAML for it since it was quicker probably. Things like Kubernetes Secrets and ConfigMaps made more sense to write in Terraform, because the secrets were values you could get from the resources provisioned by Terraform's AzureRM provider, so it was better to store references to resources rather than hardcode the secret values in a YAML manifest for a Secret.

Additionally, I chose to go with the Helm provider as well, to install needed Helm Charts such as External-DNS, Cert-Manager, and Nginx-Ingress.

The folder structure looked like this:

```bash
ali@Ali:~/catus-locatus-k8s/k8s$ tree .
.
├── backend
├── frontend
├── monitoring
└── networking
```

Backend and frontend contained deployments and HPAs, the monitoring folder container deployments, configmaps, and services for Grafana and Prometheus, and the networking folder contained clusterIPs and an Nginx Ingress Controller.

### Terraform

Our main Infrastructure-as-Code tool. Since the domain we were using (this same one you're on!) is on AWS Route 53, we used the AWS provider. AzureRM worked well for Azure resources, and like mentioned before, Kubernetes and Helm providers were also used. I wrote the resource files in Module Pattern.

### CI/CD

For pipelines, I wrote them for Github Actions. I used a master workflow pattern, where only one workflow would be triggered on-push, and it would then run other workflows based on the changes made in the commit. This proved efficient because when making changes to the backend code, only the backend image would be rebuilt, eliminating unnecessary creation of images for the frontend.

### Teamwork and Project Management

To manage tasks, we used Trello boards to keep track of tasks. Trello proved a nice and quick way of writing To-Dos and attributing them to a person.

![Trello boards to divide tasks](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/catus-locatus/trello-board.png)

From Trello cards, we derived User Stories and wrote them in GitHub Issues. From these Issues, we'd begin working on them and then eventually submit a Pull Request, referencing the Issue we're solving. This was a great system and it kept track of changes well.

### Security

Hardened images.. etc

## System Design

WIP

## Outcomes

WIP

## Challenges

## Conclusions
