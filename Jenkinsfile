node {
  stage('SCM') {
    checkout scm
  }

  stage('SonarQube Analysis') { 
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv() {
      sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=sapiv-dev -Dsonar.sources=. -Dsonar.host.url=https://sonarqube.ssafy.com -Dsonar.login=61bb570be7bb84c1e2b1f1f15ab4fcbe58f0a765" 
    } 
  }
}