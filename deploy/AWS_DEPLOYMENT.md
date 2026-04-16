# ================================================================
# AWS CLOUD DEPLOYMENT GUIDE
# Portfolio Website — EC2 + Elastic Load Balancer + Auto Scaling
# ================================================================

## Prerequisites
- AWS Account (Free Tier works for this assessment)
- AWS CLI installed locally (`pip install awscli`)
- An SSH key pair created in AWS Console
- Your portfolio repo pushed to GitHub

---

## STEP 1: CREATE A SECURITY GROUP

Go to EC2 Console → Security Groups → Create Security Group

Name: `portfolio-sg`
Inbound rules:
| Type  | Port | Source    | Purpose             |
|-------|------|-----------|---------------------|
| SSH   | 22   | Your IP   | Management access   |
| HTTP  | 80   | 0.0.0.0/0 | Web traffic via ELB |

Or via CLI:
```bash
aws ec2 create-security-group \
  --group-name portfolio-sg \
  --description "Portfolio EC2 Security Group"

aws ec2 authorize-security-group-ingress \
  --group-name portfolio-sg \
  --protocol tcp --port 22 --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-name portfolio-sg \
  --protocol tcp --port 80 --cidr 0.0.0.0/0
```

---

## STEP 2: LAUNCH EC2 INSTANCE #1 (us-east-1a)

EC2 Console → Launch Instance

- Name: `portfolio-instance-1`
- AMI: Ubuntu Server 22.04 LTS (Free Tier eligible)
- Instance type: t2.micro (Free Tier) or t3.micro
- Key pair: Select your .pem key
- Network settings: Select `portfolio-sg`
- **Availability Zone: us-east-1a**
- Storage: 8 GB gp2

**User Data (paste in "Advanced Details → User Data"):**
```bash
#!/bin/bash
apt-get update -y
apt-get install -y git
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx
npm install -g pm2
git clone https://github.com/YOUR_USERNAME/cloud-portfolio.git /var/www/portfolio
chown -R ubuntu:ubuntu /var/www/portfolio
cd /var/www/portfolio
npm install
npm run build
# Nginx config
cat > /etc/nginx/sites-available/portfolio << 'NGINX'
server {
    listen 80;
    server_name _;
    location /health { return 200 'OK'; add_header Content-Type text/plain; }
    root /var/www/portfolio/build;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
    add_header X-Served-By $hostname always;
}
NGINX
ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx
systemctl enable nginx
```

---

## STEP 3: LAUNCH EC2 INSTANCE #2 (us-east-1b)

Repeat Step 2 with:
- Name: `portfolio-instance-2`
- **Availability Zone: us-east-1b**
- Everything else identical

---

## STEP 4: CREATE TARGET GROUP

EC2 Console → Target Groups → Create Target Group

- Target type: Instances
- Name: `portfolio-tg`
- Protocol: HTTP, Port: 80
- VPC: Default VPC
- Health check path: `/health`
- Healthy threshold: 2
- Unhealthy threshold: 2
- Timeout: 5
- Interval: 30

Register targets:
- Select `portfolio-instance-1`
- Select `portfolio-instance-2`
- Click "Include as pending below"
- Create target group

CLI equivalent:
```bash
# Create target group
TG_ARN=$(aws elbv2 create-target-group \
  --name portfolio-tg \
  --protocol HTTP \
  --port 80 \
  --vpc-id $(aws ec2 describe-vpcs --query 'Vpcs[?IsDefault==`true`].VpcId' --output text) \
  --health-check-path /health \
  --health-check-interval-seconds 30 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 2 \
  --query 'TargetGroups[0].TargetGroupArn' \
  --output text)

echo "Target Group ARN: $TG_ARN"

# Register instances (replace with your instance IDs)
aws elbv2 register-targets \
  --target-group-arn $TG_ARN \
  --targets Id=i-0INSTANCE1ID Id=i-0INSTANCE2ID
```

---

## STEP 5: CREATE APPLICATION LOAD BALANCER

EC2 Console → Load Balancers → Create Load Balancer → Application Load Balancer

- Name: `portfolio-alb`
- Scheme: Internet-facing
- IP address type: IPv4
- VPC: Default VPC
- Subnets: Select **at least 2 AZs** (us-east-1a AND us-east-1b)
- Security Group: Create new or select `portfolio-sg` (allow port 80)
- Listener: HTTP:80 → Forward to `portfolio-tg`

