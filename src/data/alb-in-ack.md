---
alb-in-ack:
  name: Using ALB in Alibaba Container Service for Kubernetes
  caseStudyId: alb-in-ack
  description: Customize an Application Load Balancer and use it with Ingress or Gateway API on Alibaba cloud.
  repo: ""
  url: ""
  images: []
  show: true
  date: "2026-04-26"
  type: "blog"
---

## Intro

NGINX Ingress Controller can only provision a Classic Load Balancer. To use an ALB (to make use of security features such as WAF and DDoS protection), you need to install **ALB Ingress Controller** by going to ACK console → Add Ons. You can then customise the controller to use an existing ALB. Later, we explore how to use `Gateway API` instead.

**NOTE:** I was alerted that ALB Ingress Controller only works with clusters that use the Terway CNI. For clusters with Flannel CNI, you are limited to a Network Load Balancer.

## Installing Alibaba ALB Ingress Controller

You can install this add-on on Alibaba Console by going to:

![Showcasing where to manage add-ons in Alibaba Console](https://alialjaffer-website-backup.s3.eu-north-1.amazonaws.com/documents/alibaba-ack-addons.png)

- Services
- → Container **Service for Kubernetes (ACK)**
- → Choose the cluster to operate on
- → Click on **Components and Add-ons**
- → In the search bar, look for "ingress"
- → Find **ALB Ingress Controller**
- → Click **Install**
- → You'll be given the choice to:
  - Create a new ALB instance and associate it in the cluster
  - Use an existing ALB instance to associate in the cluster
  - None - this option is preferred if you plan to have multiple ALBs in one cluster

## If ALB Ingress Controller is installed without configuring an ALB

### If you don't have an ALB ready

Either create one in the console, note down its instance ID (`alb-xxxxxxxx`), and continue in the section [ALB Routing Methods](#alb-routing-methods) or let Alibaba create one declaratively:

```yaml
apiVersion: alibabacloud.com/v1
kind: AlbConfig
metadata:
  name: alb-demo
spec:
  config:
    name: alb-name
    edition: StandardWithWaf # <- Values: Standard, or StandardWithWaf
    addressAllocatedMode: Dynamic # The value can be Dynamic or Fixed. This parameter specifies the IP mode of the ALB instance.
    addressType: Internet # <- Internet (Public) or Intranet (Private)
    zoneMappings: # To ensure high availability, select at least two vSwitches in different zones.
      - vSwitchId: vsw-uf6ccg2**** # Replace with the actual vSwitch ID (in Zone 1).
      - vSwitchId: vsw-uf6nuo5**** # Replace with the actual vSwitch ID (in Zone 2, which must be different from the first one).
  listeners:
    - port: 80
      protocol: HTTP  listeners:
    - port: 443
        protocol: HTTPS
        securityPolicyId: tls_cipher_policy_1_1 # <- For other IDs, see: https://www.alibabacloud.com/help/en/slb/application-load-balancer/user-guide/tls-security-policies
```

### If you have an ALB ready

Then you need an `AlbConfig` object created. Prepare the ALB instance ID (`alb-xxxxxxxx`).

```yaml
apiVersion: alibabacloud.com/v1
kind: AlbConfig
metadata:
  name: alb # This is the ALB Config name we'll use next
spec:
  config:
    forceOverride: false # <- If true, overwrites the current settings of the ALB instance
    id: alb-********* # This should be the ALB's instance ID here
    listenerForceOverride: false # <- If true, the ALB is FULLY managed by the AlbConfig (Listeners, rules, etc.)
  listeners:
    - port: 80
      protocol: HTTP
    - port: 443
      protocol: HTTPS
```

After creating the `AlbConfig`, move to the next section where I cover Ingress and Gateway API.

## ALB Routing Methods

### Ingress

Create an IngressClass to use the `AlbConfig` object:

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: alb-ingress-class
spec:
  controller: ingress.k8s.alibabacloud/alb
  parameters:
    apiGroup: alibabacloud.com
    kind: AlbConfig
    name: alb # The name of the AlbConfig above
```

Then for your Ingress object, replace the annotations for Nginx Ingress:

```yaml
nginx.ingress.kubernetes.io/ssl-redirect: "true"
nginx.ingress.kubernetes.io/listen-ports: '[{"HTTP":80},{"HTTPS":443}]'
```

To:

```yaml
alb.ingress.kubernetes.io/ssl-redirect: "true" # <- Force HTTP->HTTPS redirection
alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80},{"HTTPS":443}]' # <- Matches the listeners. Can be all listeners or subset
```

And `spec.ingressClassName` must be set to the Ingress Class' name we created:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  namespace: ingress-demo
  annotations:
    alb.ingress.kubernetes.io/ssl-redirect: "true" # <- Force HTTP->HTTPS redirection
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS": 443}]' # <- Matches the listeners. Can be all listeners or subset
spec:
  ingressClassName: alb-ingress-class # <---- Here
  # ... remaining configurations
```

### Testing the ALB

Run:

```bash
kubectl get AlbConfig -A
```

And you should see the `DNSNAME` field populated by the ALB dns name. Sometimes, it doesn't show up but the ingress is still operational. Confirm in the Alibaba console. To test your routing rules, use `curl`:

```bash
curl -H "Host: <ingress-rule-hostname>" https://alb-xxxxxx.me-central-1.alb.aliyuncs.com
```

## Gateway API

