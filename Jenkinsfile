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
        stage("Git") {
            steps {
                git branch: 'feature/devops_sagar', credentialsId: 'git_token_cs', url: 'https://github.com/v2dev/v2solutions-angularjs-boilerplate.git'
            }
        }

        // SonarQube Scan Stage
        // stage('SonarQube Scan') {
        //     steps {
        //         script {
        //             def scannerHome = tool 'SonarQubeScanner'
        //             def projectKey = "SaaS-Boilerplate-Angular"
        //             withSonarQubeEnv(SONARQUBE_SERVER) {
        //                 echo "Current working directory: ${pwd()}"
        //                 bat "./sonarqube_script.bat ${scannerHome} ${projectKey}"

        //                 // Manually construct the SonarQube Analysis URL
        //                 def sonarqubeUrl = "${SONARQUBE_SERVER}/dashboard?id=${projectKey}"
        //                 echo "SonarQube Analysis URL: ${sonarqubeUrl}"

        //                 // Set the URL as an environment variable to use it in later stages
        //                 env.SONARQUBE_URL = sonarqubeUrl
        //             }
        //         }
        //     }   
        // }

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
        // stage('Quality Gate') {
        //     steps {
        //         script {
        //             withSonarQubeEnv(SONARQUBE_SERVER) {
        //                 def qg = waitForQualityGate()
        //                 if (qg.status != 'OK') {
        //                     error "Quality Gate failed: ${qg.status}"
        //                 }
        //                 else {
        //                     echo "Quality Gate Success"
        //                 }
        //             }
        //         }
        //     }
        // }

        // Configure Infrastructure
        stage("Config Infra") {
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                dir("scripts") {
                    bat './configTerragrunt.bat %WORKSPACE%'
                }
            }
        }

        // // Create Infrastructure        
        // stage("Create Infra") {
        //     steps {
        //         bat '@echo off'
        //         bat 'echo %WORKSPACE%'
        //         dir("scripts") {
        //             bat './terragruntInvocation.bat %AWS_ACCESS_KEY_ID% %AWS_SECRET_ACCESS_KEY% %AWS_DEFAULT_REGION% %WORKSPACE%'
        //         }
        //     }
        // }

        stage('Delete S3 Objects') {
            when {
                expression { params.DESTROY_INFRA?.toLowerCase() == 'yes' }
            }
            steps {
                script {
                    // dir("scripts") {
                    //     echo "Delete s3 objects"
                    //     sh "ls -l" // Debugging output: List files in the directory
                    //     sh "pwd" // Debugging output: Print current directory
                    //     // def scriptPath = "${env.WORKSPACE}/scripts/delete-objects.sh"
                    //     sh "chmod +x ./delete-objects.sh"
                    //     sh "./delete-objects.sh"
                    // }
                    bat 'echo "RunningS3DeleteObject"'
                    bat '@echo off'
                    // bat 'aws s3api delete-objects --bucket v2-angularjs-boilerplate --delete "$(aws s3api list-object-versions --bucket v2-angularjs-boilerplate --query "DeleteMarkers[].{Key:Key,VersionId:VersionId}")"'
                    bat '''
                        for /f "tokens=1,2" %%F in ('aws s3api list-object-versions --bucket v2-angularjs-boilerplate --query "DeleteMarkers[].{Key:Key,VersionId:VersionId}" --output text') do (
                            aws s3api delete-object --bucket v2-angularjs-boilerplate --key "%%F" --version-id "%%G"
                        )
                        for /f "tokens=1,2" %%F in ('aws s3api list-object-versions --bucket v2-angularjs-boilerplate --query "Versions[].{Key:Key,VersionId:VersionId}" --output text') do (
                            aws s3api delete-object --bucket v2-angularjs-boilerplate --key "%%F" --version-id "%%G"
                        )
                    '''
                }
            }
        }
        
        // Conditional stage based on DESTROY_INFRA parameter
        stage("Conditional Stage") {
            steps {
                script {
                    // Check if DESTROY_INFRA parameter is set to "YES", "Yes", "y", or "yes"
                    def destroyInfraFlag = params.DESTROY_INFRA?.toLowerCase()
                    echo "DESTROY_INFRA flag value: ${destroyInfraFlag}"
                    
                    if (destroyInfraFlag in ['yes', 'y']) {
                        // Destroy Infrastructure stage
                        bat 'echo "Running Destroy infra stage"'
                        bat '@echo off'
                        bat 'echo %WORKSPACE%'
                        dir("scripts") {
                            bat './terraformDestroy.bat %AWS_ACCESS_KEY_ID% %AWS_SECRET_ACCESS_KEY% %AWS_DEFAULT_REGION% %WORKSPACE%'
                        }
                    } else if (destroyInfraFlag in ['no', 'n']) {
                        // Create Infrastructure stage
                        bat 'echo "Running Create infra stage"'
                        bat '@echo off'
                        bat 'echo %WORKSPACE%'
                        dir("scripts") {
                            bat './terragruntInvocation.bat %AWS_ACCESS_KEY_ID% %AWS_SECRET_ACCESS_KEY% %AWS_DEFAULT_REGION% %WORKSPACE%'
                            infraCreated = true
                        }
                    } else {
                        error "Invalid value for DESTROY_INFRA parameter. Expected 'yes' or 'no'."
                    }
                }
            }
        }

        // // Destroy Infrastructure        
        // stage("Destroy Infra") {
        //     steps {
        //         bat '@echo off'
        //         bat 'echo %WORKSPACE%'
        //         dir("scripts") {
        //             bat './terraformDestroy.bat %AWS_ACCESS_KEY_ID% %AWS_SECRET_ACCESS_KEY% %AWS_DEFAULT_REGION% %WORKSPACE%'
        //         }
        //     }
        // }

        // Install dependencies
        stage("Install dependencies") {
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                bat "echo 'Install Dependencies'"
                bat 'npm install'
            }
        }

        // Install dependencies and Build Angular App
        stage("Build Angular App") {
            steps {
                script {
                    // Modify environment.prod.ts file with the provided EKS_API_ENDPOINT
                    def eksApiEndpoint = params.EKS_API_ENDPOINT
                    def filePath = "${WORKSPACE}/src/environments/environment.prod.ts"
                    // Read the file content
                    def fileContent = readFile(filePath)
                    // Replace the apiUrl value with the provided EKS_API_ENDPOINT
                    def modifiedContent = fileContent.replaceAll(/apiUrl:\s*'(.*)'/, "apiUrl: '${eksApiEndpoint}:8080'")
                    // Write the modified content back to the file
                    writeFile file: filePath, text: modifiedContent
                }
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                bat "echo 'Building angular application'"
                bat 'npm run build'
            }
        }

        // Copy built React code to S3 bucket
        stage("Copy Artifacts to S3") {
            when {
                expression { infraCreated }
            }
            steps {
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                bat 'aws s3 cp dist/base-project s3://v2-angularjs-boilerplate --recursive'
            }
        }
    }
}
