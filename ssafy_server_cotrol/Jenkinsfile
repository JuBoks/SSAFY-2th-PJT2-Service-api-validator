pipeline {
  agent any
  environment {
    MASTER = 'master'
    DEVELOP = 'fe/op/91'
  }

  stages {
    stage('Remove') {
      steps {
        script {
          // 운영용 컨테이너 삭제
          if (env.gitlabBranch == env.MASTER) {
            def sapiv_api_validator_prod = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-api-validator-prod')
            if (sapiv_api_validator_prod.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_api_validator_prod)
            }
            def sapiv_samsung_server1_prod = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-samsung-server1-prod')
            if (sapiv_samsung_server1_prod.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_samsung_server1_prod)
            }
          } 
          // 개발용 컨테이너 삭제
          else if (env.gitlabBranch == env.DEVELOP) {
            def sapiv_api_validator_dev = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-api-validator-dev')
            if (sapiv_api_validator_dev.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_api_validator_dev)
            }
            def sapiv_samsung_server1_dev = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-samsung-server1-dev')
            if (sapiv_samsung_server1_dev.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_samsung_server1_dev)
            }
          }
        }
      }
      post {
        success {
          echo 'Remove Success'
        }

        failure {
          echo 'Remove Failed'
        }
      }
    }

  stage('Build') {
    steps {
      script {
        // 운영 서버
        if (env.gitlabBranch == env.MASTER) {
          sh 'docker-compose -f docker-compose-prod.yml build'
        } 
        // 개발 서버
        else if (env.gitlabBranch == env.DEVELOP) {
          sh 'docker-compose -f docker-compose-dev.yml build'
        }
      }
    } 
    post {
      success {
          echo 'Build Success'
      }

          echo 'Build Failed'
          script {
            def buildLog = sh(returnStdout: true, script: 'docker-compose -f docker-compose-dev.yml build')
            echo buildLog
          }
      }
    }
  }

  stage('Deploy') {
    steps {
      script {
        // 운영 서버
        if (env.gitlabBranch == env.MASTER) {
          sh 'docker-compose -f docker-compose-prod.yml up -d'
        }
        // 개발 서버
        else if (env.gitlabBranch == env.DEVELOP) {
          sh 'docker-compose -f docker-compose-dev.yml up -d'
        }
      }
    }
    post {
      success {
          echo 'Deploy Success'
      }

      failure {
          echo 'Deploy Failed'
          script {
            def deployLog = sh(returnStdout: true, script: 'docker-compose -f docker-compose-dev.yml up -d')
            echo deployLog
          }
      }
    }
  }
}