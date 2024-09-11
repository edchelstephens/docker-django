Setup Instructions for Django with Docker, Docker Compose, and Traefik

# Django App Deployment with Docker, Docker Compose, and Traefik

This guide provides step-by-step instructions for deploying a Django app using Docker, Docker Compose, and Traefik as a reverse proxy with SSL from Let's Encrypt.

## Prerequisites

Make sure you have the following:
1. An AWS EC2 instance running Ubuntu.
2. A domain name (`dev.pruuv.com`) pointing to your EC2 instance (using Route 53 or another DNS provider).
3. Docker and Docker Compose installed on your instance.

## 1. Docker Installation

### Install Docker and Docker Compose

Create a shell script `install_docker.sh` to install Docker and Docker Compose:

```bash
#!/bin/bash

# Update the package database
sudo apt-get update

# Install required packages for Docker
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    -y

# Add Docker’s official GPG key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up the Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the package database with Docker packages
sudo apt-get update

# Install the latest version of Docker Engine
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Enable Docker service to start on boot
sudo systemctl enable docker
sudo system


# Verify Docker installation
docker --version

# Download and install Docker Compose
DOCKER_COMPOSE_VERSION="v2.10.0"
sudo curl -L "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Apply executable permissions to the binary
sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker Compose installation
docker-compose --version

echo "Docker and Docker Compose have been installed successfully!"


Run the script to install Docker and Docker Compose:
chmod +x install_docker.sh
sudo ./install_docker.sh

2. Django App Docker Setup
Dockerfile
Create a Dockerfile in the root of your project to set up the Django app using Python 3.12 and gunicorn:


# Use the official Python image
FROM python:3.12-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
RUN apk update && apk add --no-cache build-base nano postgresql-dev libffi-dev openssl-dev

# Set work directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt /app

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the port the app will run on
EXPOSE 8000

# Run the Django application using gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "project.wsgi:application"]


Docker Compose (production.yml)
Create a production.yml file for your Docker Compose configuration. This file sets up your Django app (web) and Traefik as a reverse proxy for handling HTTP/HTTPS:


version: '3.8'

services:
  web:
    build: .
    container_name: django-app
    restart: always
    env_file: .env  # Environment variables like DJANGO_SECRET_KEY, DATABASE_URL, etc.
    command: >
      sh -c "python manage.py migrate && gunicorn --bind 0.0.0.0:8000 project.wsgi:application"
    volumes:
      - .:/app
    environment:
      - PYTHONDONTWRITEBYTECODE=1
      - PYTHONUNBUFFERED=1
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.django-app.rule=Host(`dev.pruuv.com`)"
      - "traefik.http.routers.django-app.entrypoints=web"
      - "traefik.http.routers.django-app.middlewares=https-redirect@file"
      - "traefik.http.routers.django-app-secure.rule=Host(`dev.pruuv.com`)"
      - "traefik.http.routers.django-app-secure.entrypoints=websecure"
      - "traefik.http.routers.django-app-secure.tls=true"
      - "traefik.http.routers.django-app-secure.tls.certresolver=myresolver"
    expose:
      - "8000"
    networks:
      - traefik-network

  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: always
    command:
      - "--api.insecure=false"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.httpchallenge=true"
      - "--certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.myresolver.acme.email=ed@pruuv.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "./letsencrypt:/letsencrypt"
    networks:
      - traefik-network

networks:
  traefik-network:
    driver: bridge


Traefik Configuration (traefik.yml)
Create a traefik.yml file to configure Traefik for HTTPS redirection and SSL certificate management with Let's Encrypt:

http:
  middlewares:
    https-redirect:
      redirectScheme:
        scheme: https
        permanent: true

tls:
  certificatesResolvers:
    myresolver:
      acme:
        email: ed@pruuv.com
        storage: /letsencrypt/acme.json
        httpChallenge:
          entryPoint: web


3. Running the Project
Set Up Environment Variables
Create a .env file in the root of your project with necessary environment variables like DJANGO_SECRET_KEY and DATABASE_URL.

Launch the Docker Containers
Run the following command to start your services:

docker-compose -f production.yml up -d --build

Check Logs
To view the logs and ensure the services are running correctly, use:
docker-compose -f production.yml logs


Access Your Application
After launching the services, your Django app should be accessible at https://dev.pruuv.com. Traefik will automatically redirect HTTP traffic to HTTPS and manage SSL certificates using Let's Encrypt.


4. Troubleshooting
Checking Docker and Docker Compose Versions
To verify the installed versions of Docker and Docker Compose:

docker --version
docker-compose --version

Checking Logs
If you encounter issues, check the logs for any errors:

docker-compose -f production.yml logs


This will give you detailed logs for both the Django and Traefik services.

Summary
This guide helps you set up a Django application using Docker, Docker Compose, and Traefik with SSL. You can now run your app securely over HTTPS with automatic SSL management via Let's Encrypt.