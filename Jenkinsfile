pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
    }
    stages {
        // Initialise
        stage("Initialise") {
            steps {
                cleanWs()
            }
        }
        // Setting up Git
        stage("git") {
            steps {
                git branch: 'feature/devops_sagar', credentialsId: 'git_token_cs', url: 'https://github.com/v2dev/v2solutions-angularjs-boilerplate.git'
            }
        }
        // Install dependencies and Build React App
        stage("Build React App") {
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                bat "echo 'Building react application'"
                bat 'npm install'
                bat 'npm run build'
            }
        }
        // Configure Infrastructure
        stage("config infra") {
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                dir("scripts") {
                    bat './configTerragrunt.bat %WORKSPACE%'
                }
            }
        }
        // Create Infrastructure        
        stage("create infra") {
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                dir("scripts") {
                    bat './terragruntInvocation.bat %AWS_ACCESS_KEY_ID% %AWS_SECRET_ACCESS_KEY% %AWS_DEFAULT_REGION% %WORKSPACE%'
                }
            }
        }
        // Copy built React code to S3 bucket
        stage("Copy Artifacts to S3") {
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                bat 'aws s3 cp dist/base-project s3://v2-angularjs-boilerplate --recursive'
            }
        }
    }
}
