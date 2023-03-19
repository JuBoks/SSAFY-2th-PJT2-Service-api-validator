pipeline {
  agent any

  stages {
    stage('SCM') {
      steps {
        checkout scm
      }
    }

    stage('SonarQube Analysis & Build-Deploy') {
      parallel {
        stage('SonarQube Analysis') { 
          steps {
            script {
              def scannerHome = tool 'SonarScanner';
              withSonarQubeEnv() {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=sapiv-dev -Dsonar.sources=. -Dsonar.host.url=https://sonarqube.ssafy.com -Dsonar.login=61bb570be7bb84c1e2b1f1f15ab4fcbe58f0a765" 
              } 
            }
          }
        }

        stage('Build & Deploy') {
          stage('Build') {
              steps {
                script {
                  if (env.gitlabBranch == 'feat/op/92') {
                    // 운영서버
                    sh 'docker-compose -f docker-compose-prod.yml build'
                  } else if (env.gitlabBranch == 'feat/be/92') {
                    // 개발서버
                    sh 'docker-compose -f docker-compose-dev.yml build'
                  }
                }
              }
          }

          stage('Deploy') {
              steps {
                script {
                  if (env.gitlabBranch == 'feat/op/92') {
                    // 운영서버
                    sh 'docker-compose -f docker-compose-prod.yml up -d'
                  } else if (env.gitlabBranch == 'feat/be/92') {
                    // 개발서버
                    sh 'docker-compose -f docker-compose-dev.yml up -d'
                  }
                }
              }
          }
        }
      }
    }

  }

  post {
    always { 
       cleanWs(excludePatterns: ['/.env'])
     } 
   } 
}