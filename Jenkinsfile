pipeline { 
  agent any
  environment {
    MASTER = 'feat/op/92'
    DEVELOP = 'develop'
  }
  stages {

    stage('Hello') {
      steps {
        echo "${env.gitlabBranch} Hello ${env.MASTER}"
      }
    }

    stage('Remove') {
      steps {
        script {
          if (env.gitlabBranch == env.MASTER) {
            // 운영용 컨테이너 삭제
            def sapiv_webfe_prod = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-webfe-prod')
            def sapiv_webbe_prod = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-webbe-prod')
            def sapiv_db_prod = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-db-prod')

            if (sapiv_webfe_prod.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_webfe_prod)
            }
            if (sapiv_webbe_prod.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_webbe_prod)
            }
            if (sapiv_db_prod.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_db_prod)
            }
          } else if (env.gitlabBranch == env.DEVELOP) {
            // 개발용 컨테이너 삭제
            def sapiv_webfe_dev = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-webfe-dev')
            def sapiv_webbe_dev = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-webbe-dev')
            def sapiv_db_dev = sh(returnStdout: true, script: 'docker ps -a -q -f name=sapiv-db-dev')

            if (sapiv_webfe_dev.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_webfe_dev)
            }
            if (sapiv_webbe_dev.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_webbe_dev)
            }
            if (sapiv_db_dev.length() > 0) {
              sh(returnStdout: false, script: 'docker rm -f ' + sapiv_db_dev)
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
            sh 'docker-compose -f docker-compose-prod.yml up -d --no-recreate'
          } else if (env.gitlabBranch == env.DEVELOP) {
            // 개발서버
            sh 'docker-compose -f docker-compose-dev.yml up -d --no-recreate'
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