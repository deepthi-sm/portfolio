# ================================================================
# GITHUB SETUP & WORKFLOW
# ================================================================

## Step 1 — Initialize Git locally

```bash
cd cloud-portfolio          # or wherever you cloned/created the project

git init
git add .
git commit -m "feat: initial portfolio website with cloud architecture"
```

## Step 2 — Create GitHub repo (via GitHub CLI or browser)

```bash
# Option A: GitHub CLI (recommended)
gh repo create cloud-portfolio --public --source=. --remote=origin --push

# Option B: Manual
# 1. Go to https://github.com/new
# 2. Create repo named "cloud-portfolio" (public, no README)
# 3. Then run:
git remote add origin https://github.com/YOUR_USERNAME/cloud-portfolio.git
git branch -M main
git push -u origin main
```

## Step 3 — Ongoing workflow

```bash
# Make changes → stage → commit → push
git add .
git commit -m "feat: update projects section"
git push origin main

# On EC2 (to deploy updates):
cd /var/www/portfolio
git pull
npm run build
sudo systemctl reload nginx
```

## Step 4 — Branching strategy (good practice)

```bash
# Feature branch
git checkout -b feature/contact-form
# ... make changes ...
git add .
git commit -m "feat: add contact form with validation"
git push origin feature/contact-form

# Merge to main via Pull Request on GitHub, then:
git checkout main
git pull
```

## Useful git commands

```bash
git log --oneline --graph     # view history
git status                    # see staged/unstaged
git diff                      # see changes
git stash                     # stash uncommitted changes
git tag v1.0.0                # tag a release
git push origin --tags        # push tags
```

## .gitignore (already in repo)
Make sure these are ignored:
- node_modules/
- build/
- .env
- *.pem (SSH keys — NEVER commit!)
- .DS_Store
