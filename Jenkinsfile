pipeline {
    agent any

    environment {
        AWS_REGION        = 'us-east-1'
        ECR_REGISTRY      = '020423264558.dkr.ecr.us-east-1.amazonaws.com'
        ECR_REPO          = 'my-react-repo'
        ECS_CLUSTER       = 'my-react-app-cluster-1111'
        ECS_SERVICE       = 'my-react-task-definition-service-nufrtix8'
        ECS_TASK_FAMILY   = 'my-react-task-definition'
        IMAGE_TAG         = "${BUILD_NUMBER}"
    }

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:22.14.0'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    node -v
                    npm -v
                    npm install
                    npm run build
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:22.14.0'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    test -f build/index.html
                    npm test
                '''
            }
        }

        stage('Build My Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-ecs-ecr-credentials',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    sh '''
                        # Use AWS CLI from Docker, pipe password directly to host docker login
                        docker run --rm \
                            -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
                            -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
                            amazon/aws-cli:latest \
                            ecr get-login-password --region $AWS_REGION \
                        | docker login --username AWS --password-stdin $ECR_REGISTRY

                        # Build and push using host Docker
                        docker build \
                            -t $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG \
                            -t $ECR_REGISTRY/$ECR_REPO:latest .

                        docker push $ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG
                        docker push $ECR_REGISTRY/$ECR_REPO:latest
                    '''
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'aws-ecs-ecr-credentials',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
                    sh '''
                        sed -i "s|IMAGE_PLACEHOLDER|$ECR_REGISTRY/$ECR_REPO:$IMAGE_TAG|g" \
                            aws/task-definition.json

                        # Run all AWS CLI commands via Docker container
                        docker run --rm \
                            -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
                            -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
                            -v $(pwd)/aws:/aws \
                            amazon/aws-cli:latest \
                            ecs register-task-definition \
                            --region $AWS_REGION \
                            --cli-input-json file:///aws/task-definition.json

                        TASK_REVISION=$(docker run --rm \
                            -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
                            -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
                            amazon/aws-cli:latest \
                            ecs describe-task-definition \
                            --region $AWS_REGION \
                            --task-definition $ECS_TASK_FAMILY \
                            --query 'taskDefinition.revision' \
                            --output text)

                        docker run --rm \
                            -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
                            -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
                            amazon/aws-cli:latest \
                            ecs update-service \
                            --region $AWS_REGION \
                            --cluster $ECS_CLUSTER \
                            --service $ECS_SERVICE \
                            --task-definition $ECS_TASK_FAMILY:$TASK_REVISION \
                            --force-new-deployment
                    '''
                }
            }
        }
    }
}
