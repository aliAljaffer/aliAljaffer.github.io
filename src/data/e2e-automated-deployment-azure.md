---
e2e-automated-deployment-azure:
  name: End-to-End Automated App Deployment on Azure
  caseStudyId: e2e-automated-deployment-azure
  description: A template example
  repo: "https://github.com/aliAljaffer/e2e-automated-deployment-azure-app"
  url: ""
  images:
    - caption: ""
      alt-text: ""
      url: ""
  show: true
  date: "2025-10-08"
  type: "project"
---

# End-to-End Automated App Deployment on Azure

Publish date: `2025-10-08`

## Overview

This is an improvement from the first project, [Azure Three-tier E-commerce App](https://alialjaffer.com/case-study/azure-3t-app/), where deployment is fully automated using CI/CD principles and pipelines. Visit the repository: [aliAljaffer/e2e-automated-deployment-azure-app](https://github.com/aliAljaffer/e2e-automated-deployment-azure-app/tree/main)

## Demo

No demo, but I did create videos to help other teams implement a similar solution. It's a pretty lengthy one.

- [devops week5 day5 PART 1: EXTRA assignment - building infrastructure with Terraform using modules](https://youtu.be/RI0ltdZAduY)
- [devops week5 day5 PART 2: EXTRA assignment - building infrastructure with Terraform using modules](https://youtu.be/lrWJ69lk2Rg)
- [devops week5 day5 PART 3: EXTRA assignment - building infrastructure with Terraform using modules](https://youtu.be/dcckcMC6nko)
- [devops week5 day5 PART 4: EXTRA assignment - building infrastructure with Terraform using modules](https://youtu.be/BuIeE5QwKoY)

## The Problem

> You are a team tasked with migrating a legacy app from a single on-prem VM to Azure because the old setup failed on scalibility, availability, and security. Right now, infra provisioning and code deploys are manual. Your job is to design, automate, and prove a production-style 3-tier architecture on Azure.

This should be a fun one!

## Approach

For the application, we'll host it as a containerized Azure Web App. It provides a simple platform to deploy and manage the versioning and scaling of your containers. The database will be Azure SQL (MSSQL) database, another managed solution. Additionally, for testing purposes, we'll add a VM for testing purposes in the same Virtual Network as the other resources. Using an Application Gateway with path-based routing, we'll restrict any public access to our application, and only allow access via the App Gateway public IP.

In another Virtual Network, we'll deploy a VM hosting a SonarQube server, to run code scanning and analysis in our CI/CD pipelines. Monitoring will be done via Application Insights and Alerts. This includes the monitoring for autoscaling the web app. To access the Azure subscription from CI/CD pipelines, we'll use a Service Principal.

## Architectural Design

### Main System

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/e2e-automated-deployment-azure/system-design.png)

The diagram shows the proposed system along with the resources we'll use. Each tier of the application will be in its own subnet, with string Network Security Group rules for Inbound and Outbound connections.

### Different Pipelines

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/e2e-automated-deployment-azure/workflows.png)

The four different workflows we'll use. None of these run on push events, rather on `workflow_call` by the master workflow that we'll look at next.

### CI/CD - Master Workflow

![](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/e2e-automated-deployment-azure/master-workflow.png)

First time implementing this pattern. Makes sense and is actually efficient. Will defenitely be using this approach in my future projects.

## My Role

As Team Lead and Scrum Master, I led a team of 5 DevOps Engineers through the project. My responsibilities included:

- **System Architecture Design**: Designed the entire three-tier architecture, network topology, and CI/CD pipeline structure
- **Master Workflow Implementation**: Developed the orchestrator workflow pattern that intelligently triggers only the necessary pipelines based on changes
- **Ansible Integration**: Transitioned from cloud-init scripts to Ansible for SonarQube configuration, implementing idempotent password management and token generation
- **Team Coordination**: Managed meetings, deadlines, task distribution via Trello, and code reviews
- **Technical Implementation**: Worked alongside the team on complex tasks including workflow orchestration, secrets management, and infrastructure automation

## Implementation Details

### Containerization

Both frontend and backend applications were containerized using multi-stage Docker builds to optimize image sizes and security:

**Frontend (React + Vite)**: Multi-stage build using Node.js Alpine for building and Nginx Alpine for serving. Implemented runtime environment variable injection to avoid rebuilding images for different environments. Final image includes health checks and runs on port 80.

**Backend (Java Spring Boot)**: Multi-stage build using Maven for dependency resolution and compilation, with Eclipse Temurin JRE for runtime. The build process includes dependency caching to speed up subsequent builds. Exposes port 8080 with built-in health checks.

Both images are tagged with commit hashes for version tracking and pushed to DockerHub, allowing precise rollbacks and deployment tracking.

### Infrastructure as Code - Terraform Modules

The infrastructure follows a modular Terraform structure with 10 distinct modules:

```
terraform-all/
├── azure/
│   ├── appgw/          # Application Gateway with WAF
│   ├── appservice/     # Frontend & Backend Web Apps
│   ├── db/             # Azure SQL Database
│   ├── monitoring/     # Application Insights & Alerts
│   ├── nsg/            # Network Security Groups
│   ├── privatedns/     # Private DNS Zones
│   ├── resourcegroup/  # Resource Group
│   ├── subnet/         # Subnet Configuration
│   ├── vm/             # Test VM
│   └── vnet/           # Virtual Network
└── main.tf
```

This modular approach enables:

- **Reusability**: Modules can be used in other projects
- **Maintainability**: Changes are isolated to specific modules
- **Testing**: Individual modules can be tested independently
- **Scalability**: Easy to add new resources without affecting existing ones

### CI/CD Pipeline Architecture

The pipeline follows a master-orchestrator pattern with four distinct workflows:

1. **Master Workflow**: Detects changes using path filters and triggers appropriate workflows
2. **SonarQube Workflow**: Provisions SonarQube VM via Terraform, configures it using Ansible
3. **Frontend/Backend Workflows**: Build, test, scan code, push Docker images with commit-hash tags
4. **Infrastructure Workflow**: Provisions/updates Azure infrastructure with new image tags

**Pipeline Efficiency**: The master workflow only triggers changed components. For example, a backend-only change won't rebuild the frontend or unnecessarily provision infrastructure unless Terraform files changed. This saved significant build time and compute costs.

### Configuration Management with Ansible

The Ansible playbook (`configure-sonarqube.yml`) handles SonarQube configuration with production-ready error handling:

- **Idempotency**: Checks if password is already changed before attempting to change it
- **Retry Logic**: Waits up to 45 attempts for SonarQube to be ready (Docker container startup)
- **Token Management**: Revokes existing tokens before generating new ones to avoid conflicts
- **Security**: Uses `no_log: true` for all sensitive operations
- **Validation**: Validates generated tokens before saving to ensure they work

This eliminated the need for manual SonarQube configuration after each deployment! saved us time

### Network Security

Network segmentation using subnets with dedicated NSGs:

- **Frontend Subnet**: Only accepts traffic from Application Gateway
- **Backend Subnet**: Only accepts traffic from Application Gateway
- **Database Subnet**: Completely isolated, accessible only via Private Endpoints
- **VM Subnet**: SSH access for testing purposes
- **Endpoint Subnet**: Hosts Private Endpoints for App Services
- **Application Gateway Subnet**: Only public-facing component

Private DNS zones enable App Services to resolve private endpoint addresses internally, ensuring database connections never traverse the public internet.

## Key Outcomes

**Fully Automated Infrastructure Deployment**: Automated and fully deployed application in under 20 minutes! Using Terraform and GitHub Actions. The entire infrastructure can be torn down and recreated with `terraform destroy` and a single push to main (orrrr PR merge), enabling quick environment provisioning for development, staging, and production.

**Intelligent CI/CD Pipeline**: The master workflow pattern reduced average pipeline execution time by ~60% compared to running all workflows on every push. (Yup, we checked) Path-based change detection ensures only affected components are rebuilt and redeployed, saving compute costs and developer time.

**Production-Grade Security**: Achieved zero direct public access to compute resources and databases. All traffic flows through Application Gateway with WAF v2 (OWASP 3.2 rules), path-based routing directs traffic appropriately, and Private Endpoints ensure database connections remain internal to the VNet.

**Commit-Based Versioning**: Docker images are tagged with commit hashes (`fe-a1b2c3d`, `be-a1b2c3d`), enabling precise rollback capabilities. If a deployment fails, we can instantly redeploy the previous working version by referencing its commit hash.

**Automated Code Quality Gates**: SonarQube integration in the pipeline catches code quality issues, security vulnerabilities, and code smells before deployment. Failed quality gates block the pipeline, preventing problematic code from reaching production.

**Infrastructure as Code Benefits**: All infrastructure defined in version-controlled Terraform modules enables:

- Reproducible environments across regions or subscriptions
- Infrastructure changes reviewed via Pull Requests
- Automated testing of infrastructure changes
- Documentation through code

**Monitoring and Auto-scaling**: Application Insights monitors application health, performance metrics, and custom events. Auto-scaling rules configured via Terraform automatically scale App Service plans based on CPU utilization, ensuring the application handles traffic spikes without manual intervention.

**Team Collaboration**: Using Trello for task management, GitHub Issues for user stories, and Pull Request workflows ensured all 6 team members could work in parallel without conflicts. Protected main branch with required reviews maintained code quality.

## Challenges

**Master Workflow Orchestration**: Getting the workflows to communicate properly was the biggest challenge. Passing outputs between workflows, handling conditional execution, managing secrets inheritance, and ensuring proper job dependencies took approximately 100 workflow runs to perfect. The difficulty came from GitHub Actions' limitation in passing complex data between reusable workflows and the need to handle skipped jobs gracefully.

**Solution**: Implemented a robust conditional logic structure using `needs.*.result` and `contains()` functions to handle all possible workflow states (success, failure, skipped). Used `workflow_call` inputs/outputs for data passing and `secrets: inherit` for seamless secret propagation.

**Application Gateway 403 Errors**: After provisioning the Application Gateway, we encountered persistent 403 errors with no clear logging. The investigation revealed conflicting configurations between HTTP (80) and HTTPS (443) listeners, along with improper backend pool health probe settings.

**Solution**: Removed the HTTPS configuration initially to isolate the issue. Configured proper health probes matching the backend applications' health endpoints (`/health` for backend, `/` for frontend). Implemented incremental changes with testing between each change to identify root causes precisely.

**Ansible Idempotency for SonarQube**: The SonarQube container takes 2-4 minutes to fully start, and Ansible needed to handle cases where the password was already changed from previous runs. Initial attempts would fail if ran twice because the default password no longer worked.

**Solution**: Implemented a check-before-action pattern: First try the new password, if it fails, try the default password, then decide if password change is needed. Added retry logic with 45 attempts and 10-second delays to wait for SonarQube startup. This made the playbook truly idempotent and reliable.

**Database Private Endpoint DNS Resolution**: App Services couldn't resolve the private endpoint DNS names for the Azure SQL Database for some reason, resulting in connection timeouts. The issue stemmed from improper Private DNS Zone configuration and missing VNet links.

**Solution**: Created Private DNS Zones for `privatelink.database.windows.net`, linked them to the VNet, and configured the App Service VNet integration to use the private DNS zone. This ensured all database traffic stayed within the VNet.

**Terraform State Management in CI/CD**: Multiple team members triggering workflows simultaneously could lead to state lock conflicts. Additionally, the state file contained sensitive information and needed secure storage.

**Solution**: Configured Azure Storage Account backend for Terraform with state locking enabled. This prevented concurrent modifications and stored the state file securely. Used workspaces in local development to avoid conflicts during testing.

## What Could Improve

- **HTTPS/TLS Termination**

- **Database Backup Strategy**

- **Secrets Management**

## Conclusion

This project successfully transformed a legacy manual deployment process into a fully automated, production-ready CI/CD pipeline. The implementation demonstrates modern DevOps practices including Infrastructure as Code, containerization, automated testing, and intelligent pipeline orchestration.

Working as Team Lead provided valuable experience in coordinating a distributed team, managing complex technical dependencies, and making architectural decisions under time constraints. The team successfully delivered the project in one week, from initial design to full deployment, while incorporating feedback and adapting to challenges. Super proud of them!!
