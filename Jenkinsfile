node {
  stage('SCM') {
    checkout scm
  }

  stage('SonarQube Analysis') { 
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv() {
      sh 'sonar-scanner -Dsonar.projectKey=s002sapiv -Dsonar.sources=. -Dsonar.host.url=https://sonarqube.ssafy.com -Dsonar.login=6281433cb57520b24d5e3fb11e6e4c098b803485' 
    } 
  }
}