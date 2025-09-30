---
azure-3t-app:
  name: Azure Three-Tier web app
  caseStudyId: app
  description: Azure Three-Tier web app deployed using Terraform and containers
  repo: "https://github.com/aliAljaffer/azure-3t-app"
  images:
    - caption: "System Design - In-depth with the Azure Gateway"
      alt-text: ""
      url: https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/azure-3t-app/sd2.png
  show: true
---

# Azure Three-tier E-commerce App

## Overview

The frontend and backend code was provided by Mr. Saurabh Dhingra ([github/saurabhd2106](https://github.com/saurabhd2106)) as part of a project during the [DevOps & Cloud Computing Bootcamp](https://sda.edu.sa/ar/bootcamp/299) offered by [Saudi Digital Academy](https://sda.edu.sa/).

This is my first project on Azure! I'm an AWS advocator and after trying Azure, I still am an AWS advocator. Maybe even more than before. :)

## Demo

Youtube: [Azure three-tier web app deployment using Terraform](https://youtu.be/y5rP0JmYzTQ)

Visit my other repository: [terraform-3t-app-with-cicd](https://github.com/aliAljaffer/terraform-3t-app-with-cicd) to see how I integrated a CI/CD pipeline that deploys the resources using Terraform and handles building and pushing the Docker images to Dockerhub, which are in turn used in the Terraform configuration for App Service.

The entire pipeline is powered by this GitHub Actions workflow: [https://github.com/aliAljaffer/terraform-3t-app-with-cicd/blob/main/.github/workflows/3t-deploy.yml](https://github.com/aliAljaffer/terraform-3t-app-with-cicd/blob/main/.github/workflows/3t-deploy.yml)

## The Problem

The objective was to deploy the application in a secure and scalable way. I decided to spice the project up by using Terraform to manage the deployment of the application. Access to any of the resources (front or backend) had to be restricted to the application gateway ONLY.

## Approach

I began working on resources from the outside-in, as you would. Armed with my VS Code and the [AzureRM](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs) documentation pages on Terraform Registry. I already knew what I wanted to build, as I started the project with a rough system diagram of resources to provision. I started out using Container Apps and not App Service, but quickly switched to App Service for many reasons, including VNet integration. This would be helpful in subnet isolation of resources.

## Architectural Design

Not shown are monitoring alerts and autoscaling settings. This just serves as a good starting point for the actual design.

![System Design of the application, showing provisional resources. Not shown are monitoring alerts and autoscaling settings.](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/azure-3t-app/sd2.png)

## Key Outcomes

- Scalable solution, offering autoscaling based on CPU and Memory Utilization using Azure Monitor Autoscale settings.

- Monitors the provisioned resources for CPU/Memory/Network utilization and sends alerts via Email for remediation.

- Principle of least privilege is applied to Network Security Groups, offering a high level of security.

- Frontend, backend, and database all isolated in their own subnets with private communication between them using private endpoints for the database and IP restrictions on the frontend/backend, limiting communication to the Application Gateway.

- Application Gateway is the only form of public access available on the website, managing traffic using path-based routing between the frontend and backend.

## Challenges

- Container Apps use Container App Environments, which isolate containers and provide ease of communication between them. The problem is that these environments take a while to provision, are limited to one subnet, and have low usage limits on the Subscription provided by the bootcamp on Azure. It felt a waste to create an environment for each of the front and backend. So, I switched to App Services which didn't rely on environments and provided amazing features like autoscaling and VNet integration!

- Application Gateway settings have confusing naming like backend pool, backend setting, etc. I'm more used to AWS' Application Load Balancer and find them way easier to deal with compared to Azure AGW.

- Since I'm provisioning the infra on Terraform, I needed to create my container images such that they accepted environment variables like backend API URL (for the frontend to call) during buildtime. I built an `entrypoint.sh` script which was a hacky way of solving my issue using `find` and `sed` text replacements. I overcomplicated it and could've chose to go the Dockerfile `ARG` route.

## Conclusion

A very frustrating project to work on, mainly due to Azure-specific annoyances but I'm glad it's done! Enjoyed getting to know all the resources and how they work and connect together!
