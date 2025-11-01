---
body-power-gym:
  name: Body & Power Gym
  caseStudyId: body-power-gym
  repo: ""
  url: ""
  description:
    Volunteer-built website for a local gym using Next.js, Docker, and
    Strapi CMS for fully managed and responsive content delivery.
  images:
    - caption: A summary of what leads to a scale down or up - in writing
      alt-text: A summary of what leads to a scale down or up - in writing
      url: https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/body-power-gym/scaling-summary.png
    - caption: Photos from the gym - Legs workout section
      alt-text: ""
      url: https://bodypowergym.s3.me-south-1.amazonaws.com/lowq_half_size_01215_1223fe5826.jpg
    - caption: Photos from the gym - Near the Entrance
      alt-text: ""
      url: https://bodypowergym.s3.me-south-1.amazonaws.com/lowq_half_size_01218_ab4c9d67ee.jpg
    - caption: Photos from the gym - 1st Floor - "The Studio"
      alt-text: ""
      url: https://bodypowergym.s3.me-south-1.amazonaws.com/lowq_half_size_01198_b849ea6b83.jpg
  show: true
  date: "2025-07-01"
  type: "project"
---

# Body & Power Gym

Publish date: `2025-07-01`

## Overview

Body & Power Gym (BAPGYM) is a gym local to Tarut Island community. It serves hundreds of gym-goers daily and provides weight-lifting stations, free weights, spa, sauna, studio space, two cardio sections, and more. I volunteered to create a website and discussed it with the gym owner. I spent two-three weeks gathering requirements and getting feedback for progress. Once I got the gist of what they needed, I started working on the project.

The project is a frontend (Next.js) and a CMS backend (Strapi) hosted entirely on AWS.

## Demo

