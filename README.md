# docker-django
Dockerized Django basic web application 
- made with ❤️ by @edchelstephens


# Using Docker Compose
## Command
## Build and run the containers
`sudo docker-compose up --build`

## Build and run the containers in daemon mode 
`sudo docker-compose up -d --build`


# Deployment on AWS

## DEV Server
# On http in port 8000
http://ec2-18-169-17-169.eu-west-2.compute.amazonaws.com:8000/

# Default http port 80
http://ec2-18-169-17-169.eu-west-2.compute.amazonaws.com


# Via  ip
http://18.169.17.169


# Pre Docker Compose[Old Way of Doing]
#### Build
`sudo docker build -t portfolio_image .`

#### Run
`docker run -p 8000:8000 portfolio_image`
- If port 8000 is already allocated then use another port, e.g.
`docker run -p 5000:8000 portfolio_image`

#### Run in daemon mode on Port 8000
`sudo docker run -d -p 8000:8000 portfolio_image`

#### Run in daemon mode on port 80
`sudo docker run -d -p 80:8000 portfolio_image`

#### Check on localhost
`curl http://127.0.0.0:8000`



## Production Server
1. Create .env file in instance
2. Run the following command:
    `sudo docker-compose -f production.yml up -d`


