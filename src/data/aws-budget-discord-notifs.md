---
aws-budget-discord-notifs:
  name: AWS Budget Notifications for Discord Channels
  caseStudyId: aws-budget-discord-notifs
  description: Receive Budget Alerts straight to your personal Discord server channel!
  repo: "https://github.com/aliAljaffer/terraform-aws-budgets-discord-notifs"
  url: https://registry.terraform.io/modules/aliAljaffer/budgets-discord-notifs/aws/latest
  images:
    - caption: "Non-sensitive variables stored in terraform.auto.tfvars"
      alt-text: ""
      url: https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/aws-budget-discord-notifs/non-sensetive-vars.png
  show: true
---

# Title

AWS Budget Notifications for Discord Channels

## Overview

Send AWS Budget Alerts straight to a Discord channel that you have Webhook Integration permissions for. The `budget_type` is `COST` and the `time_unit` is `MONTHLY`. Users can provide:

- `budget_threshold`
- `limit_unit`
- `limit_amount`

For example, setting a monthly budget of $20 USD and wanting to be alerted when it's forecasted to go over 70% of the budget, you'd set:

- `limit_unit = "USD"`
- `limit_amount = 20`
- `budget_threshold = 70`

Three secrets are needed in `/secrets.auto.tfvars`:

- `AWS_ACCESS_KEY`: AWS Access Key with access to Lambda, SNS, Budgets, and IAM. See: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
- `AWS_SECRET_KEY`: AWS Secret Key. See: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html
- `WEBHOOK_URL`: A webhook URL for the targeted Discord channel to send notifications to. Just need the URL, See the \"Making a Webhook\" section here: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks

And one last non-secret config variable in `/terraform.auto.tfvars`:

- `AWS_REGION`: Primary region to deploy to

## Demo

Published on Public Registry: [aliAljaffer/budgets-discord-notifs](https://registry.terraform.io/modules/aliAljaffer/budgets-discord-notifs/aws/latest)

Working on a YouTube video!

## The Problem

Wanted to create an extra method of delivery for AWS Budget alerts - as sometimes I don't check my email urgently enough. And one time the alert ended up in "junk" mail. So this is an approach to remedy that :)

## Approach

Learning Terraform, so decided to automate the infra and deploy as a module on Public Registry. The architecture is simple enough, all it creates is a budget alert that sends notifications to an SNS topic, and that triggers a Lambda to hit the Discord channel webhook URL with the message.

This is the model `tree`:

```
.
├── modules
│   ├── budgets
│   │   ├── outputs.tf
│   │   ├── terraform.tf
│   │   └── variables.tf
│   ├── iam
│   │   ├── datasource.tf
│   │   ├── outputs.tf
│   │   ├── terraform.tf
│   │   └── variables.tf
│   ├── lambda
│   │   ├── function
│   │   │   ├── main.py
│   │   │   └── requirements.txt
│   │   ├── datasource.tf
│   │   ├── outputs.tf
│   │   ├── terraform.tf
│   │   └── variables.tf
│   └── sns
│       ├── datasource.tf
│       ├── outputs.tf
│       ├── terraform.tf
│       └── variables.tf
├── LICENSE
├── main.tf
├── providers.tf
├── README.md
├── secrets.example.auto.tfvars
├── terraform.auto.tfvars
└── variables.tf
```

## Architectural Design

![System Design for the project, showing VCS where Terraform module is stored and the resources that are deployed](https://alialjaffer-website.s3.me-south-1.amazonaws.com/images/aws-budget-discord-notifs/arch-design.png)

## Key Outcomes

- Automated budget alerts to a channel on Discord
- Tagged resources using AWS Tags, helps track spending, logs, and resource lookup.
- Allows the user to set different budget variables like `limit_amount`, `limit_unit`, `budget_threshold`, and `AWS_REGION`.