CLI:
```bash
# Get subnet IDs for 2 AZs
SUBNET_1=$(aws ec2 describe-subnets \
  --filters "Name=availabilityZone,Values=us-east-1a" "Name=defaultForAz,Values=true" \
  --query 'Subnets[0].SubnetId' --output text)

SUBNET_2=$(aws ec2 describe-subnets \
  --filters "Name=availabilityZone,Values=us-east-1b" "Name=defaultForAz,Values=true" \
  --query 'Subnets[0].SubnetId' --output text)

SG_ID=$(aws ec2 describe-security-groups \
  --filters "Name=group-name,Values=portfolio-sg" \
  --query 'SecurityGroups[0].GroupId' --output text)

# Create ALB
ALB_ARN=$(aws elbv2 create-load-balancer \
  --name portfolio-alb \
  --subnets $SUBNET_1 $SUBNET_2 \
  --security-groups $SG_ID \
  --query 'LoadBalancers[0].LoadBalancerArn' \
  --output text)

# Create listener
aws elbv2 create-listener \
  --load-balancer-arn $ALB_ARN \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=$TG_ARN

# Get DNS name
aws elbv2 describe-load-balancers \
  --load-balancer-arns $ALB_ARN \
  --query 'LoadBalancers[0].DNSName' \
  --output text
```

Your site is now live at: `http://<ALB-DNS-NAME>.us-east-1.elb.amazonaws.com`

---

## STEP 6: (BONUS) AUTO SCALING GROUP

EC2 Console → Auto Scaling Groups → Create

1. Create Launch Template from `portfolio-instance-1`
   - Name: `portfolio-launch-template`
   - Include same AMI, instance type, key pair, security group, user data

2. Create Auto Scaling Group
   - Name: `portfolio-asg`
   - Launch template: `portfolio-launch-template`
   - VPC: Default, Subnets: us-east-1a AND us-east-1b
   - Load balancer: Attach to `portfolio-tg`
   - Desired: 2, Minimum: 1, Maximum: 4
   - Scaling policy: Target tracking → Average CPU utilization 70%

---

## STEP 7: FAULT TOLERANCE DEMO (For Assessment)

### Demonstrate failover live:

**Step A — Verify both instances healthy:**
```bash
aws elbv2 describe-target-health \
  --target-group-arn $TG_ARN
# Should show: HealthStatus: healthy for both targets
```

**Step B — Show site is working:**
```bash
# Run this in terminal — watch X-Served-By header rotate between instances
for i in {1..10}; do
  curl -s -o /dev/null -w "Served by: %header{X-Served-By}\n" http://<ALB-DNS>/
done
```

**Step C — Stop instance #1 (simulate failure):**
```bash
aws ec2 stop-instances --instance-ids i-0INSTANCE1ID
# OR in console: select instance → Instance State → Stop
```

**Step D — Show ELB detects failure:**
```bash
# Wait ~30 seconds, then check health
aws elbv2 describe-target-health --target-group-arn $TG_ARN
# instance-1: unhealthy, instance-2: healthy
```

**Step E — Show site STILL WORKS:**
```bash
curl http://<ALB-DNS>/
# Site responds! All traffic now served by instance-2
```

**Step F — Restart instance (recovery):**
```bash
aws ec2 start-instances --instance-ids i-0INSTANCE1ID
# Within ~1 minute, ALB marks it healthy again
```

---

## ARCHITECTURE DIAGRAM

```
                         Internet
                            │
                     ┌──────▼──────┐
                     │  Route 53   │  (Optional: custom domain)
                     │  DNS Record │
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │  AWS ALB    │  portfolio-alb
                     │  (Port 80)  │  Internet-facing
                     └──────┬──────┘
                            │
              ┌─────────────┴─────────────┐
              │   Round-Robin / Weighted  │
              │        Load Balancing     │
              │                           │
    ┌─────────▼────────┐       ┌──────────▼───────┐
    │  EC2 Instance 1  │       │  EC2 Instance 2  │
    │  us-east-1a      │       │  us-east-1b      │
    │  t2.micro        │       │  t2.micro        │
    │  Nginx + React   │       │  Nginx + React   │
    │  /health → 200   │       │  /health → 200   │
    └──────────────────┘       └──────────────────┘
              │                           │
              └─────────────┬─────────────┘
                            │
                    ┌───────▼───────┐
                    │  Target Group │  portfolio-tg
                    │  Health: /health │
                    │  Interval: 30s│
                    └───────────────┘

    [Optional Bonus]
    ┌──────────────────────────────────┐
    │       Auto Scaling Group         │
    │  Min: 1 | Desired: 2 | Max: 4   │
    │  Scale up on CPU > 70%           │
    └──────────────────────────────────┘
```

---

## COST ESTIMATE (Free Tier)

| Resource              | Free Tier Limit   | Notes               |
|-----------------------|-------------------|---------------------|
| EC2 t2.micro × 2     | 750 hrs/month     | May exceed free tier |
| ELB (ALB)            | 750 hrs/month     | First 12 months      |
| Data Transfer Out    | 15 GB/month       | More than enough     |
| EBS Storage (8GB×2)  | 30 GB/month       | Within free tier     |

**Estimated cost beyond free tier: ~$0 for a short assessment.**
Stop instances when not demonstrating to save costs.
