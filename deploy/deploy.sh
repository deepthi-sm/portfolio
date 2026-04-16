#!/bin/bash
# =============================================================
# deploy.sh — Run this on EACH EC2 instance after SSH-ing in
# Usage: bash deploy.sh
# =============================================================

set -e

REPO_URL="https://github.com/YOUR_USERNAME/cloud-portfolio.git"
APP_DIR="/var/www/portfolio"
PORT=3000

echo "=============================="
echo "  Portfolio Deployment Script"
echo "=============================="

# 1. Update system packages
echo "[1/8] Updating packages..."
sudo apt-get update -y && sudo apt-get upgrade -y

# 2. Install Node.js 20.x
echo "[2/8] Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install Nginx
echo "[3/8] Installing Nginx..."
sudo apt-get install -y nginx

# 4. Install PM2 (process manager)
echo "[4/8] Installing PM2..."
sudo npm install -g pm2

# 5. Clone or pull repo
echo "[5/8] Fetching application code..."
if [ -d "$APP_DIR" ]; then
  cd "$APP_DIR" && git pull
else
  sudo git clone "$REPO_URL" "$APP_DIR"
  sudo chown -R $USER:$USER "$APP_DIR"
fi

# 6. Install deps and build
echo "[6/8] Installing dependencies and building..."
cd "$APP_DIR"
npm install
npm run build

# 7. Configure Nginx as reverse proxy
echo "[7/8] Configuring Nginx..."
sudo tee /etc/nginx/sites-available/portfolio << 'EOF'
server {
    listen 80;
    server_name _;

    # Health check endpoint (required by AWS ALB)
    location /health {
        access_log off;
        return 200 'OK';
        add_header Content-Type text/plain;
    }

    # Serve React build (static files)
    root /var/www/portfolio/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
    }

    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Show which instance served the request (for demo)
    add_header X-Served-By $hostname always;
}
EOF

sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
sudo systemctl enable nginx

# 8. Done
echo "[8/8] ✅ Deployment complete!"
echo ""
echo "  App directory : $APP_DIR"
echo "  Web server    : Nginx on port 80"
echo "  Hostname      : $(hostname)"
echo "  Health check  : http://$(curl -s ifconfig.me)/health"
echo ""
echo "  X-Served-By header will show which EC2 instance responded."
