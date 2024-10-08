# docker-django
Dockerized Django basic web application 
- made with ❤️ by @edchelstephens


# ========== Local Development ========== #
1. Checkout on main branch
2. Build and run the containers
    - Standard
    `sudo docker-compose up --build`
    - Daemon Mode
    `sudo docker-compose up --build -d`




# ========== Deployment ========== #

## DEV Server

1. On ec2 instance with Public IP: 18.169.17.169
- On http in port 8000
    http://ec2-18-169-17-169.eu-west-2.compute.amazonaws.com:8000/
  
- On aws url
    http://ec2-18-169-17-169.eu-west-2.compute.amazonaws.com

- Via IP
    http://18.169.17.169


### Pre Docker Compose[Old Way of Doing]
1. Build
`sudo docker build -t portfolio_image .`

2. Run
`docker run -p 8000:8000 portfolio_image`
- If port 8000 is already allocated then use another port, e.g.
`docker run -p 5000:8000 portfolio_image`

3. Run in daemon mode on Port 8000
`sudo docker run -d -p 8000:8000 portfolio_image`

4. Run in daemon mode on port 80
`sudo docker run -d -p 80:8000 portfolio_image`

5. Check on localhost
`curl http://127.0.0.0:8000`



## Production Server
1. Create .env file in instance
2. Pull latest changes from git on production branch
3. Run the following command:
    `sudo docker-compose -f production.yml up -d`




# Known Errors

1. Failed to load /home/ubuntu/docker-django/.env: open /home/ubuntu/docker-django/.env: no such file or directory

-> Solution: create .env on instance
-> command: `touch .env`