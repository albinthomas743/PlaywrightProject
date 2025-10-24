pipeline {
    agent any

    tools {
        //nodejs 'Node25'
    }

    options {
        timestamps()
    }

    stages {
        // CI stage
        stage('Checkout code') {
            steps {
                echo 'Checking out repo...'
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing depedencies...'
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright Browsers...'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run All test (CI)') {
            steps {
                echo 'Running Playwright test suites...'
                sh 'npx playwright test --reporter=html'
            }
            post {
                always {
                    echo 'Generating HTML report'
                    publishHTML(target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
                }
            }
        }

        // CD stage
    }
}