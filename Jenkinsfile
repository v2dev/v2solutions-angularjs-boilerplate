pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
    }
    stages {
        stage("Initialise") {
            steps {
                cleanWs()
            }
        }
        stage("git") {
            steps {
                git branch: 'feature/devops_sagar', credentialsId: 'git_token_cs', url: 'https://github.com/v2dev/v2solutions-angularjs-boilerplate.git'
            }
        }
        // stage("Build React App") {
        //     steps {
        //         bat '@echo off'
        //         bat 'echo %WORKSPACE%'
        //         bat "echo 'Building react application'"
        //         bat 'npm install'
        //         bat 'npm run build'
        //     }
        // }
        stage("config infra") {
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                dir("scripts") {
                    // bat "echo 'pwd is:' pwd()"
                    // bat './configTerragrunt.bat ENVIRONMENT %ENVIRONMENT% %WORKSPACE%'
                    bat './configTerragrunt.bat %WORKSPACE%'
                }
            }
        }        
        stage("create infra") {
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                dir("scripts") {
                    bat './terragruntInvocation.bat %AWS_ACCESS_KEY_ID% %AWS_SECRET_ACCESS_KEY% %AWS_DEFAULT_REGION% %WORKSPACE%'
                }
            }
        }
        stage("Copy Artifacts to S3") {
            steps {
                sh 'aws s3 cp ./dist/base-project s3://v2-angularjs-boilerplate --recursive'
            }
        }
    }
}
