# Use the official Python image
FROM python:3.12-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

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
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "your_project_name.wsgi:application"]