Link to demo and architecture overview: [https://www.youtube.com/watch?v=Iisu17KC55k](https://www.youtube.com/watch?v=Iisu17KC55k)

## The Problem

The gym's only online presence is through an Instagram account. The prices posted are not up-to-date, nor are the class schedules. As a user of the gym, I decided to take-on the mission of building their website!

One of the requirements was that they needed to manage their own content. I had never worked with a CMS before, so I was holding back on going for it until one day I just started coding it up.

The other requirements included: Pages for offers, subscription plans, and an image gallery.

## Technical Skills Demonstrated

- **AWS Services**: VPC, ECS Fargate, ALB, ECR, CodeBuild, EventBridge, CloudWatch, Lambda, Certificate Manager, RDS, NAT Gateway, Security Groups, IAM, CloudFormation
- **Containerization**: Docker, multi-stage builds, container orchestration, image optimization
- **CI/CD**: GitHub Actions, CodeBuild, automated testing, webhook integrations
- **Infrastructure**: Network design, load balancing, SSL/TLS configuration, auto-scaling policies
- **Monitoring**: CloudWatch metrics, EventBridge rules, alerting systems, log aggregation
- **Security**: Network segmentation, least-privilege access, encryption in transit, vulnerability scanning
- **DevOps**: Infrastructure as Code (soon!), configuration management, deployment automation, rollback strategies

## Approach

### Pre-Technicalities

I do photography as a hobby, so I did all of the photography shots for the gym, as well! Was a pretty cool experience, but the low-light conditions in the gym were a struggle.

![A quick snap near the upper-body section!](https://bodypowergym.s3.me-south-1.amazonaws.com/lowq_half_size_01208_2474e9b949.jpg)

### Now to the Technical

For the frontend I went with Next.js. It's such an easy-to-work-with framework that can do it all for me. Especially since I knew I needed routing pages and wanted persistent urls for routes.

### The Backend

I went with Strapi because it seemed easy to work with, just looking at the documentation. (And it was.) It also has great features like Webhook integration, plugins like i18n, and the support for 3 database engines: SQLite, MySQL, PostgreSQL. For development, I started with SQLite, as it was lite (heh), local, and easily transferrable. For production, I knew I'd switch to MySQL due to my familiarity with it. For file uploads like images and videos, I set up an S3 bucket and used Strapi's `plugins.js` file to configure the upload parameters.

### Isolating Services

For this project, I valued security. All services that should be isolated are in a private subnet of a VPC, with a NAT gateway attached for updates.

### Containers?

I also thought, why not containerize? Containerization would tremendously help with scalability of the website. The website is under load? Spin up another instance. Not too busy? Scale down. I containerized each of the two layers: frontend and backend. With this solution, I can **cost-optimize** by launching the backend on an ECS Fargate _Spot_ instance - to get discounts up to 70%! Moreover, when there's no traffic going the backend's way, I can **scale-to-zero**, for even more savings on cost. The decision to decouple the app definitely paid off. Additionally, there are only 5 staff members at the gym, so no worries around the availability of Spot instances.

Unlike the backend instance, the frontend container would be the one always running, and getting **Auto Scaling**, as it'd be the one seeing most of the traffic. I set a `minimum: 1`, `maximum:5`, and a `desired:1` as initial numbers. Thanks to ECS, I can always scale-up or -down in seconds.

### Balancing the Load

To direct traffic to the instances, I used an Application Load Balancer which is perfect for conditional routing of traffic and load balancing. With an `HTTPS:443` listener, I setup a rule to redirect traffic to the backend, if the hostname was `admin.bapgym.com`, and to direct to the frontend for any others, like `bapgym.com`. I also added an `HTTP:80` listener that redirected traffic to HTTPS. I added a `CNAME` record for both domains that pointed to the ALB's DNS name. And voila!

### The Database

After I was done with website development, database schema planning, and filling out data, the website was locally-working. Now is the time to move the database to AWS. And **RDS MySQL** was a breeze to work with. As I mentioned earlier, all services that should be isolated, were isolated, so was the RDS instance. I placed it in a private subnet, right next to the backend, and disabled public accessibility. I added security groups to allow inbound traffic on port 3306 (MySQL) if the source was the backend, and only the backend. Now the database is locked-in tight.

### Auto Scaling... In/Out?

So, for the ALB to work, it had to send health checks to both instances. Health checks mean just what they sound like - the ALB checks how healthy an instance is. If it's under load, it'll help out in redirecting traffic to another identical (and running) instance, if possible. But the issue was that for an ECS service to scale down, it had to have inactivity. Health Checks "ping" an endpoint of an instance, and it returns a `Response 200 - OK`. So, the act of Health Checking keeps the instance alive... forever. Which defeats the purpose of wanting to scale-down the backend to zero!

#### The Solution

I built a Lambda function, and setup an EventBridge rule. Every 5 minutes, trigger the Lambda function. Then, the Lambda function would check CloudWatch metrics `RequestCount` and see which of the request in the past time window (5 minutes, currently) where health checks, and which were real requests. If all of the requests were health checks, **I knew to scale down to zero**.

### A Cold-Start

Now, another issue. Once the backend is scaled-down to zero, accessing the Strapi admin dashboard (`admin.bapgym.com`) would result in a `503 Service Temporarily Unavailable`. How would I trigger it to "wake up" in case a staff member needed it?

#### The Solution, Vol. 2

The same lambda function comes to the rescue. This time, we will be counting the number of `HTTPCode_ELB_5XX_Count` responses given by the load balancer. If there are _ANY_ in the past time window (again, 5 minutes), then we know someone (staff, hopefully) tried to get access to the service. **So, we scale-up to 1!**

#### Scaling Overview

![An overview showing a flowchart for scaling either up or down](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/body-power-gym/scaling.png)

### CI/CD

![General CI/CD Overview showing the two flows: Dev flow, staff flow](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/body-power-gym/scaling-diagram.png)

#### Content Changes

Webhooks are wonderful. They are basically a way for service A to notify service B that an event occurred. In our case, service A would be Strapi, and service B would be AWS (somehow). Basically we want a way to tell the frontend to rebuild itself, when a PUBLISH or UNPUBLISH event happens in Strapi - so new content is added. One way to achieve this is with API Gateway, with an endpoint (`/webhook` for example) that triggers a Lambda to rebuild the frontend.

![CI/CD Flow for a Strapi content change by a staff member](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/body-power-gym/cicd-staff.png)

#### Source Code Changes

The source code for the website and the backend is on two separate repositories on GitHub. With GitHub, we can use GitHub Actions. There are many ways to trigger an action, one of which is when we push new source code to the repository. For our action, we'll set up a way to build the container image using the new source code and push it to Elastic Container Registry (ECR). ECR is basically a repository for container images. We have two repositories for each container: `bapgym/frontend` and `bapgym/backend`. We'll also setup a rule in EventBridge: If a PUSH event occurs successfully on one of the repositories, trigger a Lambda function that would force the ECS service to redeploy - causing new changes to take effect immediately.

![CI/CD Flow for a Source Code change by a developer](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/body-power-gym/cicd-dev.png)

## Architectural Design

![System Architecture showing the various AWS services used to build the project](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/body-power-gym/system-architecture.png)

## Key Outcomes

- **Designed and implemented multi-tier AWS architecture** with VPC, public/private subnets across 2 AZs, NAT Gateway, and Internet Gateway to secure a full-stack application deployment resulting in 99.9% uptime for the frontend and minimal downtime due to Cold Start for the backend.

- **Secure networking topology** on a VPC with private subnets for ECS services and database, security groups with least-privilege access, and NAT Gateway for outbound connectivity to isolate application workloads from direct internet access while maintaining external API functionality. Secure database access eliminates direct exposure to the internet, lowering the risk of a cyber attack.

- **Highly scalable** solution leveraging containerization, load balancing and CI/CD practices to allow for robust deployment and horizontal scaling on an "As-Needed" basis determined by the application load balancer.

- **Automated Scale-to-Zero** techniques and choice of systems and architecture mean that cost is driven down significantly.

- **Architected multi-stage CI/CD pipeline** using GitHub Actions, AWS CodeBuild, ECR, and ECS with automated build triggers on Git push events and Strapi webhooks to streamline application deployment workflow achieving zero-downtime deployments and 95% reduction in manual intervention.

## Challenges

- **The Network**: Mapping out the network, setting up security groups, and keeping track of which service A can access service B was a lot! Thankfully, it all ended up working, but I did struggle. Shoutout to `StackOverflow` and the AWS subreddit.

- **Container size optimization**: My final container backend size was 2.64GB which was huge, in container terms. I managed to lower it down to 1.4GB by leveraging multi-stage builds and using optimized base images for the apps I'm using. I realize even 1.4GB is large, I just couldn't lower it even more without removing essential parts of the app. Still, that's a **46%** reduction in size!
  - UPDATE 2/7/2025: I finally figured out what was causing the image bloat and got it down to 47MB! It was the `output` method on my `NextConfig` that was including _all_ the libraries, even the unused ones. I cleaned up the `package.json` and ran `depcheck` to make sure all the included packages are actually in-use.

## Conclusion

This has been the most fun I had so far in a project. It had everything: web developing a website, working with a backend, containerization, cloud deployment, security, networking, automation, monitoring, and even PHOTOGRAPHY/VIDEOGRAPHY. It has truly been an experience and I'm so glad I learned so much working on it! Now, to re-do the project using Infrastructure as Code! 😊
