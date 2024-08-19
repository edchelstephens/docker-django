# docker-django
Docker Django


# Commands

# Build
`docker build -t portfolio-image .`

# Run
`docker run -p 8000:8000 portfolio-image`
- If port 8000 is already allocated then use another port, e.g.
`docker run -p 5000:8000 portfolio-image`

# Run in daemon mode
`docker run -d -p 5000:8000 portfolio-image`