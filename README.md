# 🚀 Cloud Portfolio — AWS EC2 + Elastic Load Balancer

A production-ready personal portfolio website deployed on **AWS EC2** with **Application Load Balancer**, demonstrating fault tolerance across multiple Availability Zones.

[![Live Demo](https://img.shields.io/badge/Live-AWS%20ELB-green?style=flat-square&logo=amazon-aws)](http://YOUR-ALB-DNS.us-east-1.elb.amazonaws.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Nginx](https://img.shields.io/badge/Nginx-1.18-009639?style=flat-square&logo=nginx)](https://nginx.org)

---

## 🌐 Live URL

```
http://YOUR-ALB-DNS-NAME.us-east-1.elb.amazonaws.com
```

---

## 🏗️ Architecture

```
Internet
    │
    ▼
AWS Application Load Balancer (portfolio-alb)
    │         │
    ▼         ▼
EC2 #1    EC2 #2
us-east   us-east
  -1a       -1b
(Nginx)   (Nginx)
  │           │
  └─── React Build (static) ───┘
```

### Key Features
- ✅ **2 EC2 instances** (t2.micro, Ubuntu 22.04) in different AZs
- ✅ **AWS ALB** with round-robin load balancing
- ✅ **Health checks** on `/health` endpoint (30s interval)
- ✅ **Fault tolerance** — automatic failover when instance fails
- ✅ **Multi-AZ** deployment (us-east-1a & us-east-1b)
- ✅ **Auto Scaling Group** (optional, for bonus marks)

---

## 💻 Tech Stack

| Layer         | Technology              |
|---------------|------------------------|
| Frontend      | React 18, Tailwind CSS  |
| Web Server    | Nginx 1.18              |
| Cloud         | AWS EC2, ALB, ASG       |
| OS            | Ubuntu 22.04 LTS        |
| Node.js       | v20.x                   |
| Version Ctrl  | Git + GitHub            |

---

## 🚀 Local Development

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/cloud-portfolio.git
cd cloud-portfolio

# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm start

# Build for production
npm run build
```

---

## ☁️ AWS Deployment

Full step-by-step guide: [`deploy/AWS_DEPLOYMENT.md`](deploy/AWS_DEPLOYMENT.md)

**Quick summary:**
```bash
# 1. Launch 2 EC2 instances (Ubuntu 22.04, t2.micro)
#    — one in us-east-1a, one in us-east-1b

# 2. SSH into each and run:
bash deploy/deploy.sh

# 3. Create Target Group (health check: /health)
# 4. Register both EC2 instances
# 5. Create Application Load Balancer
# 6. Verify both targets are healthy
```

---

## 🔥 Fault Tolerance Demo

```bash
# Run the demo script (update variables first)
bash deploy/fault_tolerance_demo.sh
```

What it demonstrates:
1. Both instances healthy — traffic alternates between them
2. Stop Instance 1 → ALB detects failure in ~30s
3. Site continues serving via Instance 2 — **zero downtime**
4. Restart Instance 1 → automatically re-joins the pool

---

## 📁 Project Structure

```
cloud-portfolio/
├── public/
│   └── index.html          # HTML entry point with Google Fonts
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Fixed nav with scroll detection
│   │   ├── Hero.jsx         # Animated hero + terminal widget
│   │   ├── About.jsx        # Bio, education, stats
│   │   ├── Projects.jsx     # Project cards with tags
│   │   ├── Skills.jsx       # Animated skill bars + experience
│   │   ├── Contact.jsx      # Contact form with validation
│   │   └── Footer.jsx       # Footer with cloud info
│   ├── hooks/
│   │   └── useScrollReveal.js  # IntersectionObserver hook
│   ├── data.js              # ← EDIT THIS with your info
│   ├── App.jsx
│   ├── index.js
│   └── index.css            # Tailwind + custom styles
├── deploy/
│   ├── deploy.sh            # EC2 setup script
│   ├── nginx.conf           # Nginx server config
│   ├── fault_tolerance_demo.sh
│   └── AWS_DEPLOYMENT.md   # Full deployment guide
├── docs/
│   ├── report_template.tex  # LaTeX report template
│   ├── GITHUB_WORKFLOW.md
│   └── SCREENSHOTS_CHECKLIST.md
├── tailwind.config.js
├── package.json
└── .gitignore
```

---

## 📝 Customization

Edit `src/data.js` to update:
- Personal info (name, email, links)
- Education details
- Work experience
- Projects
- Skills and certifications

---

## 📊 Assessment Rubric Coverage

| Criterion | Implementation |
|-----------|---------------|
| Website design (1.5) | React + Tailwind, responsive, animations |
| Cloud deployment (1.5) | 2× EC2, public ALB URL |
| Load balancing (2.0) | AWS ALB, 2 healthy targets, X-Served-By header |
| Fault tolerance (2.0) | Health checks, multi-AZ, auto rerouting demo |
| Understanding (1.0) | Architecture diagram, clear component separation |
| LaTeX report (2.0) | Template in `docs/report_template.tex` |

---

## 📄 License

MIT — free to use for educational purposes.

---

*Deployed for Cloud Computing Assessment — Dr. Kalyan N, April 2026*
