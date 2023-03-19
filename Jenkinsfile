pipeline {
  agent any
  environment {
    MASTER = 'feat/op/92'
    DEVELOP = 'develop'
  }
  stages {

    stage('Hello') {
      steps {
        echo "${env.gitlabBranch} Hello "
      }
    }

    stage('Remove') {
      steps {
        script {
          if (env.gitlabBranch == env.MASTER) {
            // 운영용 컨테이너 삭제
            def sapiv-webfe-prod = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-webfe-prod')
            def sapiv-webbe-prod = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-webbe-prod')
            def sapiv-db-prod = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-db-prod')

            if (sapiv-webfe-prod.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv-webfe-prod)
            }
            if (sapiv-webbe-prod.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv-webbe-prod)
            }
            if (sapiv-db-prod.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv-db-prod)
            }
          } else if (env.gitlabBranch == env.DEVELOP) {
            // 개발용 컨테이너 삭제
            def sapiv-webfe-dev = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-webfe-dev')
            def sapiv-webbe-dev = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-webbe-dev')
            def sapiv-db-dev = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-db-dev')

            if (sapiv-webfe-dev.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv-webfe-dev)
            }
            if (sapiv-webbe-dev.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv-webbe-dev)
            }
            if (sapiv-db-dev.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv-db-dev)
            }
          }
        }
      }
    }

    stage('Build') {
      steps {
        script {
          if (env.gitlabBranch == env.MASTER) {
            // 운영서버
            sh 'docker-compose -f docker-compose-prod.yml build'
          } else if (env.gitlabBranch == env.DEVELOP) {
            // 개발서버
            sh 'docker-compose -f docker-compose-dev.yml build'
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          if (env.gitlabBranch == env.MASTER) {
            // 운영서버
            sh 'docker-compose -f docker-compose-prod.yml up -d'
          } else if (env.gitlabBranch == env.DEVELOP) {
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