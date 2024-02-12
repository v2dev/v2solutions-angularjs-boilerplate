pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
    }

    // Setup Environment Variables
    environment {
        SONARQUBE_CREDENTIALS = credentials('sonar-cred')
        SONARQUBE_SERVER = 'sonarconfig'
        SCAN_TOKEN = credentials('angularjs-scan-token')
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

        // SonarQube Scan Stage
        stage('SonarQube Scan') {
            steps {
                script {
                    def scannerHome = tool 'SonarQubeScanner'
                    def projectKey = "SaaS-Boilerplate-Angular"
                    withSonarQubeEnv(SONARQUBE_SERVER) {
                        echo "Current working directory: ${pwd()}"
                        bat "./sonarqube_script.bat ${scannerHome} ${projectKey}"

                        // Manually construct the SonarQube Analysis URL
                        def sonarqubeUrl = "${SONARQUBE_SERVER}/dashboard?id=${projectKey}"
                        echo "SonarQube Analysis URL: ${sonarqubeUrl}"

                        // Set the URL as an environment variable to use it in later stages
                        env.SONARQUBE_URL = sonarqubeUrl
                    }
                }
            }   
        }

        // // Email Notification Stage
        // stage('Email Notification') {
        //     steps {
        //         script {
        //             // Check if the SONARQUBE_URL environment variable is set
        //             if (env.SONARQUBE_URL) {
        //                 // Compose the email body with the manually constructed SonarQube Analysis URL
        //                 def emailBody = "SonarQube Analysis URL: ${env.SONARQUBE_URL}"

        //                 // Send email using the emailext plugin
        //                 emailext body: emailBody,
        //                         subject: 'SonarQube Analysis Report',
        //                         to: 'testemail@v2solutions.com',
        //                         mimeType: 'text/html'
        //             } else {
        //                 error "SonarQube Analysis URL is not available. Make sure the previous stage executed successfully."
        //             }
        //         }
        //     }
        // }

        // Quality Gate Stage
        stage('Quality Gate') {
            steps {
                script {
                    withSonarQubeEnv(SONARQUBE_SERVER) {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Quality Gate failed: ${qg.status}"
                        }
                        else {
                            echo "Quality Gate Success"
                        }
                    }
                }
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
        // stage("config infra") {
        //     steps {
        //         bat '@echo off'
        //         bat 'echo %WORKSPACE%'
        //         dir("scripts") {
        //             bat './configTerragrunt.bat %WORKSPACE%'
        //         }
        //     }
        // }
        // // Create Infrastructure        
        // stage("create infra") {
        //     steps {
        //         bat '@echo off'
        //         bat 'echo %WORKSPACE%'
        //         dir("scripts") {
        //             bat './terragruntInvocation.bat %AWS_ACCESS_KEY_ID% %AWS_SECRET_ACCESS_KEY% %AWS_DEFAULT_REGION% %WORKSPACE%'
        //         }
        //     }
        // }
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