On installation of the ALB Ingress Controller add-on, a GatewayClass is created. This class can be used in the Gateway object to provision an ALB. This is the same procedure as in the Ingress case, where an IngressClass is defined for the Ingress to attach to.

### Default GatewayClass

The default GatewayClass is `alb`. This is its describe:

```bash
[Ali ~]$ k describe gatewayclasses.gateway.networking.k8s.io alb
Name:         alb
Namespace:
Labels:       <none>
Annotations:  <none>
API Version:  gateway.networking.k8s.io/v1
Kind:         GatewayClass
Metadata:
  Creation Timestamp:  2026-03-01T12:52:01Z
Spec:
  Controller Name:  gateways.alibabacloud.com/alb/v1  # <- IMPORTANT! :)
Status:
  Conditions:
    Last Transition Time:  2026-03-17T12:36:20Z
    Message:               Accepted
    Observed Generation:   1
    Reason:                Accepted
    Status:                True
    Type:                  Accepted
    Last Transition Time:  2026-03-17T12:36:20Z
    Message:               SupportedVersion
    Observed Generation:   1
    Reason:                SupportedVersion
    Status:                True
    Type:                  SupportedVersion
Events:                    <none>
```

Note that it uses a controller name of `gateways.alibabacloud.com/alb/v1`. This will be useful for us later!

### Gateway

To create a Gateway, we use this definition:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: alb-gateway
spec:
  gatewayClassName: alb # This forces ALB provisioning instead of the default CLB (Classic Load Balancer)
  listeners:
    - name: http
      protocol: HTTP
      port: 80
      hostname: "*.alialjaffer.com" # Replace with your actual domain
      allowedRoutes: # The namespace where the HTTPRoutes come from
        namespaces:
          from: Same
    - name: https
      protocol: HTTPS
      port: 443
      hostname: "*.alialjaffer.com"
      allowedRoutes:
        namespaces:
          from: Same
      tls:
        mode: Terminate # ALB terminates TLS and forwards plain HTTP to backends
        certificateRefs:
          - kind: Secret
            name: x-alialjaffer-tls # A secret containing a self-signed certificate (or cert-manager managed)
```

### HTTPRoute

A route to our in-cluster services that we can attach to a Gateway object via `parentRefs`:

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: HTTPRoute
metadata:
  name: demo-route
spec:
  parentRefs: # Attach this route to the Gateway above
    - group: gateway.networking.k8s.io
      kind: Gateway
      name: alb
  hostnames:
    - demo.alialjaffer.com
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs: # Forward matched traffic to nginx on port 80
        - kind: Service
          name: nginx
          port: 80
```

### Custom GatewayClass + AlbConfig

Using the default GatewayClass means you provision a default Application Load Balancer. If you need a WAF-enabled Application Load Balancer, you'll have to create a fresh GatewayClass. Remember the controller name from earlier for ALB Ingress Controller? We'll use that!

## WAF-Enabled Application Load Balancers using Gateway API

### Step 1: Let's create an AlbConfig for a WAF-enabled ALB

**NOTE:** If you already have an AlbConfig from previous steps, and it's WAF-enabled, you can skip to step 2!

```yaml
apiVersion: alibabacloud.com/v1
kind: AlbConfig
metadata:
  name: ali-waf-config
spec:
  config:
    name: ali-alb-instance
    addressType: Internet
    edition: StandardWithWaf # <-- This is what enables WAF
    zoneMappings:
      - vSwitchId: "vsw-xxxxxxxxxxxxxxxxx" # Replace with Riyadh Zone A vSwitch ID
      - vSwitchId: "vsw-yyyyyyyyyyyyyyyyy" # Replace with Riyadh Zone B vSwitch ID
```

### Step 2: To use this AlbConfig, we'll create the GatewayClass

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: ali-waf-class
spec:
  controllerName: gateways.alibabacloud.com/alb/v1 # <-- same controller name
  parametersRef:
    group: alibabacloud.com
    kind: AlbConfig
    name: ali-waf-config # The albconfig's name to use, in this case our WAF config
```

### Step 3: We need a Gateway that uses this GatewayClass

Without a Gateway, the ALB will not be provisioned, yet.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: ali-alb-gateway
  namespace: ali # <- Namespace-scoped gateway.
spec:
  gatewayClassName: ali-waf-class # <-- Our GatewayClass from step 2
  listeners:
    - name: http
      protocol: HTTP
      port: 80
      hostname: "*.alialjaffer.com"
      allowedRoutes:
        namespaces:
          from: Same
```

### Step 4: Now to create HTTPRoute objects that point at the Gateway

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: http-backend-route
  namespace: ali
spec:
  # This links the route specifically to "ali-alb-gateway"
  parentRefs:
    - name: ali-alb-gateway
      namespace: ali
  hostnames:
    - "waf-test.alialjaffer.com"
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /api
      backendRefs:
        - name: backend-service
          port: 8080
```

### Step 5: Run kubectl get or kubectl describe on your gateway to ensure it's been assigned an ADDRESS

```bash
[Ali ~]$ k get gateway -n ali ali-alb-gateway
NAME              CLASS          ADDRESS                                                      PROGRAMMED   AGE
ali-alb-gateway   ali-waf-class  alb-xt50h6m2\*\*\*\*\*.me-central-1.alb.aliyuncsslbintl.com  True         3m
```

All done! You just provision an Application Load Balancer using Ingress and/or Gateway API objects!
