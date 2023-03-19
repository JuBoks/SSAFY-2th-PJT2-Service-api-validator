pipeline {
  agent any

  stages {
    stage('Build') {
        steps {
          script {
            if (env.gitlabBranch == 'master') {
              // 운영서버
              sh 'docker-compose -f docker-compose-prod.yml build'
            } else if (env.gitlabBranch == 'develop') {
              // 개발서버
              sh 'docker-compose -f docker-compose-dev.yml build'
            }
          }
        }
    }

    stage('Deploy') {
        steps {
          script {
            if (env.gitlabBranch == 'master') {
              // 운영서버
              sh 'docker-compose -f docker-compose-prod.yml up -d'
            } else if (env.gitlabBranch == 'develop') {
              // 개발서버
              sh 'docker-compose -f docker-compose-dev.yml up -d'
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