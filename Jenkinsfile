pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    // Configure these in Jenkins or as job environment variables.
    AWS_REGION = 'us-east-1'
    S3_BUCKET = 'replace-with-your-s3-bucket-name'
    CLOUDFRONT_DISTRIBUTION_ID = ''
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'CI=true npm test -- --watchAll=false'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to S3') {
      when {
        branch 'main'
      }
      steps {
        withCredentials([
          usernamePassword(
            credentialsId: 'aws-jenkins-creds',
            usernameVariable: 'AWS_ACCESS_KEY_ID',
            passwordVariable: 'AWS_SECRET_ACCESS_KEY'
          )
        ]) {
          sh 'aws s3 sync build/ s3://${S3_BUCKET} --delete --region ${AWS_REGION}'
          sh '''
            if [ -n "${CLOUDFRONT_DISTRIBUTION_ID}" ]; then
              aws cloudfront create-invalidation \
                --distribution-id ${CLOUDFRONT_DISTRIBUTION_ID} \
                --paths "/*"
            fi
          '''
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
    }
  }
}
