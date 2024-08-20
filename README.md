# docker-django
Docker Django


# Commands

# Build
`sudo docker build -t portfolio_image .`

# Run
`docker run -p 8000:8000 portfolio_image`
- If port 8000 is already allocated then use another port, e.g.
`docker run -p 5000:8000 portfolio_image`

# Run in daemon mode on Port 8000
`sudo docker run -d -p 8000:8000 portfolio_image`

# Check on localhost
`curl http://127.0.0.0:8000`

# On http in port 8000
http://ec2-18-169-17-169.eu-west-2.compute.amazonaws.com:8000/

# Default http port 80
http://ec2-18-169-17-169.eu-west-2.compute.amazonaws.com