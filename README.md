# Enterprise Computing Project

A simple React application with a complete CI/CD pipeline using Jenkins, Docker, and AWS (ECR & ECS). This project automates the build, test, containerization, and deployment process.

## Team

- Mark Castro
- Dondon Herrera
- Victor Leung
- Joy Francisco

## Project Overview

This project demonstrates the development of a React application and the implementation of a full CI/CD pipeline. The pipeline integrates GitHub, Jenkins, Docker, and AWS services to automate building, testing, and deployment to a cloud environment.

## Project Requirements Covered

### React App Development

- React app created using Create React App
- Page displays group number and all team members
- Unit test created to validate page content
- Source code pushed to GitHub repository

### Jenkins CI/CD Pipeline

#### Build & Test Stage

- Jenkinsfile created and integrated with GitHub
- Automatic pipeline trigger on code push
- Install dependencies using `npm ci`
- Run tests using `CI=true npm test -- --watchAll=false`
- Build React app using `npm run build`

#### Docker Image Stage

- Dockerfile created to containerize the React app
- Nginx used to serve the production build
- Jenkins builds Docker image
- Image pushed to AWS Elastic Container Registry (ECR)
- AWS credentials securely configured in Jenkins

#### Deployment Stage

- ECS task definition JSON created
- Jenkins deploys container to AWS Elastic Container Service (ECS)
- Service updated automatically with latest Docker image
- Application accessible via ECS public endpoint

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start app:

```bash
npm start
```

3. Run tests:

```bash
npm test -- --watchAll=false
```

4. Build app:

```bash
npm run build
```

## Docker Setup

Build Docker image:

```bash
docker build -t react-app .
```

Run container locally:

```bash
docker run -p 80:80 react-app
```

## Jenkins CI/CD Pipeline

This repository includes a `Jenkinsfile` with the following stages:

- Checkout
- Install
- Test
- Build
- Build Docker Image
- Push to AWS ECR
- Deploy to AWS ECS

## Jenkins Setup

1. Create a Jenkins Pipeline job connected to your GitHub repository
2. Configure AWS credentials in Jenkins:
   - Type: Username with password
   - ID: `aws-jenkins-creds`
   - Username: AWS Access Key ID
   - Password: AWS Secret Access Key
3. Ensure Jenkins agent has the following installed:
   - Node.js and npm
   - Docker
   - AWS CLI
4. Configure environment variables in `Jenkinsfile`:
   - `AWS_REGION`
   - `ECR_REPOSITORY`
   - `ECS_CLUSTER`
   - `ECS_SERVICE`
   - `TASK_DEFINITION`

## AWS Services Used

- Amazon ECR (Elastic Container Registry) for storing Docker images
- Amazon ECS (Elastic Container Service) for container deployment
- IAM for secure access management

## GitHub Push Commands

```bash
git init
git add .
git commit -m "Initial React app with full CI/CD pipeline"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## Submission Requirements

**GitHub repository link:**
https://github.com/MarkAngelC/Enterprise-Computing-Project

**Screenshot of Jenkins job (including username):**

<img width="1508" height="770" alt="image" src="https://github.com/user-attachments/assets/ede9c02f-43d7-4778-9017-7c12cf741254" />

**Screenshot of running app from ECS showing group number and team members:**

<img width="1422" height="844" alt="image" src="https://github.com/user-attachments/assets/c64eb17e-0976-43bf-b033-b053a043f40e" />
