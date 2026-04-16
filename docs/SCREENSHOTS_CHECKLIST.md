# ================================================================
# SCREENSHOTS CHECKLIST — Assessment Evidence Guide
# Take ALL of these before demo day. Label each clearly.
# ================================================================

## CATEGORY 1 — Website Screenshots (Criterion 1: 1.5 marks)

| # | Screenshot | What to show | Filename |
|---|-----------|-------------|----------|
| 1 | Home / Hero | Full page with animation visible, typed text | `ss_01_home.png` |
| 2 | About section | Education, stats, bio | `ss_02_about.png` |
| 3 | Projects section | All 4 project cards visible | `ss_03_projects.png` |
| 4 | Skills section | Skill bars filled, experience timeline | `ss_04_skills.png` |
| 5 | Contact section | Contact form and links | `ss_05_contact.png` |
| 6 | Mobile view | Responsive design on phone/narrow browser (DevTools) | `ss_06_mobile.png` |

**How:** Open browser → F12 → Toggle device toolbar → Set to 375px wide

---

## CATEGORY 2 — Cloud Deployment (Criterion 2: 1.5 marks)

| # | Screenshot | What to show | Filename |
|---|-----------|-------------|----------|
| 7 | EC2 Instances list | Both instances in "running" state | `ss_07_ec2_instances.png` |
| 8 | EC2 Instance 1 detail | Instance ID, AZ (us-east-1a), public IP | `ss_08_ec2_inst1.png` |
| 9 | EC2 Instance 2 detail | Instance ID, AZ (us-east-1b), public IP | `ss_09_ec2_inst2.png` |
| 10 | Live URL in browser | ALB DNS URL showing your portfolio | `ss_10_live_site.png` |
| 11 | Browser address bar | Showing the ELB URL with the site loaded | `ss_11_url_bar.png` |

---

## CATEGORY 3 — Load Balancer (Criterion 3: 2.0 marks)

| # | Screenshot | What to show | Filename |
|---|-----------|-------------|----------|
| 12 | ALB overview | Load balancer name, DNS, state=active | `ss_12_alb_overview.png` |
| 13 | ALB listeners | Port 80 listener → forwards to target group | `ss_13_alb_listeners.png` |
| 14 | Target group overview | Name, protocol, health check path `/health` | `ss_14_tg_overview.png` |
| 15 | Target group health | BOTH instances showing "healthy" status | `ss_15_tg_healthy.png` |
| 16 | X-Served-By headers | Browser DevTools → Network → response headers showing different hostnames | `ss_16_headers_inst1.png`, `ss_16b_headers_inst2.png` |

**How to capture header rotation:**
```bash
# Terminal — capture both instances serving:
curl -I http://YOUR-ALB-DNS/ | grep X-Served-By
# Press Ctrl+C, run again — it should alternate
```

---

## CATEGORY 4 — Fault Tolerance (Criterion 4: 2.0 marks)

Take these IN SEQUENCE — they tell a story:

| # | Screenshot | What to show | Filename |
|---|-----------|-------------|----------|
| 17 | Both healthy (before) | Target health: healthy × 2 | `ss_17_pre_failure_health.png` |
| 18 | Stop instance action | EC2 console showing "Stop Instance" dialog | `ss_18_stop_instance.png` |
| 19 | Instance 1 stopped | EC2 list: inst-1 = stopped, inst-2 = running | `ss_19_inst1_stopped.png` |
| 20 | ALB health after failure | Target health: inst-1 = unhealthy, inst-2 = healthy | `ss_20_post_failure_health.png` |
| 21 | Site still works | Browser showing site via ALB URL after failure | `ss_21_site_after_failure.png` |
| 22 | Terminal output | curl loop showing only inst-2 responding | `ss_22_terminal_failover.png` |
| 23 | Recovery | Both targets healthy again after restart | `ss_23_recovery.png` |

**Pro tip:** Record a short screen recording of the live failover demo. Even if screenshots are required, the video shows everything clearly.

---

## CATEGORY 5 — Report (Criterion 6: 2.0 marks)

Before submitting your PDF:
- [ ] Cover page with Roll No, Name, Date, Course
- [ ] All screenshots embedded with captions
- [ ] Architecture diagram included
- [ ] All code in `lstlisting` environments
- [ ] 5–10 pages including cover
- [ ] Named: `RollNo_Name_CloudAssessment.pdf`

---

## BONUS TIPS

1. **Take screenshots in sequence** — the evaluator will check timestamps
2. **Label everything** — add text overlays if possible (macOS Preview, Windows Snipping Tool)
3. **Keep terminal visible** — shows commands and output together
4. **Use Split-screen** — Browser on left, AWS console on right for maximum clarity
5. **Capture before AND after** — especially for fault tolerance
