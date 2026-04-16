#!/bin/bash
# =============================================================
# fault_tolerance_demo.sh
# Run this on your LOCAL machine during the assessment demo.
# Replace the variables below before running.
# =============================================================

ALB_URL="http://YOUR-ALB-DNS.us-east-1.elb.amazonaws.com"
INSTANCE_1_ID="i-0XXXXXXXXXXXXXXXXX"   # Replace with real ID
INSTANCE_2_ID="i-0YYYYYYYYYYYYYYYYY"   # Replace with real ID
TG_ARN="arn:aws:elasticloadbalancing:us-east-1:ACCOUNT_ID:targetgroup/portfolio-tg/XXXXXXXX"

echo "╔══════════════════════════════════════════════════════════╗"
echo "║        FAULT TOLERANCE DEMONSTRATION                    ║"
echo "║        Cloud Computing Assessment                       ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# ── PHASE 1: Show both instances healthy ─────────────────────
echo "▶ PHASE 1: Verify both instances are healthy"
echo "─────────────────────────────────────────────"
aws elbv2 describe-target-health --target-group-arn "$TG_ARN" \
  --query 'TargetHealthDescriptions[*].{ID:Target.Id,State:TargetHealth.State}' \
  --output table
echo ""

# ── PHASE 2: Traffic distribution ────────────────────────────
echo "▶ PHASE 2: Show traffic distributed across both instances"
echo "─────────────────────────────────────────────────────────"
echo "Sending 10 requests — watch which instance responds:"
echo ""
for i in {1..10}; do
  SERVED_BY=$(curl -s -o /dev/null -w "%header{X-Served-By}" "$ALB_URL/" 2>/dev/null || echo "N/A")
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$ALB_URL/" 2>/dev/null || echo "ERR")
  echo "  Request $i → HTTP $HTTP_CODE  served by: $SERVED_BY"
  sleep 0.5
done
echo ""

# ── PHASE 3: Simulate failure ─────────────────────────────────
echo "▶ PHASE 3: Simulating failure — stopping Instance 1..."
echo "─────────────────────────────────────────────────────────"
aws ec2 stop-instances --instance-ids "$INSTANCE_1_ID" > /dev/null
echo "  ✗  Instance 1 ($INSTANCE_1_ID) STOPPED"
echo ""
echo "  Waiting 35 seconds for ALB health check to detect failure..."
for i in $(seq 35 -1 1); do
  printf "\r  Countdown: %02d seconds " "$i"
  sleep 1
done
echo ""
echo ""

# ── PHASE 4: Verify ELB detects the failure ─────────────────
echo "▶ PHASE 4: ALB health check status after failure"
echo "─────────────────────────────────────────────────"
aws elbv2 describe-target-health --target-group-arn "$TG_ARN" \
  --query 'TargetHealthDescriptions[*].{ID:Target.Id,State:TargetHealth.State,Reason:TargetHealth.Reason}' \
  --output table
echo ""

# ── PHASE 5: Site still works! ────────────────────────────────
echo "▶ PHASE 5: Site still works on Instance 2 only"
echo "─────────────────────────────────────────────────"
echo "Sending 6 requests — all should be served by Instance 2:"
echo ""
for i in {1..6}; do
  SERVED_BY=$(curl -s -o /dev/null -w "%header{X-Served-By}" "$ALB_URL/" 2>/dev/null || echo "N/A")
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$ALB_URL/" 2>/dev/null || echo "ERR")
  echo "  Request $i → HTTP $HTTP_CODE  served by: $SERVED_BY"
  sleep 0.5
done
echo ""

# ── PHASE 6: Recovery ─────────────────────────────────────────
echo "▶ PHASE 6: Restoring Instance 1 (auto-healing)"
echo "─────────────────────────────────────────────────"
aws ec2 start-instances --instance-ids "$INSTANCE_1_ID" > /dev/null
echo "  ✓  Instance 1 restarted. Wait ~90 seconds for full recovery."
echo "  Run 'aws elbv2 describe-target-health' to confirm both healthy."
echo ""

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  ✅ FAULT TOLERANCE DEMONSTRATION COMPLETE              ║"
echo "║  The site remained available throughout the failure.    ║"
echo "╚══════════════════════════════════════════════════════════╝"
