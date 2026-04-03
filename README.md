# Enterprise Computing Project

Simple React app with CI/CD support using Jenkins and AWS.

## Team

- Mark Castro
- Dondon Herrera
- Victor Leung
- Joy Francisco

## Project Requirements Covered

- React app created
- Page shows group number and all team members
- Test created for page content
- Jenkins pipeline added for build, test, and deploy

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

## Jenkins CI/CD

This repo includes a `Jenkinsfile` with these stages:

- Checkout
- Install (`npm ci`)
- Test (`CI=true npm test -- --watchAll=false`)
- Build (`npm run build`)
- Deploy to AWS S3 (main branch only)

### Jenkins Setup

1. Create a Jenkins Pipeline job connected to your GitHub repository.
2. Configure Jenkins credential:

- Type: Username with password
- ID: `aws-jenkins-creds`
- Username: AWS Access Key ID
- Password: AWS Secret Access Key

3. Ensure Jenkins agent has these tools:

- Node.js + npm
- AWS CLI

4. Update deployment values in `Jenkinsfile`:

- `AWS_REGION`
- `S3_BUCKET`
- `CLOUDFRONT_DISTRIBUTION_ID` (optional)

## GitHub Push Commands

After creating your GitHub repo:

```bash
git init
git add .
git commit -m "Initial React app with Jenkins CI/CD"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
