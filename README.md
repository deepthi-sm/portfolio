# Portfolio Website Deployment on AWS

This project is a personal portfolio website that I built and deployed using Amazon Web Services (AWS).

## What I did

- Built a portfolio website using React
- Created a production build of the website
- Launched two virtual servers (EC2 instances) on AWS
- Installed Nginx on both servers to host the website
- Uploaded and deployed the website on both instances
- Created an Application Load Balancer
- Connected both servers to the load balancer
- Demonstrated fault tolerance by stopping one server while the website still worked

## How it works

When a user opens the website, the request first goes to the load balancer.  
The load balancer then sends the request to one of the two servers.

If one server fails, the load balancer automatically redirects traffic to the other server.  
This ensures that the website remains available at all times.

## Key Concepts

- Cloud Deployment (AWS EC2)
- Load Balancing
- Fault Tolerance
- High Availability

## Live Website

http://portfolio-lb-1182673668.ap-southeast-2.elb.amazonaws.com/

## Author

Deepthi Sharma